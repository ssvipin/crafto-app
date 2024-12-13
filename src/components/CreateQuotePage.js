import React, { useState } from "react";
import { uploadImage, createQuote } from "../utils/utils.app";
import "./Styles/CreateQuotePage.css";
import profile from "../Assets/profile.png";
import mediaIcon from "../Assets/multimedia.png"; // Import your media icon

const CreateQuotePage = ({ onPostCreated }) => {
  const [isExpanded, setIsExpanded] = useState(false); // For mobile view
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // Image preview URL
  const [uploading, setUploading] = useState(false);
  const token = localStorage.getItem("token");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Generate preview URL
    }
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async () => {
    try {
      setUploading(true);
      const uploadResponse = await uploadImage(file);
      const mediaUrl = uploadResponse.data[0].url;
      await createQuote(token, text, mediaUrl);
      setUploading(false);
      setText("");
      setFile(null);
      setPreview(null);
      onPostCreated();
      setIsExpanded(false); // Collapse in mobile view
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  return (
    <div className={`create-quote-page ${isExpanded ? "expanded" : ""}`}>
      {/* Initial Input Box */}
      <div
        className="start-post-wrapper"
        onClick={() => setIsExpanded(true)}
      >
        <img className="avatar" src={profile} alt="User Avatar" />
        <input
          type="text"
          className="start-post-input"
          placeholder="Start a post..."
          readOnly
        />
      </div>

      {/* Post Creation Section */}
      {isExpanded && (
        <div className="post-creation-content">
          <textarea
            placeholder="What's on your mind?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Custom File Upload Button */}
          <div className="image-upload-section">
            {preview ? (
              <div className="image-preview-container">
                <img src={preview} alt="Preview" className="image-preview" />
                <img
                  src={mediaIcon}
                  alt="Remove"
                  className="remove-icon"
                  onClick={removeImage}
                />
              </div>
            ) : (
              <div className="custom-file-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden-file-input"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="media-upload-button">
                  <img src={mediaIcon} alt="Media" className="media-icon" />
                  Media
                </label>
              </div>
            )}
          </div>

          <div className="post-actions">
            <button
              className="cancel-button"
              onClick={() => setIsExpanded(false)}
            >
              Cancel
            </button>
            <button
              className="submit-button"
              onClick={handleSubmit}
              disabled={uploading || !text.trim()}
            >
              {uploading ? "Uploading..." : "Post"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateQuotePage;
