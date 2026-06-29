import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from "../../api/axios";
import { Sidebar } from '../../components/Sidebar'
import { SearchBar } from '../../components/SearchBar';
import { CardPDF } from './CardPDF'
import { ModalPDF } from './ModalPDF';
import './Biblioteca.css'

export default function Biblioteca () {
    const [files, setFiles] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [user, setUser] = useState(null);

    useEffect(() => {
        api.get("/auth/verify", { withCredentials: true })
            .then((res) => setUser(res.data.user))
            .catch(() => setUser(null));
    }, []);

    useEffect(() => {
        api.get(`/files?limit=${page * 10}&name=${search}`, {
            withCredentials: true
        })
            .then((response) => {
                setFiles(response.data.files);
            })
    }, [page, search, refresh])

    return (
    <div className="app-layout">
    <Sidebar/>

    <main className="biblioteca-main">
    <h1>Biblioteca</h1>
    <p>Aqui você encontra materiais auxiliaresetIsModals para a suas aulas compartilhados por professores e outros alunos!</p>

    <div className="add-content-wrapper">
        <SearchBar search={search} setSearch={setSearch}/>
        <button className="btn btn-primary add-content" onClick={() => {setIsModalOpen(true)}}>
            <i className="bi bi-file-earmark-plus"></i>
             Adicionar conteúdo
        </button>
        <Link to="/biblioteca/editar" className="btn btn-primary add-content">
            <i className="bi bi-pencil"></i>
             Editar meus PDFs
        </Link>
    </div>

    <div className="row g-4 pdf-wrapper">
        {files.map(file => (
            <CardPDF
                key={file._id}
                cardID={file._id}
                cardTitle={file.name}
                cardDescription={file.description}
            />
        ))}
    </div>

    <button type="button" className="btn btn-primary load-more" onClick={() => {setPage(page + 1)}}>Carregar mais</button>
    <ModalPDF
        user={user}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
            setRefresh(refresh + 1); // recarrega lista
        }}
    />
  </main>
  </div>
  )
}