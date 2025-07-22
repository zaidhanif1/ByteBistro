import './Login.css'
import { color, motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { apiCall } from '../../utils/api.js'

export default function Login() {
  const navigate = useNavigate()

  const [logEmail, setLogEmail] = useState('')
  const [logPass, setLogPass] = useState('')
  

  const handleLogin = async (e) => {
    e.preventDefault()

    const form = e.target

    const trimmedLogEmail = logEmail?.trim()
    const trimmedLogPass = logPass?.trim()

    try {
      const data = await apiCall('/login', {
        method: 'POST',
        body: JSON.stringify({email: logEmail, password: logPass})
      });
      
      form.reset()
      setLogEmail('')
      setLogPass('')

      // Store the JWT token in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.userId)
      }
      
      toast.success("Login successful! Redirecting...", {
        autoClose: 1500
      })
      setTimeout(() =>{
        navigate('/main')
      }, 1700)
      
    } catch (error) {
      toast.error('Invalid email or password')
    }
      
  }
  
  
  return (
    <motion.div
    initial = {{ opacity : 0 }}
    animate = {{ opacity: 1 }}
    exit= {{ opacity : 0}}
    transition={{duration : 1.3}}
    
    
    >
    <div className='login-container'>
        <h1 className='login-page-h1'>Welcome Back 🍴</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <div className='login-inputs-container'>
        <input 
        className='login-email-inp'
        placeholder='Email'
        type="email"
        name='email-log-inp'
        value={logEmail}
        onChange={(e) => setLogEmail(e.target.value)}
         />
         <input 
         className='login-pass-inp'
         type="password"
         placeholder='Password'
         name='password-log-inp'
         value={logPass}
         onChange={(e) => setLogPass(e.target.value)} />
         

</div>
    <div className='login-bottom-div'>
            <button className ='login-form-btn' >Login </button>
            <p>Don't have an account? <Link to = '/signup' style={{color: 'var(--color)'}}>Signup</Link></p>
    </div>
        </form>
    </div>
    </motion.div>
  )
}