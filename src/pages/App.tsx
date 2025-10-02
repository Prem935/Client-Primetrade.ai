import { Outlet, Link, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from '../state/AuthContext'
import { ToastProvider } from '../state/ToastContext'

function Nav() {
  const { isAuthenticated, logout, user } = useAuth()
  const loc = useLocation()
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-primary font-semibold">TaskManager</Link>
        <nav className="flex items-center gap-4">
          {!isAuthenticated && <Link className="text-sm text-secondary hover:text-primary transition" to="/">Home</Link>}
          {isAuthenticated && <Link className="text-sm text-secondary hover:text-primary transition" to="/dashboard">Dashboard</Link>}
          {isAuthenticated && <Link className="text-sm text-secondary hover:text-primary transition" to="/profile">Profile</Link>}
          {!isAuthenticated && loc.pathname !== '/login' && <Link className="px-3 py-1.5 bg-primary text-white rounded hover:opacity-90 transition" to="/login">Login</Link>}
          {!isAuthenticated && loc.pathname !== '/register' && <Link className="px-3 py-1.5 border border-primary text-primary rounded hover:bg-primary hover:text-white transition" to="/register">Register</Link>}
          {isAuthenticated && <button onClick={logout} className="px-3 py-1.5 bg-danger text-white rounded hover:opacity-90 transition">Logout {user?.username}</button>}
        </nav>
      </div>
    </header>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="min-h-screen flex flex-col">
          <Nav />
          <main className="flex-1">
            <Outlet />
          </main>
          <footer className="border-t bg-white text-center text-xs text-secondary py-4">Built for managing tasks by @Prem</footer>
        </div>
      </ToastProvider>
    </AuthProvider>
  )
}


