import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService } from '../services/api';
import { toast } from 'react-toastify';
import './Upload.css';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState('');
  const [tone, setTone] = useState('engaging');
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUploadAndAnalyze = async () => {
    if (!file) {
      toast.error('Please select an image');
      return;
    }

    setLoading(true);
    try {
      // Upload image
      const formData = new FormData();
      formData.append('image', file);
      formData.append('description', description);

      const uploadResponse = await postService.uploadPost(formData);
      const postId = uploadResponse.post._id;

      toast.success('Image uploaded successfully!');

      // Analyze with AI
      setAnalyzing(true);
      const analyzeData = {
        imageDescription: description || 'An Instagram post image',
        tone: tone
      };

      await postService.analyzePost(postId, analyzeData);
      toast.success('AI analysis complete!');
      
      // Navigate to post detail page
      navigate(`/posts/${postId}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
      setAnalyzing(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2 className="upload-title">Upload Your Content</h2>
        <p className="upload-subtitle">Let AI optimize your Instagram post</p>

        <div className="upload-area">
          {preview ? (
            <div className="preview-container">
              <img src={preview} alt="Preview" className="preview-image" />
              <button
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                }}
                className="btn-remove"
              >
                ✕ Remove
              </button>
            </div>
          ) : (
            <label className="file-input-label">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
              <div className="upload-placeholder">
                <span className="upload-icon">📁</span>
                <p>Click to upload or drag and drop</p>
                <span className="upload-hint">PNG, JPG, GIF up to 10MB</span>
              </div>
            </label>
          )}
        </div>

        {file && (
          <>
            <div className="input-group">
              <label>Describe Your Image (Optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="E.g., A sunset photo at the beach with palm trees"
                rows="3"
              />
              <span className="input-hint">
                Better descriptions lead to better AI suggestions
              </span>
            </div>

            <div className="input-group">
              <label>Caption Tone</label>
              <select value={tone} onChange={(e) => setTone(e.target.value)}>
                <option value="engaging">Engaging</option>
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="funny">Funny</option>
                <option value="inspirational">Inspirational</option>
              </select>
            </div>

            <button
              onClick={handleUploadAndAnalyze}
              className="btn btn-primary btn-full"
              disabled={loading || analyzing}
            >
              {loading ? 'Uploading...' : analyzing ? 'Analyzing with AI...' : '🚀 Upload & Analyze'}
            </button>

            {analyzing && (
              <div className="analyzing-message">
                <div className="spinner"></div>
                <p>AI is analyzing your content... This may take a few seconds</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Upload;
