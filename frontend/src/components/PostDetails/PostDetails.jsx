import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPostById, updatePostById, deletePostById, createNewComment } from '../../store/posts';
import { deleteComment, updateComment } from '../../store/comments';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import './PostDetails.css';

function PostDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const post = useSelector((state) => state?.posts?.currentUserPosts[id]);
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
    const [commentToDelete, setCommentToDelete] = useState(null);

    const MAX_COMMENT_LENGTH = 300;
    const MIN_COMMENT_LENGTH = 5;

    useEffect(() => {
        dispatch(fetchPostById(id));
    }, [dispatch, id]);

    if (!post) return <p>Loading...</p>;

    const isPostOwner = currentUser?.id === post.User?.id;
    const hasAlreadyCommented = post?.comments?.some(
        (comment) => comment?.user?.id === currentUser?.id
    );

    const showAddCommentButton = currentUser && !isPostOwner && !hasAlreadyCommented;

    const handleEditClick = () => {
        setIsEditing(true);
        setEditTitle(post.title);
        setEditContent(post.fan_post);
    };

    const handleSaveEdit = async () => {
        const updatedPost = {
            title: editTitle,
            fan_post: editContent,
        };
        await dispatch(updatePostById(post.id, updatedPost));
        setIsEditing(false);
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
            await dispatch(updateComment(commentData, id));
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
            await dispatch(deleteComment(commentToDelete, id));
            setIsModalOpen(false);
            setCommentToDelete(null);
        }
    };

    // const closeDeleteModal = () => {
    //     setIsModalOpen(false);
    //     setCommentToDelete(null);
    // };


    return (
        <div className="post-details-container main-container">
            {isEditing ? (
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
                    <button onClick={handleSaveEdit} className="btn-primary">Save</button>
                    <button onClick={handleCancelEdit} className="btn-secondary">Cancel</button>
                </div>
            ) : (
                <>
                    <h1 className="post-title">{post?.title}</h1>
                    <p className="post-author">Posted by {post?.User?.username}</p>
                    <div className="post-content">
                        <p>{post.fan_post}</p>
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