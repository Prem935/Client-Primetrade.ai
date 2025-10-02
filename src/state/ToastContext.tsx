import { createContext, useCallback, useContext, useMemo, useState } from 'react'

type Toast = { id: number; message: string; type: 'success' | 'error' }

type ToastContextType = {
  toasts: Toast[]
  showSuccess: (message: string) => void
  showError: (message: string) => void
  remove: (id: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const remove = useCallback((id: number) => setToasts(t => t.filter(x => x.id !== id)), [])
  const push = useCallback((type: Toast['type'], message: string) => {
    const id = Date.now() + Math.random()
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => remove(id), 3000)
  }, [remove])
  const showSuccess = useCallback((m: string) => push('success', m), [push])
  const showError = useCallback((m: string) => push('error', m), [push])
  const value = useMemo(() => ({ toasts, showSuccess, showError, remove }), [toasts, showSuccess, showError, remove])
  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map(t => (
          <div key={t.id} className={`px-4 py-2 rounded shadow text-white ${t.type === 'success' ? 'bg-success' : 'bg-danger'}`}>{t.message}</div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('ToastContext missing')
  return ctx
}


