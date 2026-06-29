import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./ModalEditar.css";

export default function ModalEditar({
    user,
    file,
    isOpen,
    onClose,
    onSuccess
}) {
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [isProtected, setIsProtected] = useState(false);

    useEffect(() => {
        if (!file) return;

        setName(file.name || "");
        setAuthor(file.author || "");
        setDescription(file.description || "");
        setIsProtected(file.protected || false);
    }, [file]);

    function resetData() {
        setName("");
        setAuthor("");
        setDescription("");
        setIsProtected(false);
        onClose();
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!file) return;

        try {
            await api.patch(
                `/files/${file._id}`,
                {
                    name,
                    author,
                    description,
                    protected: isProtected
                },
                {
                    withCredentials: true
                }
            );

            onSuccess?.();
            resetData();

        } catch (err) {
            console.error(err.response?.data || err);
        }
    }

    if (!isOpen || !file) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-box">

                <h2>Editando PDF</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Autor"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />

                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    {user?.role !== "student" && (
                        <button
                            type="button"
                            className={`protect-btn ${isProtected ? "active" : ""}`}
                            onClick={() => setIsProtected((prev) => !prev)}
                        >
                            {isProtected ? "Protegido ✔" : "Protegido?"}
                        </button>
                    )}

                    <div className="modal-actions">

                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={resetData}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Salvar alterações
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}