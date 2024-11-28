// import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './store'; // Import the configured store
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
// import { restoreUser } from './store/session';
import Modal from './components/Modal/Modal'; 
import { ModalProvider } from './context/ModalContext'; 

// store.dispatch(restoreUser());

// Attach the store to the window object for debugging
if (import.meta.env.MODE !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
  // window.restoreUser = restoreUser;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
        <App />
        <Modal />
      </Provider>
    </ModalProvider>
  // </React.StrictMode>
);


