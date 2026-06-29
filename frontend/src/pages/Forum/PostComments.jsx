export default function PostComments({ comments = [] }) {
    return (
        <div className="comments-list">
            {comments.map((comment, index) => (
                <div key={index} className="comment-item">
                    <span className="comment-user">{comment.user}</span>
                    <span className="comment-text">{comment.text}</span>
                </div>
            ))}
        </div>
    )
}
