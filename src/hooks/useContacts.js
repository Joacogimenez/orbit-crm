import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

const STAGES = ['Lead', 'Contactado', 'Propuesta', 'Cerrado', 'Perdido']

export function useContacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchContacts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setContacts(data || [])
    } catch (err) {
      setError(err.message)
      toast.error('Error al cargar contactos')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  const addContact = useCallback(async (contactData) => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([{
          ...contactData,
          stage: contactData.stage || 'Lead',
          created_at: new Date().toISOString(),
        }])
        .select()
        .single()

      if (error) throw error
      setContacts((prev) => [data, ...prev])
      toast.success('Contacto agregado')
      return data
    } catch (err) {
      toast.error('Error al agregar contacto: ' + err.message)
      throw err
    }
  }, [])

  const updateStage = useCallback(async (id, direction) => {
    const contact = contacts.find((c) => c.id === id)
    if (!contact) return

    const currentIdx = STAGES.indexOf(contact.stage)
    const newIdx = currentIdx + direction
    if (newIdx < 0 || newIdx >= STAGES.length) return

    const newStage = STAGES[newIdx]
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ stage: newStage })
        .eq('id', id)

      if (error) throw error
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, stage: newStage } : c))
      )
      toast.success(`Movido a ${newStage}`)
    } catch (err) {
      toast.error('Error al actualizar stage')
    }
  }, [contacts])

  const updateNotes = useCallback(async (id, notes) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ notes })
        .eq('id', id)

      if (error) throw error
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, notes } : c))
      )
    } catch (err) {
      toast.error('Error al guardar notas')
    }
  }, [])

  const deleteContact = useCallback(async (id) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id)

      if (error) throw error
      setContacts((prev) => prev.filter((c) => c.id !== id))
      toast.success('Contacto eliminado')
    } catch (err) {
      toast.error('Error al eliminar contacto')
    }
  }, [])

  const updateContact = useCallback(async (id, updates) => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? data : c))
      )
      toast.success('Contacto actualizado')
      return data
    } catch (err) {
      toast.error('Error al actualizar contacto')
      throw err
    }
  }, [])

  return {
    contacts,
    loading,
    error,
    fetchContacts,
    addContact,
    updateStage,
    updateNotes,
    deleteContact,
    updateContact,
    STAGES,
  }
}
