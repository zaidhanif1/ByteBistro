import chef from "../../assets/ByteBistro.png"
import './Header.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Header({toggleTheme, isChecked})
{
    const [menuOpen, setMenuOpen] = useState(false);
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
      <Link to= '/savedrecipes' onClick={() => setMenuOpen(false)}>Saved Recipes</Link>
      <Link to = '/main' onClick={() => setMenuOpen(false)}>Generate a recipe</Link>
      <a href="#" onClick={e => e.preventDefault()}>My Profile</a>
    </nav>
    </div>
    </header>
    )
}