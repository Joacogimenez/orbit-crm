import ContactsList from '../components/Contacts/ContactsList'

export default function ContactsPage({ contacts, loading }) {
  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Contactos</h1>
        <p className="text-slate-500 text-sm mt-1">
          {contacts.length} contacto{contacts.length !== 1 ? 's' : ''} en total
        </p>
      </div>
      <ContactsList contacts={contacts} loading={loading} />
    </div>
  )
}
