import { useState } from 'react'

const STAGES = ['Lead', 'Contactado', 'Propuesta', 'Cerrado', 'Perdido']

export default function AddContactForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    stage: 'Lead',
    value: '',
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'El nombre es requerido'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Email inválido'
    }
    if (form.value && isNaN(Number(form.value))) {
      newErrors.value = 'Debe ser un número'
    }
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setSubmitting(true)
    try {
      await onSubmit({
        ...form,
        value: form.value ? Number(form.value) : null,
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="label">
          Nombre <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Juan García"
          className={`input ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
        />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
      </div>

      {/* Company */}
      <div>
        <label className="label">Empresa</label>
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Acme Corp"
          className="input"
        />
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="juan@empresa.com"
            className={`input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>
        <div>
          <label className="label">Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+54 11 1234-5678"
            className="input"
          />
        </div>
      </div>

      {/* Stage + Value */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Stage</label>
          <select name="stage" value={form.stage} onChange={handleChange} className="input">
            {STAGES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Valor (USD)</label>
          <input
            type="number"
            name="value"
            value={form.value}
            onChange={handleChange}
            placeholder="5000"
            min="0"
            className={`input font-mono ${errors.value ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          {errors.value && <p className="mt-1 text-xs text-red-400">{errors.value}</p>}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="label">Notas</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Información adicional..."
          rows={3}
          className="input resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn-primary flex-1" disabled={submitting}>
          {submitting ? 'Guardando...' : 'Agregar Contacto'}
        </button>
        <button type="button" onClick={onCancel} className="btn-ghost">
          Cancelar
        </button>
      </div>
    </form>
  )
}
