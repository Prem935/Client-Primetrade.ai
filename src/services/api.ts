import axios from 'axios'
import { env } from 'process'

declare global {
  interface ImportMeta {
    env: {
      DEV: boolean
      VITE_API_URL: string
    }
  }
}

const baseURL = import.meta.env.DEV 
  ? '/api' 
  : import.meta.env.VITE_API_URL || 'https://primetrade-backend-5lak.onrender.com/api'

const api = axios.create({ baseURL })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      if (location.pathname !== '/login') location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
