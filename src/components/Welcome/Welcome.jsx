import './Welcome.css'

export default function Welcome()
{
    return(
       <div className="welcome-page">
        <p>Welcome to ByteBistro!👋 </p>
        <h1 className='welcome-h1'>Have a few ingredients on hand? <br />
         Don't know what to make? <br />
         <span className='help-you-out-text'>Let ByteBistro help you out!</span> </h1>
         <div className='buttons'>
        <button>Sign up</button>
        <button>Login</button>
        </div>
        </div>
    )
}