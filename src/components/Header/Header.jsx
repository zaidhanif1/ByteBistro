import chef from "../../assets/ByteBistro.png"
import './Header.css'
import { Link } from 'react-router-dom'

export default function Header({toggleTheme, isChecked})
{
    const currentUrl = window.location.href;
    console.log(currentUrl)

    

    return(
    <header className="header">
      <Link to='/' style={{ textDecoration: 'none', color: 'inherit'}} className="logo-link">
        <div className="logo-header-div">
        <img src={chef} className = "bytebistro-logo"alt="AI Robot Image" />
        <h1>ByteBistro</h1>
        </div>  
         
    </Link>
    <div className="toggle-container">
            <input 
            type="checkbox"
            id="check"
            className="toggle"
            onChange={toggleTheme}
            checked = {isChecked}
            />
            

            </div> 

     


    </header>
    )
}