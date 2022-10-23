import { createContext, useState, useEffect } from "react";
import useAxiosFetch from '../hooks/useAxiosFetch';
import useWindowSize from "../hooks/useWindowSize";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const {width} = useWindowSize();

    // posts
    const [posts, setPosts] = useState([]);
    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

    useEffect(() => {
        setPosts(currentPosts => {
            return data;
        })
    }, [data]);
    // useEffect does not compare arrays: [data] === [data] 
    // it compares every value inside the arrays: data === data

    return (
        <DataContext.Provider value={{
            width, fetchError, isLoading,
            posts, setPosts
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;