import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../store/posts"; // Ensure the correct path to your Redux action
import './Homepage.css';
import { Link, NavLink } from "react-router-dom";

const Homepage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.posts.allPosts)); // Ensure the state structure is correct

    useEffect(() => {
        dispatch(fetchAllPosts()); // Fetch all posts on component load
        console.log("\n!!!!Dispatched fetchAllPosts\n"); // Debugging log
    }, [dispatch]);

    return (
        <div className="homepage">
            <div className="posts-container">
                {posts.map((post) => (
                    <div key={post.id} className="post-tile">
                        {/* Post Title */}
                        <NavLink to={`/posts/${post.id}`}>
                            <div className="post-title">
                                <h3>{post.title}</h3>
                            </div>
                        </NavLink>

                        {/* Post Preview */}
                        <div className="post-details">
                            <p className="fan-post-preview">
                                {post.fan_post.length > 100
                                    ? `${post.fan_post.slice(0, 100)}...`
                                    : post.fan_post}
                            </p>
                        </div>

                        {/* Author and Date Metadata */}
                        <div className="post-metadata">
                            <p>By {post.author?.username || "Unknown"}</p>
                            <p>Created on {new Date(post.createdAt).toLocaleDateString()}</p>
                            <Link className='btn-secondary' to={`/posts/${post.id}`}>Read more</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;
