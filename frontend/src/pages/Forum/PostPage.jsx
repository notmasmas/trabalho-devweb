import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; //pega o id da URL
import api from "../../api/axios";
import { Loading, Input, Sidebar } from "../../components";
import SinglePost from "./SinglePost"
import CreateComment from "./CreateComment"
import PostComments from "./PostComments"
import './Forum.css'

export default function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
		const [user, setUser] = useState(null);
		const [refresh, setRefresh] = useState(0);

		useEffect(() => {
    api.get("/auth/verify", { withCredentials: true })
        .then((res) => setUser(res.data.user))
        .catch(() => setUser(null));
		}, []);

    useEffect(() => {
    api.get(`/posts/${id}`, { withCredentials: true })
        .then((res) => setPost(res.data));
    }, [id, refresh]); //useEffect vai rodar toda vez que o valor do id ou refresh mudarem

    if (!post) return < Loading />;
    
    return (
        <div className="app-layout">
            <Sidebar />
            
        <main>
            <SinglePost {...post} user={user}/>
                <div className="comments-section">
                    <CreateComment id={post._id} onSuccess={() => setRefresh(r => r + 1)}/>
                    <PostComments comments={post.comments}/>
                </div>
            </main>
        </div>
    )
}