const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  originalFileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  aiGeneratedCaptions: [{
    caption: String,
    tone: {
      type: String,
      enum: ['professional', 'casual', 'funny', 'inspirational', 'engaging']
    },
    generatedAt: {
      type: Date,
      default: Date.now
    }
  }],
  aiGeneratedHashtags: [{
    tag: String,
    category: String,
    relevance: Number
  }],
  contentAnalysis: {
    detectedObjects: [String],
    colors: [String],
    mood: String,
    aiDescription: String
  },
  suggestions: {
    bestPostingTime: String,
    improvements: [String],
    engagementTips: [String]
  },
  userMetrics: {
    actualLikes: Number,
    actualComments: Number,
    actualShares: Number,
    postedOn: Date
  },
  status: {
    type: String,
    enum: ['draft', 'analyzed', 'posted'],
    default: 'draft'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
postSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Post', postSchema);
