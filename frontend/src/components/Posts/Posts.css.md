* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.homepage {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.posts-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 0;
}

.post-tile {
    border: 1px solid #000;
    border-radius: 12px;
    padding: 20px;
    background-color: #aec0d6;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin: 0;
}

.post-title {
    font-size: 22px;
    font-weight: bold;
    color: #333;
    margin: 0;
    align-self: flex-start;
}

.post-preview-container {
    border: 1px solid #000;
    padding: 15px;
    border-radius: 4px;
    margin: 0;
}

.fan-post-preview {
    color: #666;
    font-size: 16px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
    max-width: 100%;
    margin: 0;
}

.read-more-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}

.read-more-btn {
    text-decoration: none;
    color: #000;
    border: 1px solid #000;
    padding: 5px 10px;
    font-weight: bold;
    text-align: center;
    margin: 0;
}

.post-metadata {
    display: flex;
    justify-content: flex-start;
    font-size: 14px;
    color: #333;
    gap: 20px;
    margin: 0;
    padding: 0;
}

.post-actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.btn-primary, .btn-secondary {
    padding: 5px 10px;
    text-decoration: none;
    color: #000;
    border: 1px solid #000;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-primary:hover, .btn-secondary:hover {
    background-color: #f0f0f0;
}

.btn-primary {
    background-color: #ff5a5f;
    color: #fff;
}

.btn-secondary {
    background-color: #ccc;
}

.post-image-container {
    margin-bottom: 20px; /* Add space between the image and the content below */
    text-align: center; /* Center the image within the container */
    display: flex; /* Flexbox for alignment */
    justify-content: center; /* Center horizontally */
}

.post-image {
    width: 100%; /* Ensure the image adjusts to the container width */
    height: auto; /* Maintain aspect ratio */
    max-width: 600px; /* Optional: Limit the maximum width of the image */
    object-fit: contain; /* Prevent distortion */
    border-radius: 8px; /* Add rounded corners */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
}