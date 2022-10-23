import Feed from "./Feed";
import { useContext, useEffect, useState } from 'react';
import DataContext from './context/DataContext';
import SearchForm from './SearchForm'

const Home = () => {
    const {posts, fetchError, isLoading} = useContext(DataContext);

    // search
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const filteredResults = posts.filter(post =>
            post.body.toLowerCase().includes(search.toLowerCase())
            || post.title.toLowerCase().includes(search.toLowerCase())
        );
        setSearchResults(filteredResults.reverse());
    }, [posts, search])
    
    return (
        <>
            <SearchForm search={search} setSearch={setSearch}/>
            <main className="Home">
                {isLoading && <p className="statusMsg">Loading posts...</p>}
                {!isLoading && fetchError && <p className="statusMsg" style={{color:"red"}}>{fetchError}</p>}
                {!isLoading && !fetchError &&
                    (
                        searchResults.length ? (
                            <Feed posts={searchResults} />
                        ) : (
                            <p className="statusMsg" style={{marginTop: '2rem'}}>
                                No post to display
                            </p>
                        )
                    )
                }
            </main>
        </>
    )
}

export default Home
