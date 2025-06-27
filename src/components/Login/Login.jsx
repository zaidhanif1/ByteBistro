import './Login.css'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Login() {
  

  const [logEmail, setLogEmail] = useState('')
  const [logPass, setLogPass] = useState('')
  

  const handleLogin = async (e) => {
    e.preventDefault()

    const form = e.target

    const trimmedLogEmail = logEmail?.trim()
    const trimmedLogPass = logPass?.trim()

        const API_BASE = import.meta.env.MODE === 'development' 
        ? 'http://localhost:8000' 
        : "https://bytebistro-production.up.railway.app";
      
      const res = await fetch(`${API_BASE}/api/login`, {
        method: 'POST', 
        headers:
        {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({logEmail, logPass})
      });
      const data = await res.json();
      console.log(data)
      form.reset()
      setLogEmail('')
      setLogPass('')
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
        <button className = 'login-form-btn' >Login </button>

        </form>
    </div>
    </motion.div>
  )
}