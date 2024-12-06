import { csrfFetch } from './csrf';

const LOAD_POST = "posts/loadPost";
const LOAD_POSTS = "posts/loadPosts";
const LOAD_ALL_POSTS = "posts/loadAllPosts";
const CREATE_POST = "posts/createPost";
const UPDATE_POST = "posts/updatePost";
const DELETE_POST = "posts/deletePost";
// const UPDATE_POST_IMAGES = "posts/updatePostImages";
const CREATE_COMMENT = "comments/createComment";
const LOAD_CURRENT_USER_POSTS = "posts/loadCurrentUserPosts";



const loadPosts = (posts) => ({
    type: LOAD_POSTS,
    posts
});

const loadPost = (post) => ({
    type: LOAD_POST,
    post
});

const loadAllPosts = (posts) => ({
    type: LOAD_ALL_POSTS,
    posts
});

const createPost = (post) => ({
    type: CREATE_POST,
    post
});

const deletePost = (postId) => ({
    type: DELETE_POST,
    postId
});

const loadCurrentUserPosts = (posts) => ({
    type: LOAD_CURRENT_USER_POSTS,
    posts,
});


export const fetchPosts = () => async (dispatch) => {
    const response = await csrfFetch('/api/posts/current');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadPosts(data.Posts));
    } else {
        console.error('Error fetching posts');
    }
};

export const fetchAllPosts = () => async (dispatch) => {
    try {
        const response = await csrfFetch('/api/posts');
        if (response.ok) {
            const data = await response.json();  

            console.log('\nFetched Posts:\n', data); // Debugging step

            dispatch(loadAllPosts(data.Posts));

        } else {
            console.error('Error fetching all posts');
        }
    } catch (err) {
        console.error('Error:', err);
    }
};

export const fetchCurrentUserPosts = () => async (dispatch) => {
    try {
        const response = await csrfFetch('/api/posts/current');
        if (response.ok) {
            const data = await response.json();
            dispatch(loadCurrentUserPosts(data.Posts));
        } else {
            console.error('Error fetching current user posts');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};


// export const fetchPostById = (id) => async (dispatch) => {
//     try {
//         const response = await csrfFetch(`/api/posts/${id}`);
//         if (!response.ok) throw response;
//         const post = await response.json();
//         dispatch(loadPost(post));
//     } catch (err) {
//         console.error('Error fetching post details:', err);
//         const errorData = await err.json();
//         return errorData.errors || ['Error fetching post details'];
//     }
// };

export const fetchPostById = (postId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/posts/${postId}`); // Fetch from the correct endpoint
        if (!response.ok) throw response; // Throw an error if the response is not OK

        const post = await response.json(); // Parse the JSON response
        console.log("Fetched Post Details:", post); // Debugging: Log the fetched post

        // Dispatch the action to store the post in Redux
        dispatch(loadPost(post));
        return post; // Optionally return the post for further use
    } catch (err) {
        console.error("Error fetching post details:", err);

        // Attempt to parse the error response
        let errorData;
        try {
            errorData = await err.json();
        } catch (parseError) {
            errorData = { errors: ["Unable to parse error response"] };
        }

        return errorData.errors || ["Error fetching post details"];
    }
};

export const createNewPost = (postData) => async (dispatch) => {
    const response = await csrfFetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });

    if (response.ok) {
        const newPost = await response.json();
        dispatch(createPost(newPost));
        return newPost;
    } else {
        const errorData = await response.json();
        return errorData.errors;
    }
};


export const deletePostById = (postId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/posts/${postId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            dispatch(deletePost(postId)); 
            return true;
        } else {
            const errorData = await response.json();
            return errorData.message;
        }
    } catch (err) {
        console.error('Error deleting post:', err);
    }
};

export const updatePostById = (postId, postData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });

        if (!response.ok) throw response;

        const updatedPost = await response.json();
        dispatch(loadPost(updatedPost)); 
        return updatedPost;
    } catch (err) {
        console.error('Error updating post:', err);
        const errorData = await err.json();
        return errorData.errors || ['Error updating post'];
    }
};

export const createNewComment = (postId, commentData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/posts/${postId}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(commentData),
        });

        if (response.ok) {
            const newComment = await response.json();
            dispatch(fetchPostById(postId));
            return newComment;
        } else {
            const errorData = await response.json();
            return errorData.errors;
        }
    } catch (err) {
        console.error("Error creating comment:", err);
        throw err;
    }
};

const initialState = {
    currentUserPosts: {},
    allPosts: {}
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_POSTS: {
            const newState = { ...state, allPosts: {} };
            action.posts.forEach(post => {
                newState.allPosts[post.id] = post;
            });
            return newState;
        }
                
        case LOAD_ALL_POSTS: {
            const newState = { ...state, allPosts: { ...state.allPosts } };
            action.posts.forEach(post => {
                newState.allPosts[post.id] = post;
            });
            return newState;
        }

        case LOAD_CURRENT_USER_POSTS: {
            const newState = { ...state, currentUserPosts: {} };
            action.posts.forEach((post) => {
                newState.currentUserPosts[post.id] = post;
            });
            return newState;
        }

        case LOAD_POST: {
            const newState = { ...state };
            newState.currentUserPosts = { ...state.currentUserPosts, [action.post.id]: action.post };
            return newState;
        }

        // case CREATE_POST: {
        //     const newState = { ...state.currentUserPosts };
        //     newState[action.post.id] = action.post;
        //     return { ...state, currentUserPosts: newState };
        // }

        case CREATE_POST: {
            const newState = { ...state };
            newState.currentUserPosts = { ...state.currentUserPosts, [action.post.id]: action.post };
            return newState;
        }
        
        // case CREATE_COMMENT: {
        //     const newState = { ...state };
        //     const post = newState.currentUserPosts[action.postId];
        //     if (post) {
        //         post.comments = [...post.comments, action.comment];
        //     }
        //     return newState;
        // }

        case CREATE_COMMENT: {
            const newState = { ...state };
            const post = newState.currentUserPosts[action.postId];
            if (post) {
                newState.currentUserPosts[action.postId] = {
                    ...post,
                    comments: [...(post.comments || []), action.comment],
                };
            }
            return newState;
        }

        // case UPDATE_POST: {
        //     const newState = { ...state.currentUserPosts };
        //     newState[action.post.id] = action.post;
        //     return { ...state, currentUserPosts: newState };
        // }

        case UPDATE_POST: {
            const newState = { ...state };
            newState.currentUserPosts = { ...state.currentUserPosts, [action.post.id]: action.post };
            return newState;
        }

        // case DELETE_POST: {
        //     const newState = { ...state.currentUserPosts };
        //     delete newState[action.postId];
        //     return { ...state, currentUserPosts: newState };
        // }

        // case DELETE_POST: {
        //     const newState = { ...state };
        //     newState.currentUserPosts = { ...state.currentUserPosts };
        //     delete newState.currentUserPosts[action.postId];
        //     return newState;
        // }

        case DELETE_POST: {
            const newState = {
                ...state,
                currentUserPosts: { ...state.currentUserPosts },
                allPosts: { ...state.allPosts }
            };
            delete newState.currentUserPosts[action.postId];
            delete newState.allPosts[action.postId];
            return newState;
        }

        // case UPDATE_POST_IMAGES: {
        //     const { postId, images } = action;
        //     const updatedPost = {
        //         ...state[postId],
        //         PostImages: images,
        //     };
        //     return {
        //         ...state,
        //         [postId]: updatedPost,
        //     };
        // }
        default:
            return state;
    }
};




export default postsReducer;




