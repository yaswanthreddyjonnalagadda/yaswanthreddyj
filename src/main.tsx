import { RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { getRouter } from './router'

const router = getRouter()

const rootElement = document.getElementById('root')!
ReactDOM.createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
