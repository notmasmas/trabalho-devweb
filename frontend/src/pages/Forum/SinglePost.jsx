import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function SinglePost({ title, body, author, authorId, _id, comments = [], tags = [], imageURI, uploadDate, user }) {
	async function handleDelete() {
		await api.delete(`/posts/${_id}`, { withCredentials: true });
		window.history.back(); //volta pra o forum
	}

	function truncate(text, limit) {
		if (text.length <= limit) return text;
		return text.slice(0, limit) + "...";
	}

	return (
    <div className="post-single">
      <div className="post-wrapper">
        <div className="post-top">
          <span className="post-username"> {author} </span>
          <span className="post-date">
						{new Date(uploadDate).toLocaleString("pt-BR", {
								dateStyle: "short",
								timeStyle: "short"
						})}
          </span>
        </div>

				<div className="post-center">
					<span className="post-name"> {title} </span>
					<span className="post-text"> {body} </span>
					{imageURI && <img className="post-img" src={`http://localhost:3000/${imageURI}`} />}
				</div>

				<div className="post-bottom">
					<div>
						{tags.map((tag) => (
							<span key={tag} className="badge rounded-pill border text-secondary me-1">
								{tag}
							</span>
						))}
					</div>

					{user?.id === authorId && (  //só vai aparecer se o usuário for autor do post
						<button className="btn btn-danger btn-sm" onClick={handleDelete}>
							<i className="bi bi-trash me-1"></i>
							Deletar
						</button>
					)}
        </div>
    	</div>
  	</div>
  )
}