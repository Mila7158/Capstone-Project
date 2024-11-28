import { useDispatch } from 'react-redux';
import { updateComment } from '../../store/comments';
import { useState } from 'react';
import './UpdateCommentModal.css';

const UpdateCommentModal = ({ comment, onClose, refreshComments }) => {
    const dispatch = useDispatch();
    const [commentText, setCommentText] = useState(comment.comment);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (commentText.trim().length < 5) {
            setError('Comment must be at least 5 characters long.');
            return;
        }

        const result = await dispatch(updateComment({ id: comment.id, comment: commentText }));

        if (result && result.errors) {
            setError(result.errors);
        } else {
            refreshComments(); 
            onClose();
        }
    };

    return (
        <div id="modal">
            <div id="modal-background" onClick={onClose} />
            <div id="modal-content">
                <div className="comments-modal">
                    <h2>Update Your Comment</h2>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <textarea
                            placeholder="Update your comment here..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button
                            type="submit"
                            className={commentText.trim().length < 5 ? 'disabled-button' : 'enabled-button'}
                            disabled={commentText.trim().length < 5}
                        >
                            Submit Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateCommentModal;
