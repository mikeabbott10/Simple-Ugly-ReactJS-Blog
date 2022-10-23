const SearchForm = ({ search, setSearch }) => {
    return (
        <div className="searchForm">
            <form onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search">Search Posts</label>
                <input
                    id="search"
                    type="text"
                    placeholder="Search Posts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
        </div>
    )
}

export default SearchForm
