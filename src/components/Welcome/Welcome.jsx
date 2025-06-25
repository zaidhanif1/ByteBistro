import './Welcome.css'
import { Link } from 'react-router-dom'

export default function Welcome()
{
    return(
       <div className="welcome-page">
        <p className='welcome-txt-p'>Welcome to ByteBistro!👋 </p>
        <h1 className='welcome-h1'>Have a few ingredients on hand? <br />
         Don't know what to make? <br />
         <span className='help-you-out-text'>Let ByteBistro help you out!</span> </h1>
         <p>ByteBistro is your AI-powered sous-chef—just <br />
         give it ingredients, and it serves up a gourmet recipe. 
        </p>
         <div className='buttons'>  
            
        

        <Link to='/api/signup' style={{textDecoration: 'none'}}>
        <button className='signup-btn'>Sign up</button>
        </Link>
        <button className='login-btn'>Login</button>
        </div>
        </div>
    )
}