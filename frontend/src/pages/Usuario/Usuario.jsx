import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Sidebar, Loading } from '../../components';
import './Usuario.css';

export default function Usuario() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState('');

    useEffect(() => {
        api.get("/auth/verify", { withCredentials: true })
            .then((res) => {
                setUser(res.data.user);
                setName(res.data.user.name);
                setLoading(false);
            })
            .catch(() => {
                setUser(null);
                setLoading(false);
            });
    }, [refresh]);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await api.patch(
                `/user/edit`,
                { name, oldPassword, newPassword },
                { withCredentials: true }
            );

            setInfo('Mudanças salvas!')
            setRefresh(refresh + 1);

        } catch (err) {
            setInfo('Falha na autenticação');
            console.error(err.response?.data || err);
        }
    }

    if (loading) {
        return (
            <Loading />
        );
    }

    return (
        <div className="app-layout">
            <Sidebar />

            <div className="user-main">
                <div className="user-content">

                    <h2>Informações do Usuário</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label className="form-label">
                                Nome
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">
                                E-mail
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                value={user.email}
                                disabled
                                readOnly
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Senha Antiga
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Senha Nova
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Salvar alterações
                        </button>
                        <div className="info-box">
                        <p className="info-paragraph">{info}</p>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}