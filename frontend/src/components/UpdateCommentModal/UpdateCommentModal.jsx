import { useDispatch } from 'react-redux';
import { updateComment } from '../../store/comments';
import { useState } from 'react';
import './UpdateCommentModal.css';

const UpdateCommentModal = ({ comment, onClose, refreshComments }) => {
    const dispatch = useDispatch();
    const [commentText, setCommentText] = useState(comment.comment);
    const [error, setError] = useState(null);

    const validateComment = (text) => {
        if (text.trim().length < 5) {
            return 'Comment must be at least 5 characters long.';
        } else if (text.trim().length > 300) {
            return 'Comment cannot exceed 300 characters.';
        }
        return null;
    };

    const handleInputChange = (e) => {
        const text = e.target.value;
        setCommentText(text);
        setError(validateComment(text)); // Update error state dynamically
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const errorMessage = validateComment(commentText);
        if (errorMessage) {
            setError(errorMessage);
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
                            onChange={handleInputChange} // Validate while typing
                        />
                        <button
                            type="submit"
                            className={
                                commentText.trim().length < 5 || commentText.trim().length > 300
                                    ? 'disabled-button'
                                    : 'enabled-button btn-primary'
                            }
                            disabled={commentText.trim().length < 5 || commentText.trim().length > 300}
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
