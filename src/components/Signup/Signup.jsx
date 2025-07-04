import { useState } from 'react'
import { useNavigate, Link} from 'react-router-dom'
import { toast } from 'react-toastify';
import './Signup.css'

export default function Signup()
{
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
 
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const form = e.target;
        const trimmedEmail = email?.trim();
        const trimmedPassword = password?.trim();
        const API_BASE = import.meta.env.MODE === 'development' 
        ? 'http://localhost:8000' 
        : "https://bytebistro-production.up.railway.app";

        try {
            const res = await fetch(`${API_BASE}/api/signup`, {
                method: 'POST', 
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({email: trimmedEmail, password: trimmedPassword})         
            });

            const data = await res.json();
            
            if(res.ok) {
                toast.success('Successfully signed up!');
                form.reset();
                setEmail('');
                setPassword('');

            } else if(res.status === 409) {
        
                toast.error('Email already in use, try logging in or using another email', {

                });
            } else {
                toast.error(data.message || 'Signup failed. Please try again.');
                setError(data.message || 'Signup failed. Please try again.');
            }
        } catch (error) {
            toast.error('Network error. Please check your connection and try again.');
            setError('Network error. Please check your connection and try again.');
        }
    }

    return (
        <div className='signup-page'>
            <h1 className='signup-h1'>Sign up below</h1>
            <form className='signup-form' onSubmit={handleSubmit}>
                <div className='signup-inputs-container'>
                    <input 
                        name='email'
                        placeholder='Email'
                        className='email-inp' 
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}  
                    />

                    <input 
                        name='password'
                        placeholder='Password'
                        className='pswd-inp' 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='bottom-div-signup'>
                <button className='sign-up-btn' type='submit'>Sign up!</button>
                <span>Already have an account? <Link to='/login' style={{color: "black"}}>Sign in</Link> </span>
                </div>
            </form>
        </div>
    )
}