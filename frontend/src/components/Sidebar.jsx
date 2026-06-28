//import { NavLink } from 'react-router';
import './Sidebar.css';
import logoIFSC from '../assets/img/logo.svg'

export function Sidebar() {
    return (
        <nav className="sidebar d-none d-md-flex">
            <div className="logo">
                <img src={logoIFSC} alt="Logo do curso de Design do IFSC" className="logo-design-ifsc"/>
            </div>

            <a href="/static/html/home.html" className="nav-item">
                <i className="bi bi-house" />
                <span>Home</span>
            </a>
            <a href="/static/html/forum.html" className="nav-item">
                <i className="bi bi-chat-left-dots" />
                <span>Fórum</span>
            </a>
            <a href="/static/html/biblioteca.html" className="nav-item">
                <i className="bi bi-book" />
                <span>Biblioteca</span>
            </a>
            <a href="/static/html/semestres.html" className="nav-item">
                <i className="bi bi-bezier2" />
                <span>Semestres</span>
            </a>
            <div className="bottom">
                <a href="#" className="nav-item">
                    <i className="bi bi-box-arrow-left"></i>
                    <span>Logout</span>
                </a>
            </div>
        </nav>
    );
}