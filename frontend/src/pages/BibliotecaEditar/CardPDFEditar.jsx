import api from '../../api/axios';
import logoIFSC from '../../assets/img/logo.svg';
import './CardPDFEditar.css'

export default function CardPDFEditar({ cardFile, setIsModalOpen, setCurrentFile }) {

    function deleteFile() {
        api.delete(`/files/${cardFile._id}`, { withCredentials: true })
            .then(() => {
                setCurrentFile(null);
                window.location.reload();
            })
            .catch((err) => {
                console.error(err.response?.data || err);
            });
    }

    return (
        <div className="col-12 col-md-6 col-lg-4">
            <div className="card pdf-card">

                <img
                    src={logoIFSC}
                    className="pdf-card-image"
                    alt="logo" />

                <div className="card-body pdf-card-body">
                    <div className="card-body pdf-card-body">
                        <h5 className="card-title">{cardFile.name}</h5>
                        <p className="card-text">{cardFile.description}</p>
                    </div>

                    <div className="edit-button-wrap">
                        <button className="btn btn-primary" onClick={() => { setIsModalOpen(true); setCurrentFile(cardFile) }}>
                            <i className="bi bi-pencil"></i>
                            Editar
                        </button>
                        <button className="btn btn-primary" onClick={() => deleteFile()}>
                            <i className="bi bi-trash"></i>
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}