import chef from "../../assets/ChefGPT-transparent.png"
import './Header.css'

export default function Header()
{
    return(
    <header className="header">
        <a href="/" className="logo-link">
        <img src={chef} alt="AI Robot Image" />
        <h1>ByteBistro</h1>
        </a>
    </header>
    )
}