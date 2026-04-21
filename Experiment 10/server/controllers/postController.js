const Post = require('../models/Post');
const aiService = require('../utils/aiService');
const fs = require('fs').promises;
const path = require('path');

// @desc    Upload image and create post
// @route   POST /api/posts/upload
// @access  Private
const uploadPost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    const { description } = req.body;

    const post = await Post.create({
      user: req.user._id,
      imageUrl: `/uploads/${req.file.filename}`,
      originalFileName: req.file.originalname,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      status: 'draft'
    });

    res.status(201).json({
      message: 'Image uploaded successfully',
      post: {
        _id: post._id,
        imageUrl: post.imageUrl,
        originalFileName: post.originalFileName,
        status: post.status,
        createdAt: post.createdAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Analyze post with AI
// @route   POST /api/posts/:id/analyze
// @access  Private
const analyzePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user owns this post
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { imageDescription, tone } = req.body;
    const userNiche = req.user.niche || 'general';

    // Use provided description or a default one
    const description = imageDescription || 'An Instagram post image';

    // Generate AI content in parallel
    const [captions, hashtags, analysis] = await Promise.all([
      aiService.generateCaptions(description, tone || 'engaging', userNiche),
      aiService.generateHashtags(description, userNiche),
      aiService.analyzeContent(description, userNiche)
    ]);

    // Update post with AI-generated content
    post.aiGeneratedCaptions = captions.map(cap => ({
      caption: cap.text,
      tone: cap.tone,
      generatedAt: new Date()
    }));

    post.aiGeneratedHashtags = hashtags.map(tag => ({
      tag: tag.tag,
      category: tag.category,
      relevance: tag.category === 'high-volume' ? 0.9 : tag.category === 'medium-volume' ? 0.7 : 0.5
    }));

    post.contentAnalysis = {
      detectedObjects: analysis.detectedObjects,
      colors: analysis.colors,
      mood: analysis.mood,
      aiDescription: analysis.description
    };

    post.suggestions = {
      bestPostingTime: analysis.bestPostingTime,
      improvements: analysis.improvements,
      engagementTips: analysis.engagementTips
    };

    post.status = 'analyzed';
    await post.save();

    res.json({
      message: 'Post analyzed successfully',
      post: post
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all user posts
// @route   GET /api/posts
// @access  Private
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json({
      count: posts.length,
      posts: posts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Private
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user owns this post
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user owns this post
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Delete image file
    try {
      const filePath = path.join(__dirname, '..', post.imageUrl);
      await fs.unlink(filePath);
    } catch (err) {
      console.error('Error deleting file:', err);
    }

    await post.deleteOne();

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update post metrics
// @route   PUT /api/posts/:id/metrics
// @access  Private
const updateMetrics = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user owns this post
    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { likes, comments, shares } = req.body;

    post.userMetrics = {
      actualLikes: likes || 0,
      actualComments: comments || 0,
      actualShares: shares || 0,
      postedOn: new Date()
    };

    post.status = 'posted';
    await post.save();

    res.json({
      message: 'Metrics updated successfully',
      post: post
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  uploadPost,
  analyzePost,
  getPosts,
  getPost,
  deletePost,
  updateMetrics
};
