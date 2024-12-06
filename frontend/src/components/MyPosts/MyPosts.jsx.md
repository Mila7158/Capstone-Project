import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUserPosts } from "../../store/posts"; // Use action for current user posts
import { Link } from "react-router-dom";
import './MyPosts.css'; // Reuse the same styling as Homepage

const MyPosts = () => {
    const dispatch = useDispatch();

    // Get the current user's posts from Redux state
    const posts = useSelector(state => Object.values(state.posts.currentUserPosts || {}));

    console.log("\nCurrent User's Posts from Redux State:\n", posts); // Debugging step

    useEffect(() => {
        // Fetch the current user's posts on component load
        dispatch(fetchCurrentUserPosts());
    }, [dispatch]);

    return (
        <div className="homepage">
            <div className="posts-container">
                {posts.length > 0 ? (
                    posts.slice().reverse().map((post) => (
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

                            {/* Post Image */}
                            {post.images?.[0] && (
                                <>
                                    {console.log("Rendering Image URL:", post.images[0])} {/* Debugging */}
                                    <img
                                        src={`http://localhost:8000${post.images[0]}`}
                                        alt="Post Image"
                                        
                                    />
                                </>
                            )}
        
                            {/* Author and Date Metadata */}
                            <div className="post-metadata">
                                <p>By {post.author?.username || "Unknown"}</p>
                                <p>Created on {new Date(post.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>You have no posts yet. Create your first post now!</p>
                )}
            </div>
        </div>
    );
};

export default MyPosts;