import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUserPosts, deletePostById } from '../../store/posts';
import { NavLink, useNavigate } from 'react-router-dom';
import './Posts.css';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => Object.values(state.posts.currentUserPosts));
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [expandedPosts, setExpandedPosts] = useState({}); // Tracks which posts are expanded

    useEffect(() => {
        dispatch(fetchCurrentUserPosts()); // Fetch current user's posts on component load
    }, [dispatch]);

    const handleDelete = async () => {
        if (selectedPostId) {
            await dispatch(deletePostById(selectedPostId));
            setIsModalOpen(false);
        }
    };

    const openDeleteModal = (postId) => {
        setSelectedPostId(postId);
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsModalOpen(false);
    };

    const handleUpdate = (postId) => {
        navigate(`/posts/${postId}/edit`);
    };

    const toggleExpandPost = (postId) => {
        setExpandedPosts((prevState) => ({
            ...prevState,
            [postId]: !prevState[postId],
        }));
    };

    return (
        <div className='manage-posts'>
            <h2>Manage Posts</h2>
            <NavLink to="/posts/new" className="create-post-button">Create New Post</NavLink>

            <div className="posts-container">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className="post-tile">
                            <NavLink to={`/posts/${post.id}`} className="post-title-link">
                                <h3>{post.title}</h3>
                            </NavLink>
                            <div className="post-content-preview">
                                {post?.fan_post?.length > 100 && !expandedPosts[post.id] ? (
                                    <>
                                        {post?.fan_post?.slice(0, 100)}...
                                        <button
                                            onClick={() => toggleExpandPost(post.id)}
                                            className="read-more-button"
                                        >
                                            Read More
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {post?.fan_post}
                                        {post?.fan_post?.length > 100 && (
                                            <button
                                                onClick={() => toggleExpandPost(post.id)}
                                                className="read-more-button"
                                            >
                                                Show Less
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                            <div className="post-metadata">
                                <p>Created on {new Date(post.createdAt).toLocaleDateString()}</p>
                                <p>Last updated {new Date(post.updatedAt).toLocaleDateString()}</p>
                            </div>
                            <div className="post-actions manage-post-buttons">
                                <button onClick={() => handleUpdate(post.id)}>Update</button>
                                <button onClick={() => openDeleteModal(post.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No posts found. Create your first post!</p>
                )}

                {isModalOpen && (
                    <ConfirmDeleteModal
                        onClose={closeDeleteModal}
                        onConfirm={handleDelete}
                        modalValue="post"
                    />
                )}
            </div>
        </div>
    );
};

export default Posts;
