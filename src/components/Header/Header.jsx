import chef from "../../assets/ByteBistro.png"
import './Header.css'
import { Link } from 'react-router-dom'

export default function Header()
{

    const prevent = (e) => {
        e.preventDefault()

    }

    return(
    <header className="header">
      <Link to='/' style={{ textDecoration: 'none', color: 'inherit'}} className="logo-link">

        <img src={chef} className = "bytebistro-logo"alt="AI Robot Image" />
        <h1>ByteBistro</h1>
       
    </Link>
      
    </header>
    )
}