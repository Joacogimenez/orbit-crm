import Pipeline from '../components/Pipeline/Pipeline'
import { SkeletonCard } from '../components/UI/Skeleton'

export default function PipelinePage({ contacts, loading, updateStage }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Pipeline</h1>
        <p className="text-slate-500 text-sm mt-1">
          {contacts.length} contacto{contacts.length !== 1 ? 's' : ''} en total
        </p>
      </div>

      {loading ? (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="min-w-[260px]">
              <SkeletonCard />
              <div className="mt-3 space-y-3">
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Pipeline contacts={contacts} onMoveStage={updateStage} />
      )}
    </div>
  )
}
