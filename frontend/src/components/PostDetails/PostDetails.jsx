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
    const [commentErrors, setCommentErrors] = useState([]);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);

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

    const handleAddComment = async (e) => {
        e.preventDefault();

        const errors = [];
        if (newComment.trim().length < 5) {
            errors.push('Comment must be at least 5 characters long.');
        }

        if (errors.length > 0) {
            setCommentErrors(errors);
            return;
        }

        try {
            const commentData = { comment: newComment.trim() };
            await dispatch(createNewComment(post.id, commentData));
            setNewComment('');
            setCommentErrors([]);
        } catch (err) {
            setCommentErrors(err.errors || ['An error occurred while adding the comment.']);
        }
    };

    const handleEditComment = async (e) => {
        e.preventDefault();
        if (editedComment.trim().length < 5) {
            alert('Comment must be at least 5 characters long.');
            return;
        }
        try {
            const commentData = { id: editingCommentId, comment: editedComment.trim() };
            await dispatch(updateComment(commentData, id));
            setEditingCommentId(null);
            setEditedComment('');
        } catch (err) {
            alert('An error occurred while editing the comment.');
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

    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setCommentToDelete(null);
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
                                    <form onSubmit={handleEditComment}>
                                        <textarea
                                            value={editedComment}
                                            onChange={(e) => setEditedComment(e.target.value)}
                                            rows="3"
                                        ></textarea>
                                        <button className='btn-primary' type="submit">Save</button>
                                        <button className='btn-secondary' onClick={() => setEditingCommentId(null)}>Cancel</button>
                                    </form>
                                ) : (
                                    <>
                                        <p className="comment-content">{comment?.comment}</p>
                                        <p className="comment-author">- {comment?.user?.username}</p>
                                    </>
                                )}
                                {isCommentOwner && (
                                    <div className="comment-actions">
                                        <button
                                            className="btn-primary"
                                            onClick={() => {
                                                setEditingCommentId(comment.id);
                                                setEditedComment(comment.comment);
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
                            </div>
                        );
                    })
                ) : (
                    <p>No comments yet. Be the first to comment!</p>
                )}

                {showAddCommentButton && (
                    <div className="add-comment">
                        <h3>Add a Comment</h3>
                        {commentErrors.length > 0 && (
                            <ul className="error-list">
                                {commentErrors.map((error, idx) => (
                                    <li key={idx} className="error">{error}</li>
                                ))}
                            </ul>
                        )}
                        <form onSubmit={handleAddComment}>
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write your comment..."
                                rows="4"
                            ></textarea>
                            <button type="submit" className="btn-primary">Submit Comment</button>
                        </form>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <ConfirmDeleteModal
                    onClose={closeDeleteModal}
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
