import { useParams } from 'react-router-dom'
import ContactDetail from '../components/Contacts/ContactDetail'
import Skeleton from '../components/UI/Skeleton'

export default function ContactDetailPage({ contacts, loading, updateNotes, deleteContact, updateStage }) {
  const { id } = useParams()
  const contact = contacts.find((c) => String(c.id) === id)

  if (loading) {
    return (
      <div className="max-w-3xl space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="card p-6 space-y-4">
          <Skeleton className="h-14 w-14 rounded-2xl" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-16 rounded-xl" />
          <Skeleton className="h-16 rounded-xl" />
        </div>
        <Skeleton className="h-40 rounded-xl" />
      </div>
    )
  }

  if (!contact) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <p className="text-slate-400 text-lg font-medium">Contacto no encontrado</p>
        <p className="text-slate-600 text-sm mt-2">El contacto puede haber sido eliminado o el ID es incorrecto.</p>
      </div>
    )
  }

  return (
    <ContactDetail
      contact={contact}
      onUpdateNotes={updateNotes}
      onDelete={deleteContact}
      onUpdateStage={updateStage}
    />
  )
}
