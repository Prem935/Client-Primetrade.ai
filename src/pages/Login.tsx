import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../state/AuthContext'
import { useToast } from '../state/ToastContext'

type FormValues = { email: string; password: string; remember: boolean }

export default function Login() {
  const { login } = useAuth()
  const { showError, showSuccess } = useToast()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ defaultValues: { email: '', password: '', remember: false } })
  const onSubmit = async (data: FormValues) => {
    try {
      const res = await api.post('/auth/login', { email: data.email, password: data.password })
      login(res.data.token, res.data.user)
      showSuccess('Signed in')
      navigate('/dashboard', { replace: true })
    } catch (e: any) {
      const msg = e?.response?.data?.message || 'Login failed'
      showError(msg)
    }
  }
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-primary" placeholder="Email" type="email" {...register('email', { required: true, pattern: /.+@.+\..+/ })} />
          {errors.email && <p className="text-danger text-sm mt-1">Enter a valid email</p>}
        </div>
        <div>
          <input className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-primary" placeholder="Password" type="password" {...register('password', { required: true, minLength: 6 })} />
          {errors.password && <p className="text-danger text-sm mt-1">Minimum 6 characters</p>}
        </div>
        <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" {...register('remember')} /> Remember me</label>
        <button disabled={isSubmitting} className="w-full bg-primary text-white rounded px-4 py-2 hover:opacity-90 transition disabled:opacity-50">{isSubmitting ? 'Signing in...' : 'Login'}</button>
      </form>
      <p className="text-sm text-secondary mt-4">No account? <Link to="/register" className="text-primary">Register</Link></p>
    </div>
  )
}


