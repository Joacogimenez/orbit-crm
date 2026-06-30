import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'
import { calculateLeadScore } from '../lib/claude'

export function useLeadScoring() {
  const [scoringIds, setScoringIds] = useState(new Set())

  const scoreContact = useCallback(async (contact, onScoreUpdate) => {
    setScoringIds((prev) => new Set([...prev, contact.id]))
    try {
      const result = await calculateLeadScore(contact)
      if (!result) return // No API key configured

      const scoreData = {
        score: result.score,
        score_reasoning: result.reasoning,
        last_score_update: new Date().toISOString(),
      }

      const { error } = await supabase
        .from('contacts')
        .update(scoreData)
        .eq('id', contact.id)

      if (error) throw error

      onScoreUpdate(contact.id, scoreData)
    } catch (err) {
      console.error('Lead scoring error:', err)
      toast.error('Error al calcular score')
    } finally {
      setScoringIds((prev) => {
        const next = new Set(prev)
        next.delete(contact.id)
        return next
      })
    }
  }, [])

  return { scoreContact, scoringIds }
}
