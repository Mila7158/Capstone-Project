import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUserPosts, updatePostById, deletePostById } from "../../store/posts";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal"; // Assuming you have a ConfirmDeleteModal component
import { useNavigate } from 'react-router-dom';
import './MyPosts.css';
import '../PostDetails/PostDetails.css';

const MyPosts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.posts.currentUserPosts || {}));
    // const currentUser = useSelector((state) => state?.session?.user);

    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [editImageUrl, setEditImageUrl] = useState('');
    const [postToEdit, setPostToEdit] = useState(null);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    useEffect(() => {
        dispatch(fetchCurrentUserPosts());
    }, [dispatch]);

    const navigate = useNavigate();

    const handleManagePostClick = (post) => {
    setPostToEdit(post);
    setEditTitle(post.title);
    setEditContent(post.fan_post);
    setEditImageUrl(post.images?.[0] || '');
    setIsEditing(true);

    // Navigate to the PostDetails page for editing
    navigate(`/posts/${post.id}`);
    };

    const handleSaveEdit = async () => {
        if (!postToEdit || !postToEdit.id) {
            console.error("Post or post ID is missing");
            return;
        }

        const updatedPost = {
            title: editTitle,
            fan_post: editContent,
            images: [editImageUrl]
        };

        try {
            await dispatch(updatePostById(postToEdit.id, updatedPost));
            setIsEditing(false);
            setPostToEdit(null);
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    const handleDeletePost = async () => {
        if (postToDelete) {
            await dispatch(deletePostById(postToDelete));
            setIsPostModalOpen(false);
            setPostToDelete(null);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setPostToEdit(null);
    };

    return (
        <div className="homepage">
            <div className="posts-container">
                {isEditing && postToEdit ? (
                    <div className="edit-post-form">
                        <h2>Edit Post</h2>
                        <label>
                            Title:
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                        </label>
                        <label>
                            Content:
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                            />
                        </label>

                        <label>
                            Image URL:
                            <input
                                type="text"
                                value={editImageUrl}
                                onChange={(e) => setEditImageUrl(e.target.value)}
                            />
                        </label>

                        {editImageUrl && (
                            <div className="image-preview-container" style={{ textAlign: "left", marginBottom: "20px" }}>
                                <img
                                    src={editImageUrl}
                                    alt="Post Image"
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        objectFit: "cover",
                                        maxWidth: "400px",
                                    }}
                                />
                            </div>
                        )}

                        <button onClick={handleSaveEdit} className="btn-primary">
                            Save
                        </button>
                        <button onClick={handleCancelEdit} className="btn-secondary">
                            Cancel
                        </button>
                    </div>
                ) : (
                    posts.length > 0 ? (
                        posts.slice().reverse().map((post) => {                            

                            return (
                                <div key={post.id} className="post-tile">
                                    {/* Post Title */}
                                    <h1 className="post-title">{post?.title}</h1>

                                    {/* Post Preview */}
                                    <div className="post-content">                   
                                        <p>{post.fan_post}</p>

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
                                                        
                                                                       
                                        <div className="post-actions">
                                            <button onClick={() => handleManagePostClick(post)} className="btn-secondary">Manage Post</button>                                            
                                        </div>                           
                                        
                                    </div>

                                    {/* Author and Date Metadata */}
                                    <div className="post-metadata">                                        
                                        <p>Created on {new Date(post.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p style={{ color: 'white' }}>You have no posts yet. Create your first post now!</p>
                    )
                )}
            </div>

            {/* Confirm Delete Modal */}
            {isPostModalOpen && (
                <ConfirmDeleteModal
                    onClose={() => setIsPostModalOpen(false)}
                    onConfirm={handleDeletePost}
                    modalValue="post"
                />
            )}
        </div>
    );
};

export default MyPosts;