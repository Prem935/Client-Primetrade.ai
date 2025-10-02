import { Navigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext'

type Props = { children: JSX.Element }

export default function GuestRoute({ children }: Props) {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/dashboard" replace />
  return children
}


