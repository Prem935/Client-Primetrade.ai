import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './pages/App'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import ProtectedRoute from './routes/ProtectedRoute'
import GuestRoute from './routes/GuestRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Landing /> },
      { path: 'login', element: <GuestRoute children={<Login />} /> },
      { path: 'register', element: <GuestRoute children={<Register />} /> },
      { path: 'dashboard', element: <ProtectedRoute children={<Dashboard />} /> },
      { path: 'profile', element: <ProtectedRoute children={<Profile />} /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)


