import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer, toast, Slide } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <ToastContainer
  position="top-right"
  autoClose={5000}
  hideProgressBar
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
  transition={Slide}
  />
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
