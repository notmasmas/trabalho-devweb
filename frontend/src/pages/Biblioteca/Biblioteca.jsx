import { useEffect, useState } from 'react'
import api from "../../api/axios";
import { Sidebar } from '../../components/Sidebar'
import { CardPDF } from './CardPDF'
import './Biblioteca.css'

export default function Biblioteca () {
    const [files, setFiles] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        api.get(`/files?limit=${page * 10}`, {
            withCredentials: true
        })
            .then((response) => {
                setFiles(response.data.files);
            })
    }, [page])

    return (
    <div className="app-layout">
    <Sidebar />

    <main className="container">
    <h1>Biblioteca</h1>
    <p>Aqui você encontra materiais auxiliares para a suas aulas compartilhados por professores e outros alunos!</p>

    <div className="add-content-wrapper">
        <button className="btn btn-primary add-content">
            <i className="bi bi-file-earmark-plus"></i>
            Adicionar conteúdo
        </button>
    </div>

    <div className="row row-cols-1 row-cols-md-3 g-4 pdf-wrapper">
        {
        files.map ((file) => {
            console.log(file);
            return (
                <CardPDF
                    key={file["_id"]}
                    cardID={file["_id"]}
                    cardTitle={file["name"]}
                    cardDescription={file["description"]}
                />
            )
        })}
    </div>

    <button type="button" className="btn btn-primary load-more" onClick={() => {setPage(page + 1)}}>Carregar mais</button>
  </main>
  </div>
  )
}