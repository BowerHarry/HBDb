import { StrictMode , useState} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Login from './Login.tsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
    {/* <App /> */}
  </StrictMode>,
)
