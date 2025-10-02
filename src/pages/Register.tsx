import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useToast } from '../state/ToastContext'

type FormValues = { username: string; email: string; password: string; confirm: string }

export default function Register() {
  const navigate = useNavigate()
  const { showError, showSuccess } = useToast()
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm<FormValues>({ defaultValues: { username: '', email: '', password: '', confirm: '' } })
  const onSubmit = async (data: FormValues) => {
    try {
      await api.post('/auth/register', { username: data.username, email: data.email, password: data.password })
      showSuccess('Account created')
      navigate('/login')
    } catch (e: any) {
      const msg = e?.response?.data?.message || 'Registration failed'
      showError(msg)
    }
  }
  const pwd = watch('password')
  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6">Create account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-primary" placeholder="Username" {...register('username', { required: true, minLength: 3 })} />
          {errors.username && <p className="text-danger text-sm mt-1">Username must be at least 3 characters</p>}
        </div>
        <div>
          <input className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-primary" placeholder="Email" type="email" {...register('email', { required: true, pattern: /.+@.+\..+/ })} />
          {errors.email && <p className="text-danger text-sm mt-1">Enter a valid email</p>}
        </div>
        <div>
          <input className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-primary" placeholder="Password" type="password" {...register('password', { required: true, minLength: 6 })} />
          {errors.password && <p className="text-danger text-sm mt-1">Minimum 6 characters</p>}
        </div>
        <div>
          <input className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-primary" placeholder="Confirm Password" type="password" {...register('confirm', { required: true, validate: v => v === pwd })} />
          {errors.confirm && <p className="text-danger text-sm mt-1">Passwords do not match</p>}
        </div>
        <button disabled={isSubmitting} className="w-full bg-primary text-white rounded px-4 py-2 hover:opacity-90 transition disabled:opacity-50">{isSubmitting ? 'Creating...' : 'Register'}</button>
      </form>
      <p className="text-sm text-secondary mt-4">Already have an account? <Link to="/login" className="text-primary">Login</Link></p>
    </div>
  )
}


