import { useState } from "react";
import api from "../../api/axios";
import './ModalPDF.css';

export function ModalPDF({ user, isOpen, onClose, onSuccess }) {
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [isProtected, setIsProtected] = useState(false);

    const [errors, setErrors] = useState({});

    function validate() {
        const newErrors = {};

        if (!name.trim()) newErrors.name = "Nome é obrigatório";
        if (!author.trim()) newErrors.author = "Autor é obrigatório";
        //if (!description.trim()) newErrors.description = "Descrição é obrigatória";
        if (!file) newErrors.file = "PDF é obrigatório";

        if (file && file.type !== "application/pdf") {
            newErrors.file = "Apenas arquivos PDF são permitidos";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    function resetData () {
        setName("");
        setAuthor("");
        setDescription("");
        setFile(null);
        setErrors({});
        onClose();
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validate()) return;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("author", author);
        formData.append("description", description);
        formData.append("file", file);
        formData.append("protected", isProtected);

        try {
            await api.post("/files", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            setName("");
            setAuthor("");
            setDescription("");
            setFile(null);
            setErrors({});

            onSuccess?.();
            onClose();

        } catch (err) {
            console.error(err);
        }
    }

    if (!isOpen) {
        return null
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box">
                <h2>Upload de PDF</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <p className="error">{errors.name || ''}</p>

                    <input
                        placeholder="Autor"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    <p className="error">{errors.author || ''}</p>

                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <p className="error">{errors.description || ''}</p>

                    <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <p className="error">{errors.file || ''}</p>

                    {user?.role !== "student" && (<button
                        type="button"
                        className={`protect-btn ${isProtected ? "active" : ""}`}
                        onClick={() => setIsProtected((prev) => !prev)}>
                        {isProtected ? "Protegido ✔" : "Protegido?"}
                    </button>)}

                    <div className="modal-actions">
                        <button type="button" onClick={resetData} className="btn btn-primary">
                            Cancelar
                        </button>

                        <button type="submit" className="btn btn-primary">
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}