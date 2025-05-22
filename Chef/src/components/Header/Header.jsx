import chef from "../../assets/ChefGPT-transparent.png"
import './Header.css'

export default function Header()
{
    return(
    <header className="header">
        <img src={chef} alt="AI Robot Image" />
        <h1>ChefGPT</h1>

    </header>
    )
}