const express = require('express');
const router = express.Router();
const {
  uploadPost,
  analyzePost,
  getPosts,
  getPost,
  deletePost,
  updateMetrics
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// All routes are protected (require authentication)
router.post('/upload', protect, upload.single('image'), uploadPost);
router.post('/:id/analyze', protect, analyzePost);
router.get('/', protect, getPosts);
router.get('/:id', protect, getPost);
router.delete('/:id', protect, deletePost);
router.put('/:id/metrics', protect, updateMetrics);

module.exports = router;
