import './Signup.css'

export default function Signup()
{
    return (
        <div className='signup-page'>
        <h1>Sign up below</h1>
        <form className='signup-form'>
        <div className='inputs'>
        <input placeholder = 'Email'className='email-inp' type="email"  />
        <input placeholder = 'Password'className='pswd-inp' type="password"  />
        </div>
        <button className='sign-up-btn'>Sign up!</button>
        </form>

        </div>
    )
}