import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostById, updatePostById } from "../../store/posts"; 
import '../CreatePost/CreatePost.css'; 

function UpdatePost() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const post = useSelector((state) => state.posts?.currentPost); 

    const [formData, setFormData] = useState({
        title: "",
        fan_post: "",
    });

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (!post) {
            dispatch(fetchPostById(id));
        } else {
            setFormData({
                title: post.title || "",
                fan_post: post.fan_post || "",
            });
        }
    }, [dispatch, id, post]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = [];

        if (!formData.title.trim()) {
            newErrors.push("Title is required");
        }

        if (formData.fan_post.trim().length < 30) {
            newErrors.push("Fan post needs a minimum of 30 characters");
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        const postData = {
            title: formData.title.trim(),
            fan_post: formData.fan_post.trim(),
        };

        try {
            await dispatch(updatePostById(id, postData)); // Dispatch the update action
            alert("Post updated successfully");
            navigate(`/posts/${id}`); // Navigate to the post details page
        } catch (err) {
            setErrors(err.errors || [err.message]);
        }
    };

    return (
        <div className="create-post-container">
            <h1>Update your Post</h1>
            <form onSubmit={handleSubmit} className="create-post-form">
                <div className="section">
                    <h2>Update the Title</h2>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter a new title"
                    />
                    {errors.includes("Title is required") && (
                        <p className="error">Title is required</p>
                    )}
                </div>

                <div className="section">
                    <h2>Update the Fan Post</h2>
                    <textarea
                        name="fan_post"
                        value={formData.fan_post}
                        onChange={handleChange}
                        placeholder="Please write at least 30 characters"
                    ></textarea>
                    {errors.includes("Fan post needs a minimum of 30 characters") && (
                        <p className="error">Fan post needs a minimum of 30 characters</p>
                    )}
                </div>

                <button type="submit" className="create-post-button">Update Post</button>
            </form>
        </div>
    );
}

export default UpdatePost;