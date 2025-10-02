import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type User = { id: string; username: string; email: string } | null

type AuthContextType = {
  user: User
  isAuthenticated: boolean
  login: (token: string, user: NonNullable<User>) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialUser = (() => {
    try {
      const token = localStorage.getItem('token')
      const userStr = localStorage.getItem('user')
      if (token && userStr) return JSON.parse(userStr) as NonNullable<User>
      return null
    } catch {
      return null
    }
  })()
  const [user, setUser] = useState<User>(initialUser)
  const isAuthenticated = !!user && !!localStorage.getItem('token')

  const login = (token: string, u: NonNullable<User>) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(u))
    setUser(u)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const value = useMemo(() => ({ user, isAuthenticated, login, logout }), [user, isAuthenticated])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('AuthContext missing')
  return ctx
}


