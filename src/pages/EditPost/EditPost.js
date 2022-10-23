import { format } from "date-fns";
import { useContext, useEffect, useRef} from "react";
import { useParams, Link } from "react-router-dom";
import api from '../../api/posts';
import { useNavigate } from 'react-router-dom';
import DataContext from "../../context/DataContext";

const EditPost = () => {
    const navigate = useNavigate();
    const editTitleRef = useRef();
    const editBodyRef = useRef();

    const { posts, setPosts } = useContext(DataContext);
    const { id } = useParams();
    const post = posts.find(post => post.id.toString() === id);

    useEffect(()=>{
        if(post){
            editTitleRef.current.value = post.title;
            editBodyRef.current.value = post.body;
        }
    }, [post])

    const handleEdit = async (id) => {
        const editTitle = editTitleRef.current.value;
        const editBody = editBodyRef.current.value;

        const datetime = format(new Date(), 'MMM dd, yyyy pp');
        const updatedPost = {
            id,
            title: editTitle,
            datetime,
            body: editBody
        }
        try {
            const response = await api.put(`/posts/${id}`, updatedPost);
            setPosts(currentPosts => {
                return currentPosts.map(post => post.id === id ? { ...response.data } : post)
            });
            navigate('/');
        } catch (err) {
            if(err.response){
                // axios handling
                // Not in the 200 response range
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.header);
            }else
                console.log(`Error: ${err.message}`);
        }
    }

    return (
        <main className="NewPost">
            {post &&
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title</label>
                        <input
                            id="postTitle"
                            type="text"
                            required
                            ref={editTitleRef}
                        />
                        <label htmlFor="postBody">Body</label>
                        <textarea
                            id="postBody"
                            required
                            ref={editBodyRef}
                        />

                        <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!post &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's disappointing.</p>
                    <p>
                        <Link to='/'>Go to the Homepage</Link>
                    </p>
                </>
            }
        </main>
    )
}

export default EditPost