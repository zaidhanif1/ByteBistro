import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { FaGithub } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'

export default function Footer()
{
    return(
            <div className='footer-main-div'>
                <div className='buy-coffee-div'>
                    <p>Support Me!</p>
                <a href="https://buymeacoffee.com/zaidhanif" target = '_blank' className='buy-me-coffee-a'> Made with ☕ and late nights. </a>
                </div>
        <div className='social-links'>
            <p>Personal Links</p>
            <a href="https://zaidhanif.netlify.app/" target = '_blank'><FontAwesomeIcon icon={faCircleUser} /> Portfolio</a>
            <a href="https://github.com/zaidhanif1" target = '_blank'><FaGithub /> GitHub</a>
            <a href="https://www.linkedin.com/in/zaidhanif/" target = '_blank'><FaLinkedin /> LinkedIn</a>
        </div>
            </div>

    )
}