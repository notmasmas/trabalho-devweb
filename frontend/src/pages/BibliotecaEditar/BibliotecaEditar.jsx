import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from "../../api/axios";
import { Sidebar } from '../../components'
import CardPDFEditar from './CardPDFEditar'
import ModalEditar from './ModalEditar'
import './BibliotecaEditar.css'

export default function BibliotecaEditar () {
    const [files, setFiles] = useState([]);
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [currentFile, setCurrentFile] = useState(null);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        api.get("/auth/verify", { withCredentials: true })
            .then((res) => setUser(res.data.user))
            .catch(() => setUser(null));
    }, []);

    useEffect(() => {
        if (!user) return;

        api.get(`/files?limit=${page * 10}&uploader=${user.id}`, {
            withCredentials: true
        })
        .then((response) => {
            setFiles(response.data.files);
        });

    }, [page, user, refresh]);

    return (
    <div className="app-layout">
    <Sidebar/>

    <main className="container">
    <h1>Editar PDFs</h1>
    <p>Aqui você encontra materiais que você publicou na biblioteca!</p>

    <div className="add-content-wrapper">
        <Link to="/biblioteca" className="btn btn-primary add-content">
             Voltar
        </Link>
    </div>

    <div className="row g-4 pdf-wrapper">
        {
        files.length === 0?
         <div className="col-12 d-flex justify-content-center align-items-center" style={{ minHeight: "150px" }}>
            <p>Você não tem nenhum arquivo</p>
        </div>
        : files.map ((file) => {
            return (
                <CardPDFEditar
                    key={file["_id"]}
                    cardFile={file}
                    setIsModalOpen={setIsModalOpen}
                    setCurrentFile={setCurrentFile}
                />
            )
        })}
    </div>

    <button type="button" className="btn btn-primary load-more" onClick={() => {setPage(page + 1)}}>Carregar mais</button>
  </main>    
  <ModalEditar
          user={user}
          isOpen={isModalOpen}
          file={currentFile}
          onClose={() => setIsModalOpen(false)}
          onSuccess={() => {
            setRefresh(refresh + 1); // recarrega lista
          }}
      />

  </div>
  )
}