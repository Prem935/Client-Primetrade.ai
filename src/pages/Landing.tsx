import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'

export default function Landing() {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/dashboard" replace />
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Organize tasks with speed and clarity</h1>
          <p className="mt-4 text-secondary">Create, filter, and complete tasks with a clean, responsive interface.</p>
          <div className="mt-8 flex gap-4">
            <Link to="/register" className="px-5 py-3 bg-primary text-white rounded-lg hover:opacity-90 transition">Get Started</Link>
            <Link to="/login" className="px-5 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition">Login</Link>
          </div>
        </div>
      </div>
    </section>
  )
}


