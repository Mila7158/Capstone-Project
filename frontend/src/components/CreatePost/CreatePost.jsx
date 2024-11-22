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
        let newErrors = [];
        
        if (formData.fan_post.length < 30) {
            newErrors.push("Description needs a minimum of 30 characters");
        }
        
        if (!formData.title) newErrors.push("Title is required");
       
        
        // const validImageRegex = /\.(png|jpg|jpeg)$/i;
        // if (!formData.previewImageUrl || !validImageRegex.test(formData.previewImageUrl)) {
        //     newErrors.push("Preview image is required and must end in .png, .jpg, or .jpeg");
        // }

        
        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        const postData = {            
            title: formData.title.trim(),
            fan_post: formData.fan_post.trim(),           
        };

        try {
            await dispatch(createNewPost(postData));

            
            // const imageData = [
            //     { url: formData.previewImageUrl, preview: true },              
            // ];

            // for (const img of imageData) {
            //     if (img.url && validImageRegex.test(img.url)) {
            //         await dispatch(createPostImage({ postId: post.id, ...img }));
            //     }
            // }

            navigate("/")

            // console.log("Post and images created successfully");
        } catch (err) {
            console.error("Error creating post", err);
            setErrors(err.errors || [err.message]);
        }
    };

    return (
        <div className="create-post-container">
            <h1>Create a new Post</h1>
            <form onSubmit={handleSubmit} className="create-post-form">    

            <div className="section">
                    <h2>Write Your Fan Post</h2>
                    <p>Share your thoughts, memories, or anything exciting about the team!</p>
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
                    {errors.includes("Title is required") && <p className="error">Title is required</p>}
                </div>

                <button type="submit" className="create-post-button">Create Post</button>
            </form>
        </div>
    );
}

export default CreatePost;
