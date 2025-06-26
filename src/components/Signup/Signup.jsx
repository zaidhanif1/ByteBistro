import { useState } from 'react'
import './Signup.css'

export default function Signup()
{


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const form = e.target

        const trimmedEmail = email?.trim()
        const trimmedPassword = password?.trim()

        
        const API_BASE = import.meta.env.MODE === 'development' 
        ? 'http://localhost:8000' 
        : "https://bytebistro-production.up.railway.app";

        
        const res = await fetch (`${API_BASE}/api/signup`, {
        method: 'POST', 
        headers: {
            "Content-Type": 'application/json'
        },

        body: JSON.stringify({email: trimmedEmail, password: trimmedPassword})         
    });

        const data = await res.json();
        
        form.reset()
        setEmail('')
        setPassword('')
    }


   

    return (
<div className='signup-page'>
    <h1 className='signup-h1'>Sign up below</h1>
        <form className='signup-form' onSubmit={handleSubmit}>
        <div className='signup-inputs-container'>
            <input 
            name = 'email'
            placeholder = 'Email'
            className='email-inp' 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  
            />

            <input 
            name='password'
            placeholder = 'Password'
            className='pswd-inp' 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
            <button className='sign-up-btn' type='submit'>Sign up!</button>
        </form>
</div>
    )
}