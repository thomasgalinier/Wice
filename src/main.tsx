import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './scenes/Home/Home.tsx'
import Header from './components/Header.tsx'
import Login from './scenes/Login/Login.tsx'
import Register from './scenes/Register/Register.tsx'
import User from './scenes/User/User.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    }
  }
})


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Home />
      </>
    ),
  },
  {
    path: '/login',
    element: (
      <>
        <Login />
      </>
    )
  },
  {
    path: '/register',
    element: (
      <>
        <Register />
      </>
    )
  },
  {
    path: '/user',
    element: (
      <>
        <Header />
        <User />
      </>
    )
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
