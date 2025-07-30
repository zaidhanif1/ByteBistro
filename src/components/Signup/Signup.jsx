import { useState } from 'react'
import { useNavigate, Link} from 'react-router-dom'
import { toast } from 'react-toastify';
import './Signup.css'
import { apiCall } from '../../utils/api.js'

export default function Signup()
{
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
 
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const form = e.target;
        const trimmedEmail = email?.trim();
        const trimmedPassword = password?.trim();

        try {
            const data = await apiCall('/signup', {
                method: 'POST',
                body: JSON.stringify({email: trimmedEmail, password: trimmedPassword})         
            });
            if (data.token) {
              localStorage.setItem('token', data.token)
              localStorage.setItem('userId', data.userId)
            }
            
            toast.success('Successfully signed up! Redirecting...', {
              autoClose: 1500
            });

            form.reset();
            setEmail('');
            setPassword('');
            setTimeout(() => {
              navigate('/main')
            }, 1700)

        } catch (error) {
            if (error.message === 'Email already in use') {
                toast.error('Email already in use, try logging in or using another email');
            } else {
                toast.error('Network error. Please check your connection and try again.');
            }
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
                <span>Already have an account? <Link to='/login' style={{color: 'var(--color)'}}>Sign in</Link> </span>
                </div>
            </form>
        </div>
    )
}