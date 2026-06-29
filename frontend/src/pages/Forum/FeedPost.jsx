export default function FeedPost({ title, body, author, comments = [], tags = [], uploadDate }) {
	function truncate(text, limit) {
		if (text.length <= limit) return text;
		return text.slice(0, limit) + "...";
	}

	return (
  <div className="post">
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
				<span className="post-text"> {truncate(body, 200)} </span>
			</div>

			<div className="post-bottom">
				<div>
					{tags.map((tag) => (
						<span key={tag} className="badge rounded-pill border text-secondary me-1">
							{tag}
						</span>
					))}
    		</div>

				<span>
					<i className="bi bi-chat me-1"></i>
					{comments.length}
				</span>

				</div>
			</div>
  </div>
  )
}
