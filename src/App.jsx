import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Sidebar from './components/Layout/Sidebar'
import Header from './components/Layout/Header'
import Modal from './components/UI/Modal'
import AddContactForm from './components/UI/AddContactForm'

import DashboardPage from './pages/DashboardPage'
import PipelinePage from './pages/PipelinePage'
import ContactsPage from './pages/ContactsPage'
import ContactDetailPage from './pages/ContactDetailPage'

import { useContacts } from './hooks/useContacts'

function AppLayout({ children, onNewContact }) {
  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar />
      <Header onNewContact={onNewContact} />
      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const { contacts, loading, error, addContact, updateStage, updateNotes, deleteContact, updateContact, STAGES, fetchContacts } = useContacts()

  const handleAddContact = async (data) => {
    await addContact(data)
    setModalOpen(false)
  }

  const sharedProps = { contacts, loading, error, updateStage, updateNotes, deleteContact, updateContact, STAGES, fetchContacts }

  return (
    <BrowserRouter>
      <AppLayout onNewContact={() => setModalOpen(true)}>
        <Routes>
          <Route path="/" element={<DashboardPage {...sharedProps} />} />
          <Route path="/pipeline" element={<PipelinePage {...sharedProps} />} />
          <Route path="/contacts" element={<ContactsPage {...sharedProps} />} />
          <Route path="/contacts/:id" element={<ContactDetailPage {...sharedProps} />} />
        </Routes>
      </AppLayout>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo Contacto">
        <AddContactForm onSubmit={handleAddContact} onCancel={() => setModalOpen(false)} />
      </Modal>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1E293B',
            color: '#F1F5F9',
            border: '1px solid #334155',
            borderRadius: '12px',
            fontSize: '14px',
          },
          success: {
            iconTheme: { primary: '#34D399', secondary: '#1E293B' },
          },
          error: {
            iconTheme: { primary: '#F87171', secondary: '#1E293B' },
          },
        }}
      />
    </BrowserRouter>
  )
}
