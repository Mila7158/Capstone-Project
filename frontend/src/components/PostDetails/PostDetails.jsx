import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPostById } from '../../store/posts'; // Update with the correct Redux action path
import './PostDetails.css';

function PostDetails() {
    const { id } = useParams();  
    const dispatch = useDispatch();
    
    const post = useSelector((state) => state?.posts?.currentPost);
    
    useEffect(() => {
        dispatch(fetchPostById(id)); // Fetch the post details by ID
    }, [dispatch, id]);

    if (!post) return <p>Loading...</p>;

    return (
        <div className="post-details-container">
            <h1 className="post-title">{post.title}</h1>
            <p className="post-author">Posted by {post.User?.username}</p>
            <div className="post-content">
                <p>{post.fan_post}</p>
            </div>
            <div className="post-comments">
                <h2>Comments</h2>
                {post.Comments && post.Comments.length > 0 ? (
                    post.Comments.map((comment) => (
                        <div key={comment.id} className="comment">
                            <p className="comment-author">{comment.User?.username}:</p>
                            <p className="comment-content">{comment.comment}</p>
                        </div>
                    ))
                ) : (
                    <p>No comments yet. Be the first to comment!</p>
                )}
            </div>
        </div>
    );
}

export default PostDetails;