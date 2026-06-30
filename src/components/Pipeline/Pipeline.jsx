import PipelineColumn from './PipelineColumn'

const STAGES = ['Lead', 'Contactado', 'Propuesta', 'Cerrado', 'Perdido']

export default function Pipeline({ contacts, onMoveStage, onScoreContact, scoringIds }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 min-h-[500px]">
      {STAGES.map((stage) => (
        <PipelineColumn
          key={stage}
          stage={stage}
          contacts={contacts.filter((c) => c.stage === stage)}
          onMoveStage={onMoveStage}
          onScoreContact={onScoreContact}
          scoringIds={scoringIds}
        />
      ))}
    </div>
  )
}
