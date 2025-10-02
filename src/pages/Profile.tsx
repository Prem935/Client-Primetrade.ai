import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import api from '../services/api'
import { useAuth } from '../state/AuthContext'

type FormValues = { username: string; email: string }

export default function Profile() {
  const { user, logout } = useAuth()
  const { register, handleSubmit, formState: { isSubmitting }, reset } = useForm<FormValues>({ defaultValues: { username: user?.username || '', email: user?.email || '' } })
  useEffect(() => { reset({ username: user?.username || '', email: user?.email || '' }) }, [user])
  const onSubmit = async (data: FormValues) => {
    const res = await api.put('/auth/profile', data)
    localStorage.setItem('user', JSON.stringify(res.data))
    window.location.reload()
  }
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input className="w-full border rounded px-3 py-2" placeholder="Username" {...register('username', { required: true, minLength: 3 })} />
        <input className="w-full border rounded px-3 py-2" placeholder="Email" type="email" {...register('email', { required: true, pattern: /.+@.+\..+/ })} />
        <div className="flex items-center justify-between">
          <button disabled={isSubmitting} className="px-4 py-2 bg-primary text-white rounded disabled:opacity-50">{isSubmitting ? 'Saving...' : 'Save'}</button>
          <button type="button" onClick={logout} className="px-4 py-2 bg-danger text-white rounded">Logout</button>
        </div>
      </form>
    </div>
  )
}


