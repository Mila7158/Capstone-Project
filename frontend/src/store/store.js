import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

const rootReducer = {
  // ADD REDUCERS HERE
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    import.meta.env.MODE !== "production"
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware(),
  devTools: import.meta.env.MODE !== "production", // Enables Redux DevTools in development
});

export default store;