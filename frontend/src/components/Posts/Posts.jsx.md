import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUserPosts, updatePostById, deletePostById } from '../../store/posts';
// import { Link } from "react-router-dom";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import './Posts.css';

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => Object.values(state.posts.currentUserPosts));
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [editingPostId, setEditingPostId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');

    useEffect(() => {
        dispatch(fetchCurrentUserPosts());  
    }, [dispatch]);

    const openDeletePostModal = (postId) => {
        setPostToDelete(postId);
        setIsPostModalOpen(true);
    };

    const handleDeletePost = async () => {
        if (postToDelete) {
            await dispatch(deletePostById(postToDelete));
            setIsPostModalOpen(false);
            setPostToDelete(null);
        }
    };

    const closeDeleteModal = () => {
        setIsPostModalOpen(false);
        setPostToDelete(null);
    };

    const handleEditClick = (post) => {
        setEditingPostId(post.id);
        setEditTitle(post.title);
        setEditContent(post.fan_post);
    };

    // const handleSaveEdit = async () => {

    //     const currentPost = posts.find((p) => p.id === editingPostId);

    //     if (editingPostId) {
    //         const updatedPost = {
    //             title: editTitle,
    //             fan_post: editContent,
    //             images: currentPost.images || [],
    //         };

    //         console.log("Updated Post Object:", updatedPost); // Debugging

    //         await dispatch(updatePostById(editingPostId, updatedPost));
    //         setEditingPostId(null);
    //         setEditTitle('');
    //         setEditContent('');
    //     }
    // };

    const handleSaveEdit = async (post) => {
        console.log("\n!!!!Post!!! ", post);
        if (post) {
            const updatedPost = {
                title: editTitle,
                fan_post: editContent,
                images: post.images || [], // Include existing images
            };
            console.log("\n\n!!!Updated Post Object:", updatedPost); // Debugging
            await dispatch(updatePostById(post.id, updatedPost));
            setEditingPostId(null);
            setEditTitle('');
            setEditContent('');
        }
    };

    const handleCancelEdit = () => {
        setEditingPostId(null);
        setEditTitle('');
        setEditContent('');
    };

    return (
        <div className="homepage">
            <div className="posts-container">
                {posts.slice().reverse().map((post) => (
                    <div key={post.id} className="post-tile">
                        {editingPostId === post.id ? (
                            // Editing Mode
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

                                {/* Add Image */}
                                
                                {post.images?.[0] && (
                                    <div className="post-image-container">                                     
                                        <img
                                            src={`http://localhost:8000${post.images[0]}`}
                                            alt="Post Image"  
                                            style={{
                                                width: "300px",
                                                height: "200px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                )}

                                <div className="post-actions">
                                    <>
                                    {console.log("\n!!????Post!!! ", post)}
                                    </>
                                    <button onClick={() => handleSaveEdit(post)} className="btn-primary">Save</button>
                                    <button onClick={handleCancelEdit} className="btn-secondary">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <>
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

                                {/* Add Image */}
                                {post.images?.[0] && (
                                    <div className="post-image-container">  
                                        
                                        <img
                                            src={`http://localhost:8000${post.images[0]}`}
                                            alt="Post Image"  
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                objectFit: "cover",
                                                maxWidth: "600px",
                                            }}
                                        />
                                    </div>
                                )}
        
                                {/* Post Actions */}
                                <div className="post-actions">
                                    <button className="btn-secondary" onClick={() => openDeletePostModal(post.id)}>Delete</button>
                                    <button className="btn-primary" onClick={() => handleEditClick(post)}>Edit</button>
                                </div>            
                                
                                {/* Date Metadata */}
                                <div className="post-metadata">                            
                                    <p>Created on {new Date(post.createdAt).toLocaleDateString()}</p>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>

            {isPostModalOpen && (
                <ConfirmDeleteModal
                    onClose={closeDeleteModal}
                    onConfirm={handleDeletePost}
                    modalValue="post"
                />
            )}

        </div>
    );
};



export default Posts;