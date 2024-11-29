import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewPost } from "../../store/posts";
import './CreatePost.css';
import { useNavigate } from "react-router-dom";

function CreatePost() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        fan_post: "",
    });

    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = [];

        // Validate fan_post length
        if (formData.fan_post.trim().length < 30) {
            newErrors.push("Description needs a minimum of 30 characters");
        }

        // Validate title
        if (!formData.title.trim()) {
            newErrors.push("Title is required");
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
            // Dispatch action to create a new post
            await dispatch(createNewPost(postData));

            // Redirect to homepage after successful creation
            navigate("/");
        } catch (err) {
            console.error("Error creating post", err);
            setErrors(err.errors || [err.message]);
        }
    };

    return (
        <div className="main-container">
            <h1>Create a New Post</h1>
            <form onSubmit={handleSubmit} className="create-post-form">
                {errors.length > 0 && (
                    <ul className="errors-list">
                        {errors.map((error, idx) => (
                            <li key={idx} className="error">{error}</li>
                        ))}
                    </ul>
                )}
              
                <div className="section">
                    <h2>Add a Title</h2>
                    <p>Give your post a catchy title that grabs attention!</p>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Post Title"
                    />
                </div>

                <div className="section">
                    <h2>Write Your Fan Post</h2>
                    <p>Share your thoughts, memories, or anything exciting about the team!</p>
                    <textarea
                        name="fan_post"
                        value={formData.fan_post}
                        onChange={handleChange}
                        placeholder="Please write at least 30 characters"
                        rows="6"
                    ></textarea>
                </div>

                <button type="submit" className="btn-primary">Create Post</button>
            </form>
        </div>
    );
}

export default CreatePost;
