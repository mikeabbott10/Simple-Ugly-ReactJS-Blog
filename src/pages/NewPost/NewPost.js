import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import api from '../../api/posts';
import { format } from 'date-fns';

const NewPost = () => {
    const navigate = useNavigate();
    const newPostTitle = useRef();
    const newPostBody = useRef();
    const [isBtnDisabled, setIsBtnDisabled] = useState(true);

    const { posts, setPosts } = useContext(DataContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), 'MMM dd, yyyy pp');
        const newPost = {
            id,
            title: newPostTitle.current.value,
            datetime,
            body: newPostBody.current.value
        }

        try {
            const response = await api.post('/posts', newPost);
            setPosts(currentPosts => {
                return [...currentPosts, response.data];
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

    const isInputValid = () => {
        setIsBtnDisabled(!newPostTitle.current.value || !newPostBody.current.value)
    }

    return (
        <main className="NewPost">
            <h2>New Post</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title</label>
                <input
                    id="postTitle"
                    type="text"
                    required
                    ref={newPostTitle}
                    onChange={isInputValid}
                />
                <label htmlFor="postBody">Body</label>
                <textarea
                    id="postBody"
                    required
                    ref={newPostBody}
                    onChange={isInputValid}
                />

                <button 
                    type="submit"
                    disabled={isBtnDisabled}>Submit</button>
            </form>
        </main>
    )
}

export default NewPost
