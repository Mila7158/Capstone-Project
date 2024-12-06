import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, deleteComment } from '../../store/comments';
import UpdateCommentModal from '../UpdateCommentModal/UpdateCommentModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import './ManageComments.css';


const ManageComments = () => {
    const dispatch = useDispatch();
    const comments = useSelector((state) => Object.values(state.comments.commentsByPost));
    const [selectedComment, setSelectedComment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
  

    useEffect(() => {
        dispatch(fetchComments());
    }, [dispatch]);

    const handleDelete = () => {
        setIsCommentModalOpen(false);
        dispatch(deleteComment(commentToDelete));
    };

    const handleUpdateClick = (comment) => {
        setSelectedComment(comment);
        setIsModalOpen(true);
    };

    const refreshComments = () => {
        dispatch(fetchComments());
    };

    const openDeleteModal = (commentId) => {
        setCommentToDelete(commentId);
        setIsCommentModalOpen(true);
    };

    return (
        <div className="manage-comments main-container">
            {/* <h2>Manage Your Comments</h2> */}
            <div className="comments-container">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="comment-tile  post-tile">
                            <h3>Post: {comment.Post?.title}</h3>
                            <p className="comment-date">
                                {new Date(comment.createdAt).toLocaleString('default', { month: 'long' })} {new Date(comment.createdAt).getFullYear()}
                            </p>
                            <p className="comment-text">{comment.comment}</p>
                            <div className="comment-actions">
                                <button className="btn-secondary" onClick={() => handleUpdateClick(comment)}>Update</button>
                                <button
                                    className="btn-danger"
                                    onClick={() => openDeleteModal(comment.id)}
                                >
                                    Delete Comment
                                </button>
                                {/* <button className="btn-danger" onClick={() => handleDelete(comment.id)}>Delete</button> */}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No comments found.</p>
                )}
            </div>
            {isModalOpen && selectedComment && (
                <UpdateCommentModal
                    comment={selectedComment}
                    onClose={() => setIsModalOpen(false)}
                    refreshComments={refreshComments}
                />
            )}

             {isCommentModalOpen && (
                <ConfirmDeleteModal
                    onClose={() => setIsCommentModalOpen(false)}
                    onConfirm={handleDelete}
                    modalValue="comment"
                />
            )}
        </div>
    );
};

export default ManageComments;