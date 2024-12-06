import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "../../store/posts"; // Ensure the correct path to your Redux action
import { Link } from "react-router-dom";
import './Homepage.css';

const Homepage = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.posts.allPosts)); // Ensure the state structure is correct

    console.log("\nPosts from Redux State:\n", posts); // Debugging step

    useEffect(() => {
        dispatch(fetchAllPosts()); // Fetch all posts on component load
    
    }, [dispatch]);

    return (
        <div className="homepage">
            <div className="posts-container">
                {posts.slice().reverse().map((post) => (
                    console.log("\nPost Images:\n", post.images), // Debugging
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

                        {/* Add Image */}
                        {post.images?.[0] && (
                            <>                               
                                <img
                                    src={post.images[0]}
                                    alt="Post Image"  
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        objectFit: "cover",
                                        maxWidth: "600px",
                                    }}
                                />
                            </>
                        )}
    
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