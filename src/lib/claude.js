import Anthropic from '@anthropic-ai/sdk'

export async function calculateLeadScore(contact) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_KEY
  if (!apiKey) return null

  const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true })

  const notes = contact.notes ? contact.notes.slice(0, 500) : ''
  const daysSinceCreated = contact.created_at
    ? Math.floor((Date.now() - new Date(contact.created_at).getTime()) / 86400000)
    : null
  const lastActivity = contact.last_score_update || contact.updated_at || contact.created_at

  const prompt = `You are a CRM lead scoring assistant. Analyze this sales contact and return a JSON score.

Contact data:
- Stage: ${contact.stage}
- Value: ${contact.value != null ? `$${contact.value}` : 'unknown'}
- Days since created: ${daysSinceCreated ?? 'unknown'}
- Last activity: ${lastActivity ? new Date(lastActivity).toISOString() : 'unknown'}
- Notes: ${notes || 'none'}

Stages in order: Lead → Contactado → Propuesta → Cerrado → Perdido

Respond ONLY with valid JSON, no other text. Write the reasoning in Spanish:
{"score": <number 0-100>, "reasoning": "<explicación de 1-2 oraciones en español>"}`

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 256,
    messages: [{ role: 'user', content: prompt }],
  })

  const raw = message.content[0].text.trim()
  const text = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '')
  const parsed = JSON.parse(text)

  if (typeof parsed.score !== 'number' || parsed.score < 0 || parsed.score > 100) {
    throw new Error('Invalid score value from Claude')
  }

  return { score: Math.round(parsed.score), reasoning: parsed.reasoning }
}
