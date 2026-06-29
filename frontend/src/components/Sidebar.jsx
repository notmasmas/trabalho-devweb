import { NavLink, useNavigate } from 'react-router-dom';
import api from '../api/axios'
import './Sidebar.css';
import logoIFSC from '../assets/img/logo.svg'

export function Sidebar() {
    const navigate = useNavigate();

    function logout () {
        try {
            api.post('/auth/logout', {}, { withCredentials: true })
            navigate('/login', { replace: true });
        }
        catch(error) {
            console.log(error)
        }
    }

    return (
        <nav className="sidebar d-none d-md-flex">
            <div className="logo">
                <img src={logoIFSC} alt="Logo do curso de Design do IFSC" className="logo-design-ifsc"/>
            </div>

            <NavLink to="/" className="nav-item">
                <i className="bi bi-house" />
                <span>Home</span>
            </NavLink>

            <NavLink to="/forum" className="nav-item">
                <i className="bi bi-chat-left-dots" />
                <span>Fórum</span>
            </NavLink>

            <NavLink to="/biblioteca" className="nav-item">
                <i className="bi bi-book" />
                <span>Biblioteca</span>
            </NavLink>

            <a href="/static/html/semestres.html" className="nav-item">
                <i className="bi bi-bezier2" />
                <span>Semestres</span>
            </a>

            <div className="bottom">
                <a onClick={logout} className="nav-item">
                    <i className="bi bi-box-arrow-left"></i>
                    <span>Logout</span>
                </a>
            </div>
        </nav>
    );
}