import { useState } from 'react'
import './Signup.css'

export default function Signup()
{


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch ('http://localhost:8000/api/signup', {
        method: 'POST', 
        headers: 
        {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({email, password})

                
    });
        const data = await res.json();
        console.log(data)
    }




    return (
<div className='signup-page'>
    <h1 className='signup-h1'>Sign up below</h1>
        <form className='signup-form' onSubmit={handleSubmit}>
        <div className='inputs'>
            <input 
            placeholder = 'Email'
            className='email-inp' 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  
            />

            <input 
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