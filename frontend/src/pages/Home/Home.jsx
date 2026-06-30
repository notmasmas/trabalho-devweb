import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import api from '../../api/axios';
import { Sidebar, Loading } from '../../components'
import './Home.css';

export default function Home() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/auth/verify", { withCredentials: true })
            .then((res) => {
                setUser(res.data.user);
                setLoading(false);
            })
            .catch(() => {
                setUser(null);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <div className="app-layout">
            <Sidebar/>
            
            <div className="main-wrapper">
            <div className="grid-container-wrapper">
                {/* Agora o user.name nunca vai ler null! */}
            <h2 className="grid-titulo">Olá, <span className="user-nome">{user.name}! </span></h2>

                <div className="grid-botoes">
                    <div className="grid-item">
                        <Link to="/forum" className="btn-quadrado">
                            <div><i className="bi bi-chat-left fs-1"></i></div>
                            Fórum
                        </Link>
                    </div>
                    <div className="grid-item">
                        <Link to="/biblioteca" className="btn-quadrado">
                            <div><i className="bi bi-book fs-1"></i></div>
                            Biblioteca
                        </Link>
                    </div>
                    <div className="grid-item">
                        <Link to="semestres" className="btn-quadrado">
                            <div><i className="bi bi-bezier2 fs-1"></i></div>
                            Semestres
                        </Link>
                    </div>
                    <div className="grid-item">
                        <Link to="/usuario" className="btn-quadrado">
                            <div><i className="bi bi-person fs-1"></i></div>
                            Minha Conta
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
