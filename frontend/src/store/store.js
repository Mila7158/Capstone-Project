import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import sessionReducer from './session';
import { combineReducers } from 'redux';
import postsReducer from './posts';
import commentsReducer from './comments';

const rootReducer = combineReducers({
    session: sessionReducer,
    posts: postsReducer,
    comments: commentsReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    import.meta.env.MODE !== "production"
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware(),
  devTools: import.meta.env.MODE !== "production", // Enables Redux DevTools in development
});




export default store;