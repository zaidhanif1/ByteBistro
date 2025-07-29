import chef from "../../assets/ByteBistro.png"
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { logout } from '../../utils/api'

export default function Header({toggleTheme, isChecked})
{
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();


    

    return(
    <header className="header">
      <Link to={localStorage.getItem('token') ? '/main' : '/'} style={{ textDecoration: 'none', color: 'inherit'}} className="logo-link">
        <div className="logo-header-div"> 
        <img src={chef} className = "bytebistro-logo"alt="AI Robot Image" />
        <h1>ByteBistro</h1>
        </div>  
         
    </Link>
    <div className="dark-mode-links-container">
    <div className="toggle-container">
            <input 
            type="checkbox"
            id="check"
            className="toggle"
            onChange={toggleTheme}
            checked = {isChecked}
            />
            

            </div> 
    {/* Hamburger icon for mobile */}
    <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
      <span className="bar"></span>
      <span className="bar"></span>
      <span className="bar"></span>
    </button>
    {/* Navigation links */}
    <nav className={`recipe-hrefs${menuOpen ? ' open' : ''}`}>
      <Link to= {localStorage.getItem('token') ? '/savedrecipes' : '/login'} onClick={() => setMenuOpen(false)}>Saved Recipes</Link>
      <Link to = '/main' onClick={() => setMenuOpen(false)}>Generate a recipe</Link>
      {localStorage.getItem('token') 
      ?
      <Link to = '/login' onClick={() => {logout(); setMenuOpen(false)}}>Logout</Link> 
      :
      <Link to = '/login' onClick={() => setMenuOpen(false)}>Login</Link>}
      

      <a href="#" onClick={e => e.preventDefault()}>My Profile</a>
    </nav>
    </div>
    </header>
    )
}