import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../api/axios'
import './Sidebar.css';
import logoIFSC from '../assets/img/logo.svg'

export function Sidebar() {
    // useNavigate serve para redirecionar
    const navigate = useNavigate();
    // useState controla se o menu do celular está aberto
    const [aberto, setAberto] = useState(false);

    // Função responsável por encerrar a sessão do usuário
    function logout() {
        try {
            api.post('/auth/logout', {}, { withCredentials: true });
            navigate('/login', { replace: true });
        } catch(error) {
            console.log(error);
        }
    }

    // Função simples para esconder o menu de celular
    function fechar() {
        setAberto(false);
    }

    return (
        <>
            {/* --- Sidebar desktop --- */}
            <nav className="sidebar d-none d-md-flex">
                <div className="logo">
                    <img src={logoIFSC} alt="Logo do curso de Design do IFSC" className="logo-design-ifsc"/>
                </div>

                <NavLink to="/"          className="nav-item"><i className="bi bi-house" /><span>Home</span></NavLink>
                <NavLink to="/forum"     className="nav-item"><i className="bi bi-chat-left-dots" /><span>Fórum</span></NavLink>
                <NavLink to="/biblioteca"className="nav-item"><i className="bi bi-book" /><span>Biblioteca</span></NavLink>
                <NavLink to="/semestres" className="nav-item"><i className="bi bi-bezier2" /><span>Semestres</span></NavLink>

                <div className="bottom">
                    <NavLink to="/usuario" className="nav-item"><i className="bi bi-person" /><span>Conta</span></NavLink>
                    <a onClick={logout} className="nav-item" style={{ cursor: 'pointer' }}>
                        <i className="bi bi-box-arrow-left" />
                        <span>Logout</span>
                    </a>
                </div>
            </nav>

            {/* --- Botão hambúrguer (só mobile) --- */}
            <button className="hamburger d-md-none" onClick={() => setAberto(true)}>
                <i className="bi bi-list" />
            </button>

            {/* --- Menu fullscreen mobile --- */}
            {aberto && (
                <div className="menu-mobile">
                    <button className="menu-mobile-fechar" onClick={fechar}>
                        <i className="bi bi-x-lg" />
                    </button>

                    <nav className="menu-mobile-nav">
                        {/* Passamos o onClick={fechar} para que o menu feche automaticamente logo após clicar em um link */}
                        <NavLink to="/"           onClick={fechar}>Home</NavLink>
                        <NavLink to="/forum"      onClick={fechar}>Fórum</NavLink>
                        <NavLink to="/biblioteca" onClick={fechar}>Biblioteca</NavLink>
                        <NavLink to="/semestres"  onClick={fechar}>Semestres</NavLink>
                        <NavLink to="/usuario"  onClick={fechar}>Minha Conta</NavLink>
                        <a onClick={logout}>Logout</a>
                    </nav>

                    <a className="menu-mobile-logout" onClick={() => { logout(); fechar(); }}>
                        Logout
                    </a>
                </div>
            )}
        </>
    );
}