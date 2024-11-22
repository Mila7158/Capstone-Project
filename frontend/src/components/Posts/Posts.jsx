
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePostById } from '../../store/posts'; 
import { NavLink, useNavigate } from 'react-router-dom';
import './Posts.css';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal'; 
import { useModal } from '../../context/ModalContext';

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => Object.values(state.posts.allPosts)); 
    const navigate = useNavigate();

    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [selectedPostId, setSelectedPostId] = useState(null);
    const { setModalContent, closeModal } = useModal(); // Modal context methods

    useEffect(() => {
        dispatch(fetchPosts()); // Fetch all posts on component load
    }, [dispatch]);

    const handleDelete = async () => {
        if (selectedPostId) {
            await dispatch(deletePostById(selectedPostId));
            // setIsModalOpen(false);
            closeModal(); // Close the modal after successful deletion
        }
    };

    const openDeleteModal = (postId) => {
        setSelectedPostId(postId);
        setModalContent(
            <ConfirmDeleteModal
                onClose={closeModal}
                onConfirm={handleDelete}
                modalValue="post"
            />
        ); // Set modal content using Modal context
    };

    const handleUpdate = (postId) => {
        navigate(`/posts/${postId}/edit`);
    };

    const [selectedPostId, setSelectedPostId] = useState(null); // Store the selected post ID

    return (
        <div className="manage-posts">
            <h2>Manage Posts</h2>
            <NavLink to="/posts/new" className="create-post-button">Create New Post</NavLink>

            <div className="posts-container">
                {posts.map((post) => (
                    <div key={post.id} className="post-tile">
                        <NavLink to={`/posts/${post.id}`}>
                            <div className="post-title">
                                <h3>{post.title}</h3>
                            </div>
                            <div className="post-content-preview">
                                <p>
                                    {post.fan_post.length > 100
                                        ? `${post.fan_post.slice(0, 100)}...`
                                        : post.fan_post}
                                </p>
                            </div>
                        </NavLink>
                        <div className="post-actions manage-post-buttons">
                            <button onClick={() => handleUpdate(post.id)}>Update</button>
                            <button onClick={() => openDeleteModal(post.id)}>Delete</button>
                        </div>
                    </div>
                ))}

                {/* {isModalOpen && (
                    <ConfirmDeleteModal
                        onClose={closeDeleteModal}
                        onConfirm={handleDelete}
                        modalValue="post"
                    />
                )} */}
            </div>
        </div>
    );
};

export default Posts;