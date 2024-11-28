import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostById, updatePostById } from "../../store/posts";

function UpdatePost() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const post = useSelector((state) => state.posts?.currentUserPosts[id]);
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

        if (!formData.title.trim()) newErrors.push("Title is required.");
        if (formData.fan_post.trim().length < 30) {
            newErrors.push("Fan post must be at least 30 characters long.");
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
            await dispatch(updatePostById(id, postData));
            alert("Post updated successfully!");
            navigate(`/posts/${id}`); // Navigate to the updated post's details page
        } catch (err) {
            setErrors(err.errors || [err.message]);
        }
    };

    return (
        <div className="create-post-container">
            <h1>Update Your Post</h1>
            <form onSubmit={handleSubmit} className="update-post-form">
                {errors.length > 0 && (
                    <ul className="error-list">
                        {errors.map((error, idx) => (
                            <li key={idx} className="error">{error}</li>
                        ))}
                    </ul>
                )}

                <div className="section">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter the post title"
                    />
                </div>

                <div className="section">
                    <label>Fan Post</label>
                    <textarea
                        name="fan_post"
                        value={formData.fan_post}
                        onChange={handleChange}
                        placeholder="Write your post content (at least 30 characters)"
                        rows="6"
                    ></textarea>
                </div>

                <button type="submit" className="update-post-button">Update Post</button>
            </form>
        </div>
    );
}

export default UpdatePost;
