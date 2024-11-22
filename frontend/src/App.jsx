import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import Homepage from './components/Homepage/Homepage.jsx';
import CreatePost from './components/CreatePost/CreatePost';
import PostDetails from './components/PostDetails/PostDetails';
import Posts from './components/Posts/Posts';
import UpdatePost from './components/UpdatePost/UpdatePost';
// import ManageReviews from './components/ManageReviews/ManageReviews';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);
  

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Homepage/>
      },
      {
        path: '/posts',
        element: <Posts/>
      },
      {
        path: '/posts/new',
        element: <CreatePost/>
      },
      {
        path: '/posts/:id',
        element: <PostDetails/>
      },
      {
        path: '/posts/:id/edit',
        element: <UpdatePost/>
      },
      // {
      //   path: '/reviews/current',
      //   element: <ManageReviews/>
      // },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

