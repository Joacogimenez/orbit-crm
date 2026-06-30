import { useLocation } from 'react-router-dom'

const BREADCRUMBS = {
  '/': 'Dashboard',
  '/pipeline': 'Pipeline',
  '/contacts': 'Contactos',
}

function getBreadcrumb(pathname) {
  if (pathname.startsWith('/contacts/')) return 'Detalle de Contacto'
  return BREADCRUMBS[pathname] || 'Orbit CRM'
}

export default function Header({ onNewContact, onMenuClick }) {
  const location = useLocation()
  const breadcrumb = getBreadcrumb(location.pathname)

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 sm:px-6 z-30">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button onClick={onMenuClick} className="lg:hidden btn-ghost p-2 -ml-1">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-500 hidden sm:inline">Orbit</span>
          <svg className="w-3.5 h-3.5 text-slate-600 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-slate-100 font-medium">{breadcrumb}</span>
        </div>
      </div>

      {/* Actions */}
      <button onClick={onNewContact} className="btn-primary flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="hidden sm:inline">Nuevo Contacto</span>
      </button>
    </header>
  )
}
