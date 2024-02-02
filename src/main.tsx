import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './scenes/Home/Home.tsx'
import Header from './components/Header.tsx'
import Login from './scenes/Login/Login.tsx'

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
        <Header />
        <Login />
      </>
    )
  }
])
// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
