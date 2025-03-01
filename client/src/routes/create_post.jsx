import { create_post } from "../api/endpoints";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./create_post.css";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  const [postImage, setPostImage] = useState(null);
  const nav = useNavigate();

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append("description", description);
      if (postImage) {
        formData.append("post_image", postImage);
      }

      await create_post(formData);
      nav("/");
    } catch {
      alert("Error creating post");
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Create Post</h2>

        {/* File Input */}
        <label>Post Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setPostImage(e.target.files[0])}
        />

        {/* Description Input */}
        <label>Description</label>
        <textarea
          placeholder="Write something..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Submit Button */}
        <button className="submit-btn" onClick={handlePost}>
          Create Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;