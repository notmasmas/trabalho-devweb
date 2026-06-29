import { useState } from "react";
import api from "../../api/axios";
import './Forum.css';

export function ModalPost({ user, isOpen, onClose, onSuccess }) {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [body, setBody] = useState("");
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState({});
    const allowedTypes = ["image/png", "image/jpeg"];

    function validate() {
        const newErrors = {};

        if (!title.trim()) newErrors.title = "Título é obrigatório";
        if (!body.trim()) newErrors.body = "Texto é obrigatório";
        //tags não são obrigatórias
        if (tags && tags.split(",").some(tag => tag.trim() === "")) {  //some verifica se as tags estão vazias depois do trim
            newErrors.tags = "As tags devem ser separadas por vírgula";
        }

        if (file && !allowedTypes.includes(file.type)) {
            newErrors.file = "Apenas arquivos PNG ou JPG são permitidos";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    function resetData () {
        setTitle("");
        setBody("");
        setTags("");
        setFile(null);
        setErrors({});
        onClose();
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!validate()) return;

        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", body);
        formData.append("tags", tags);
        formData.append("file", file);

        try {
            await api.post("/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            });

            setTitle("");
            setBody("");
            setTags("");
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
                <h2>Crie seu post</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <p className="error">{errors.title || ''}</p>

                    <textarea
                        placeholder="Texto"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <p className="error">{errors.body || ''}</p>

                    <input
                        placeholder="Tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                    <p className="error">{errors.tags || ''}</p>

                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <p className="error">{errors.file || ''}</p>

                    <div className="modal-actions">
                        <button type="button" onClick={resetData} className="btn btn-primary">
                            Cancelar
                        </button>

                        <button type="submit" className="btn btn-primary">
                            Criar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}