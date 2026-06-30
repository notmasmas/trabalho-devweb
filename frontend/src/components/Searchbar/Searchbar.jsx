import './SearchBar.css';

export default function Searchbar ({search, setSearch}) {

    return (
        <div className="search-wrapper">
            <input
                className="search-box"
                type="text"
                placeholder="Pesquisar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}>
            </input>
        </div>
    )
}