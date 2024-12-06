import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import Homepage from './components/Homepage/Homepage.jsx';
import CreatePost from './components/CreatePost/CreatePost';
import PostDetails from './components/PostDetails/PostDetails';
import MyPosts from './components/MyPosts/MyPosts';
import UpdatePost from './components/UpdatePost/UpdatePost';
import ManageComments from './components/ManageComments/ManageComments.jsx';
import Footer from './components/Footer/Footer.jsx';
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
    <div className="layout-container">
      <Navigation isLoaded={isLoaded} />
      <main className="content-container">
        {isLoaded && <Outlet />}
      </main>
      <Footer />
    </div>
  );

  // return (
  //   <>
  //     <Navigation isLoaded={isLoaded} />
  //     {isLoaded && <Outlet />}
  //     <Footer/>
  //   </>
  // );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Homepage/>
      },
      // {
      //   path: '/posts',
      //   element: <Posts/>
      // },
      {
        path: '/posts/current',
        element: <MyPosts/>
      },
      {
        path: '/posts/new',
        element: <CreatePost/>
      },
      {
        path: '/posts/:postId',
        element: <PostDetails/>
      },
      {
        path: '/posts/:postId/edit',
        element: <UpdatePost/>
      },
      {
        path: '/comments/current',
        element: <ManageComments/>
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

