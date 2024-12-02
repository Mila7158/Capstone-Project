import { csrfFetch } from './csrf';
import { fetchPostById } from './posts';

const LOAD_COMMENTS = "comments/loadComments";
const DELETE_COMMENT = "comments/deleteComment";
const UPDATE_COMMENT = "comments/updateComment";


// Action Creators
const loadComments = (comments) => ({
    type: LOAD_COMMENTS,
    comments,
});

const removeComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId,
});


// Thunks
export const fetchComments = () => async (dispatch) => {
    try {
        const response = await csrfFetch('/api/comments/current');
        if (response.ok) {
            const comments = await response.json();
         
            dispatch(loadComments(comments));
        } else {
            console.error('Error fetching comments for the current user');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

export const updateComment = (comment, postId = null) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/comments/${comment.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(comment),
        });

        if (response.ok) {
            await response.json();

            if (postId) {
                dispatch(fetchPostById(postId));
            } else {
                dispatch(loadComments());
            }
        } else {
            console.error('Error updating comment');
        }
    } catch (err) {
        console.error('Error in updateComment thunk:', err);
    }
};


export const deleteComment = (commentId, postId = null) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/comments/${commentId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            await response.json();

            if (postId) {
                dispatch(fetchPostById(postId));
            } else {
                dispatch(removeComment(commentId));
            }
        } else {
            console.error('Error updating comment');
        }
    } catch (err) {
        console.error('Error in updateComment thunk:', err);
    }

};

// Reducer
const initialState = {
    commentsByPost: {}
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_COMMENTS: {
            const newState = { ...state, commentsByPost: {} };
            action.comments.forEach((comment) => {
                newState.commentsByPost[comment.id] = comment;
            });
            return newState;
        }
        case DELETE_COMMENT: {
            const newState = { ...state, commentsByPost: { ...state.commentsByPost } };
            delete newState.commentsByPost[action.commentId];
            return newState;
        }
        case UPDATE_COMMENT: {
            const newState = { ...state.commentsByPost };
            newState[action.comment.id] = action.comment;
            return { commentsByPost: newState };
        }
        default:
            return state;
    }
};

export default commentsReducer;
