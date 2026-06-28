import { useEffect, useState } from 'react'
import api from "../../api/axios";
import { Sidebar } from '../../components/Sidebar'
import { SearchBar } from '../../components/SearchBar';
import { Link } from 'react-router-dom';
import Post from './Post'
import './Forum.css'

export default function Forum() {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState("")
	const [refresh, setRefresh] = useState(0);
	const [user, setUser] = useState(null);

	useEffect(() => {
        api.get("/auth/verify", { withCredentials: true })
            .then((res) => setUser(res.data.user))
            .catch(() => setUser(null));
    }, []);

  useEffect(() => {
    api.get(`/posts?limit=${page * 5}&title=${search}`, {
      withCredentials: true
    })
      .then((response) => {
        setPosts(response.data.posts);
      })
    }, [page, search, refresh])
	
	return (
    <div className="app-layout">
			<Sidebar />

		<main>
			<h1>Fórum</h1>
			<p>Deixe suas dúvidas ou compartilhe informações com demais alunos e professores!</p>
			
			<div className="search-create">
				<SearchBar search={search} setSearch={setSearch} />
				<button className="btn btn-primary add-content post-button">
          <i className="bi bi-pencil me-1"></i>
          Criar post
        </button>
			</div>

			<div className="feed-wrapper">
				{posts.map(({ _id, ...postProps }) => (
					<Link key={_id} to={`/forum/${_id}`} style={{ textDecoration: 'none' }}>
						<Post {...postProps} />
					</Link>
				))}
			</div>


			<button type="button" className="btn btn-primary load-more" onClick={() => {setPage(page + 1)}}>Carregar mais</button>
			</main>
    </div>
  )
}