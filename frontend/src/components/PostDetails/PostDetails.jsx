import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPostById, updatePostById, deletePostById, createNewComment } from '../../store/posts';
import { deleteComment, updateComment } from '../../store/comments';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import './PostDetails.css';

function PostDetails() {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const post = useSelector((state) => state?.posts?.currentUserPosts[postId]);
    const currentUser = useSelector((state) => state?.session?.user);


    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [newComment, setNewComment] = useState('');
    const [commentErrors, setCommentErrors] = useState('');
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState('');
    const [editedCommentErrors, setEditedCommentErrors] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [editImageUrl, setEditImageUrl] = useState('');
    const [saveTrigger, setSaveTrigger] = useState(false);
    
    const [commentToDelete, setCommentToDelete] = useState(null);

    const MAX_COMMENT_LENGTH = 300;
    const MIN_COMMENT_LENGTH = 5;

    useEffect(() => {

        console.log("1111111useEffect triggered. postId:", postId);

        if (postId) {
            console.log("Fetching post with postId:", postId);
            dispatch(fetchPostById(postId));
        } else {
            console.error("Invalid postId in useEffect:", postId);
        }
    }, [dispatch, postId]);

    useEffect(() => {
        if (post && isEditing) {
            console.log("\n000000000 Entering edit mode. Post data:", post);
            setEditTitle(post.title || '');
            setEditContent(post.fan_post || '');
    
            // Log the images array from the post object
            console.log("Images in post data:", post.images);
    
            // Set the image URL (as a relative path)
            const firstImageUrl = post.images?.[0] || '';
            if (firstImageUrl) {
                setEditImageUrl(firstImageUrl);
                console.log("Set editImageUrl to (relative):", firstImageUrl);
            } else {
                setEditImageUrl('');
                console.log("No image found, setting editImageUrl to empty.");
            }
        }
    }, [post, isEditing, saveTrigger]);

    if (!post) return <p>Loading...</p>;

    const isPostOwner = currentUser?.id === post.authorId;
    const hasAlreadyCommented = post?.comments?.some(
        (comment) => comment?.user?.id === currentUser?.id
    );

    const showAddCommentButton = currentUser && !isPostOwner && !hasAlreadyCommented;

    const handleEditClick = () => {
        setIsEditing(true);
        setEditTitle(post.title);
        setEditContent(post.fan_post);
    };

    const handleSaveEdit = async (post) => {
        if (!post || !post.id) {
            console.error("Post or post ID is missing");
            return;
        }
    
        // Log the current editImageUrl value before making changes
        console.log("Current editImageUrl value before constructing updatedPost:", editImageUrl);
    
        // Construct the updated post object
        const updatedPost = {
            title: editTitle,
            fan_post: editContent,
            images: editImageUrl.startsWith('http://localhost:8000')
                ? [editImageUrl.replace('http://localhost:8000', '')]
                : [editImageUrl],
        };
    
        console.log("\n!!Updated Post Object:", updatedPost);
        console.log("\n!!Updated Post ID:", post.id);
    
        try {
            // Dispatch the update action
            await dispatch(updatePostById(post.id, updatedPost));
    
            // Re-fetch post data to ensure Redux state is updated correctly
            await dispatch(fetchPostById(post.id));
    
            // Toggle saveTrigger state to force useEffect to run again
            setSaveTrigger((prevTrigger) => !prevTrigger);
    
            // Clear form state
            setEditTitle('');
            setEditContent('');
            setEditImageUrl('');
            setIsEditing(false);
            navigate(`/posts/${post.id}`);
        } catch (error) {
            console.error("Error in handleSaveEdit:", error);
        }
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const openDeletePostModal = () => {
        setIsPostModalOpen(true);
    };

    const handleDeletePost = async () => {
        await dispatch(deletePostById(post.id));
        setIsPostModalOpen(false);
        navigate('/');
    };

    const validateComment = (comment) => {
        if (comment.trim().length < MIN_COMMENT_LENGTH) {
            return `Comment must be at least ${MIN_COMMENT_LENGTH} characters long.`;
        } else if (comment.trim().length > MAX_COMMENT_LENGTH) {
            return `Comment cannot exceed ${MAX_COMMENT_LENGTH} characters.`;
        }
        return '';
    };

    const handleAddCommentChange = (e) => {
        const value = e.target.value;
        setNewComment(value);
        setCommentErrors(validateComment(value));
    };

    const handleAddComment = async (e) => {
        e.preventDefault();

        if (commentErrors) return;

        try {
            const commentData = { comment: newComment.trim() };
            await dispatch(createNewComment(post.id, commentData));
            setNewComment('');
            setCommentErrors('');
        } catch (err) {
            setCommentErrors(err.errors || 'An error occurred while adding the comment.');
        }
    };

    const handleEditCommentChange = (e) => {
        const value = e.target.value;
        setEditedComment(value);
        setEditedCommentErrors(validateComment(value));
    };

    const handleEditComment = async (e) => {
        e.preventDefault();

        if (editedCommentErrors) return;

        try {
            const commentData = { id: editingCommentId, comment: editedComment.trim() };
            await dispatch(updateComment(commentData, postId));
            setEditingCommentId(null);
            setEditedComment('');
            setEditedCommentErrors('');
        } catch (err) {
            setEditedCommentErrors('An error occurred while editing the comment.');
        }
    };

    const openDeleteModal = (commentId) => {
        setCommentToDelete(commentId);
        setIsModalOpen(true);
    };

    const handleDeleteComment = async () => {
        if (commentToDelete) {
            await dispatch(deleteComment(commentToDelete, postId));
            setIsModalOpen(false);
            setCommentToDelete(null);
        }
    };

    return (
        <div className="post-details-container main-container">
            {isEditing ? (
                <div className="edit-post-form">
                    <h2>Edit Post</h2>
                    <label>
                        Title:
                        <input
                            type="text"
                            className="edit-input-title"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                    </label>                    
                    <label>
                        Content:
                        <textarea
                            className="edit-input-content"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                        />
                    </label>

                    {/* Image URL Input Field */}
                    <label>
                        Image URL:
                        <input
                            type="text"
                            className="edit-input-image-url"
                            value={editImageUrl}
                            onChange={(e) => setEditImageUrl(e.target.value)}
                        />
                    </label>

                    {/* Image Preview */}
                    {editImageUrl && (
                        <div className="image-preview-container" style={{ textAlign: "left", marginBottom: "20px" }}>
                            <img
                                src={
                                    editImageUrl.startsWith('http')
                                        ? editImageUrl
                                        : `http://localhost:8000${editImageUrl}`
                                }
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

                    <button
                        onClick={() => {
                            // console.log("\n&&&&&&&&&&&&Post being passed to handleSaveEdit:", post.id);
                            handleSaveEdit(post);
                        }}
                        className="btn-primary"
                    >
                        Save
                    </button>
                    <button onClick={handleCancelEdit} className="btn-secondary">Cancel</button>
                </div>
            ) : (
                <>
                    <h1 className="post-title">{post?.title}</h1>
                    <p className="post-author">Posted by {post?.User?.username}</p>
                    <div className="post-content">                   
                        <p>{post.fan_post}</p>

                        {/* Add Image */}
                        {post.images?.[0] && (
                            <>  
                                {/* {console.log("\n!!!!!!Rendering Image URL:\n", post.images[0])} */}
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
                            </>
                        )}
                                             
                        {isPostOwner && (                               
                            <div className="post-actions">
                                <button onClick={handleEditClick} className="btn-secondary">Edit Post</button>
                                <button onClick={openDeletePostModal} className="btn-danger">Delete Post</button>
                            </div>                           
                        )}
                    </div>
                </>
            )}             
            <div className="post-comments">
                <h2>Comments</h2>
                {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment) => {
                        const isCommentOwner = currentUser?.id === comment.user?.id;
                        return (
                            <div key={comment.id} className="comment">
                                {editingCommentId === comment.id ? (
                                    // Editing Mode: Show Save and Cancel Buttons
                                    <form onSubmit={handleEditComment}>
                                        <textarea
                                            value={editedComment}
                                            onChange={handleEditCommentChange}
                                            rows="3"                                            
                                        ></textarea>
                                        {editedCommentErrors && (
                                            <p className="error">{editedCommentErrors}</p>
                                        )}
                                        <button
                                            type="submit"
                                            className={editedCommentErrors ? 'disabled-button' : 'enabled-button btn-primary'}
                                            disabled={!!editedCommentErrors}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className='btn-secondary'
                                            type="button"
                                            onClick={() => setEditingCommentId(null)}
                                        >
                                            Cancel
                                        </button>
                                    </form>
                                ) : (
                                    // View Mode: Show Comment Content
                                    <>
                                        <p className="comment-content">{comment?.comment}</p>
                                        <p className="comment-author">- {comment?.user?.username}</p>
                                        {isCommentOwner && (
                                            <div className="comment-actions">
                                                <button
                                                    className="btn-primary"
                                                    onClick={() => {
                                                        setEditingCommentId(comment.id);
                                                        setEditedComment(comment.comment);
                                                        setEditedCommentErrors('');
                                                    }}
                                                >
                                                    Edit Comment
                                                </button>
                                                <button
                                                    className="btn-danger"
                                                    onClick={() => openDeleteModal(comment.id)}
                                                >
                                                    Delete Comment
                                                </button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p>No comments yet. Be the first to comment!</p>
                )}

                {showAddCommentButton && (
                    <div className="add-comment">
                        <h3>Add a Comment</h3>
                        {commentErrors && <p className="error">{commentErrors}</p>}
                        <form onSubmit={handleAddComment}>
                            <textarea
                                value={newComment}
                                onChange={handleAddCommentChange}
                                placeholder="Write your comment..."
                                rows="4"                                
                            ></textarea>
                            <button
                                type="submit"
                                className={commentErrors ? 'disabled-button' : 'enabled-button btn-primary'}
                                disabled={!!commentErrors}
                            >
                                Submit Comment
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <ConfirmDeleteModal
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleDeleteComment}
                    modalValue="comment"
                />
            )}
            {isPostModalOpen && (
                <ConfirmDeleteModal
                    onClose={() => setIsPostModalOpen(false)}
                    onConfirm={handleDeletePost}
                    modalValue="post"
                />
            )}
        </div>
    );
}

export default PostDetails;