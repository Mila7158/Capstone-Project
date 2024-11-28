import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, deleteComment } from '../../store/comments';
import UpdateCommentModal from '../UpdateCommentModal/UpdateCommentModal';
import './ManageComments.css';

const ManageComments = () => {
    const dispatch = useDispatch();
    const comments = useSelector((state) => Object.values(state.comments.commentsByPost));
    const [selectedComment, setSelectedComment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(comments)

    useEffect(() => {
        dispatch(fetchComments()); 
    }, [dispatch]);

    const handleDelete = (commentId) => {
        dispatch(deleteComment(commentId));
    };

    const handleUpdateClick = (comment) => {
        setSelectedComment(comment);
        setIsModalOpen(true);
    };

    const refreshComments = () => {
        dispatch(fetchComments());
    };

    return (
        <div className="manage-comments">
            <h2>Manage Your Comments</h2>
            <div className="comments-container">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment.id} className="comment-tile">
                            <h3>Post: {comment.Post?.title}</h3>
                            <p className="comment-date">
                                {new Date(comment.createdAt).toLocaleString('default', { month: 'long' })} {new Date(comment.createdAt).getFullYear()}
                            </p>
                            <p>{comment.comment}</p>
                            <div className="comment-actions">
                                <button onClick={() => handleUpdateClick(comment)}>Update</button>
                                <button onClick={() => handleDelete(comment.id)}>Delete</button>
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
        </div>
    );
};

export default ManageComments;
