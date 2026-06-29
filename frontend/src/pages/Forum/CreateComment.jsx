import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Input } from "../../components";

export default function CreateComment({ id, onSuccess }) {
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");

    async function handleComment() {
        try {
            await api.post(`/posts/comments/${id}`, { text: comment }, { withCredentials: true });
            setComment("");
            onSuccess?.();
        } catch (err) {
            const msg = err.response?.data?.error;
            setError(msg);
        }
  }

    return (
        <div className="comment">
            <Input type="text" placeholder="Deixe seu comentário" value={comment} onChange={(e) => setComment(e.target.value)} />
            <button onClick={handleComment} className="btn bi bi-send"/>
            {error && <p className="error">{error}</p>}
        </div>
    )
}