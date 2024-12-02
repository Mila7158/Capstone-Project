import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../store/posts"; // Ensure the correct path to your Redux action
import './Homepage.css';
import { Link } from "react-router-dom";

const Homepage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.posts.allPosts)); // Ensure the state structure is correct

    useEffect(() => {
        dispatch(fetchAllPosts()); // Fetch all posts on component load
    
    }, [dispatch]);

    return (
        <div className="homepage">
            <div className="posts-container">
                {posts.slice().reverse().map((post) => (
                    <div key={post.id} className="post-tile">
                        {/* Post Title */}
                        <div className="post-title">
                            <h3>{post.title}</h3>
                        </div>
    
                        {/* Post Preview */}
                        <div className="post-preview-container">
                            <p className="fan-post-preview">
                                {post.fan_post.length > 100
                                    ? `${post.fan_post.slice(0, 100)}...`
                                    : post.fan_post}
                            </p>
                        </div>

                        {/* Read More Button Container */}
                        <div className="read-more-container">
                            <Link className="btn-secondary read-more-btn" to={`/posts/${post.id}`}>
                                Read More
                            </Link>
                        </div>
    
                        {/* Author and Date Metadata */}
                        <div className="post-metadata">
                            <p>By {post.author?.username || "Unknown"}</p>
                            <p>Created on {new Date(post.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default Homepage;