import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUserPosts } from '../../store/posts';
import { Link, NavLink } from 'react-router-dom';
import './Posts.css';

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => Object.values(state.posts.currentUserPosts));


    useEffect(() => {
        dispatch(fetchCurrentUserPosts());
    }, [dispatch]);



    return (
        <div className='manage-posts main-container'>
            <h2>Manage Posts</h2>
            <NavLink to="/posts/new" className="create-post-button btn-primary">Create New Post</NavLink>

            <div className="posts-container">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className="post-tile">
                            <NavLink to={`/posts/${post.id}`} className="post-title-link">
                                <h3>{post.title}</h3>
                            </NavLink>
                            <div className="post-content-preview">
                                {post?.fan_post}
                            </div>
                            <div className="post-metadata">
                                <p>Created on {new Date(post.createdAt).toLocaleDateString()}</p>
                            </div>
                            <Link className='btn-secondary' to={`/posts/${post.id}`}>Read more</Link>
                        </div>
                    ))
                ) : (
                    <p>No posts found. Create your first post!</p>
                )}

            </div>
        </div>
    );
};

export default Posts;
