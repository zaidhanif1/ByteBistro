import chef from "../../assets/ByteBistro.png"
import './Header.css'

export default function Header()
{

    const prevent = (e) => {
        e.preventDefault()

    }

    return(
    <header className="header">
      
        <a href="/" onClick={prevent} className="logo-link">
        <img src={chef} className = "bytebistro-logo"alt="AI Robot Image" />
        <h1>ByteBistro</h1>
        </a>
      
    </header>
    )
}