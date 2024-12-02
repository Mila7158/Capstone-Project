import { useState, useEffect } from "react";
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

    const [errors, setErrors] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const validateField = (name, value) => {
        let error = "";

        if (name === "title") {
            if (!value.trim()) {
                error = "Title is required";
            } else if (value.trim().length < 4) {
                error = "Title must be at least 4 characters long";
            } else if (value.trim().length > 50) {
                error = "Title cannot exceed 50 characters";
            }
        }

        if (name === "fan_post") {
            if (value.trim().length < 30) {
                error = "Description needs a minimum of 30 characters";
            } else if (value.trim().length > 500) {
                error = "Description cannot exceed 500 characters";
            }
        }

        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update form data with the current input value
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Validate the current input and update error state dynamically
        const error = validateField(name, value);
        setErrors((prevState) => {
            if (!error) {
                // eslint-disable-next-line no-unused-vars
                const { [name]: removedError, ...rest } = prevState;
                return rest; // Return the rest of the errors (excluding the resolved one)
            }
    
            // Otherwise, update the errors object with the current error
            return {
                ...prevState,
                [name]: error,
            };
        });
    };

  
    useEffect(() => {
        const hasErrors = Object.keys(errors).length > 0;
        const isEmpty = !formData.title.trim() || !formData.fan_post.trim();
        setIsButtonDisabled(hasErrors || isEmpty);
    }, [errors, formData]);


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const postData = {
            title: formData.title.trim(),
            fan_post: formData.fan_post.trim(),
        };
    
        try {
            await dispatch(createNewPost(postData));
            navigate("/");
        } catch (err) {
            console.error("Error creating post", err);
        }
    };

    return (
        <div className="main-container">
            <h1>Create a New Post</h1>
            <form onSubmit={handleSubmit} className="create-post-form">
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
                    {errors.title && <p className="error">{errors.title}</p>}
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
                        spellCheck="false"
                    ></textarea>
                    {errors.fan_post && <p className="error">{errors.fan_post}</p>}
                </div>

                <button
                    type="submit"
                    className={
                        errors.title || errors.fan_post
                            ? "disabled-button"
                            : "enabled-button btn-primary"
                    }
                    disabled={errors.title || errors.fan_post}
                >
                    Create Post
                </button>
            </form>
        </div>
    );
}


export default CreatePost;