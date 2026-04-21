# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Auth Endpoints

### Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "instagramUsername": "@johndoe",
  "niche": "travel"
}
```

**Response:** `201 Created`
```json
{
  "_id": "60d5ec49f1b2c8b1f8c4e5a1",
  "name": "John Doe",
  "email": "john@example.com",
  "instagramUsername": "@johndoe",
  "niche": "travel",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Login User
**POST** `/auth/login`

Authenticate user and get token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:** `200 OK`
```json
{
  "_id": "60d5ec49f1b2c8b1f8c4e5a1",
  "name": "John Doe",
  "email": "john@example.com",
  "instagramUsername": "@johndoe",
  "niche": "travel",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Get User Profile
**GET** `/auth/profile`

Get current user's profile. **Protected**

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "_id": "60d5ec49f1b2c8b1f8c4e5a1",
  "name": "John Doe",
  "email": "john@example.com",
  "instagramUsername": "@johndoe",
  "niche": "travel",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

---

### Update User Profile
**PUT** `/auth/profile`

Update current user's profile. **Protected**

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "John Smith",
  "instagramUsername": "@johnsmith",
  "niche": "fitness",
  "password": "newpassword123"
}
```

**Response:** `200 OK`
```json
{
  "_id": "60d5ec49f1b2c8b1f8c4e5a1",
  "name": "John Smith",
  "email": "john@example.com",
  "instagramUsername": "@johnsmith",
  "niche": "fitness"
}
```

---

## Post Endpoints

### Upload Image
**POST** `/posts/upload`

Upload an image file. **Protected**

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
- `image` (file): Image file (required, max 10MB)
- `description` (string): Image description (optional)

**Response:** `201 Created`
```json
{
  "message": "Image uploaded successfully",
  "post": {
    "_id": "60d5ec49f1b2c8b1f8c4e5a2",
    "imageUrl": "/uploads/image-1234567890-123456789.jpg",
    "originalFileName": "beach-sunset.jpg",
    "status": "draft",
    "createdAt": "2024-01-15T10:35:00.000Z"
  }
}
```

---

### Analyze Post with AI
**POST** `/posts/:id/analyze`

Generate AI captions, hashtags, and analysis for a post. **Protected**

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id`: Post ID

**Request Body:**
```json
{
  "imageDescription": "A beautiful sunset at the beach with palm trees",
  "tone": "engaging"
}
```

**Tone options:** `engaging`, `professional`, `casual`, `funny`, `inspirational`

**Response:** `200 OK`
```json
{
  "message": "Post analyzed successfully",
  "post": {
    "_id": "60d5ec49f1b2c8b1f8c4e5a2",
    "user": "60d5ec49f1b2c8b1f8c4e5a1",
    "imageUrl": "/uploads/image-1234567890-123456789.jpg",
    "originalFileName": "beach-sunset.jpg",
    "status": "analyzed",
    "aiGeneratedCaptions": [
      {
        "caption": "🌅 Golden hour magic at its finest! Who else is dreaming of beach days? 💫",
        "tone": "engaging",
        "generatedAt": "2024-01-15T10:36:00.000Z"
      },
      {
        "caption": "Paradise found 🌴 Living for these sunset moments ✨",
        "tone": "engaging",
        "generatedAt": "2024-01-15T10:36:00.000Z"
      },
      {
        "caption": "When the sky puts on a show 🎨 Nature's canvas never disappoints 🌊",
        "tone": "engaging",
        "generatedAt": "2024-01-15T10:36:00.000Z"
      }
    ],
    "aiGeneratedHashtags": [
      {
        "tag": "sunset",
        "category": "high-volume",
        "relevance": 0.9
      },
      {
        "tag": "beach",
        "category": "high-volume",
        "relevance": 0.9
      },
      {
        "tag": "travel",
        "category": "high-volume",
        "relevance": 0.9
      }
    ],
    "contentAnalysis": {
      "detectedObjects": ["sunset", "beach", "palm trees", "ocean"],
      "colors": ["orange", "blue", "golden"],
      "mood": "peaceful",
      "aiDescription": "A stunning beach sunset with silhouetted palm trees"
    },
    "suggestions": {
      "bestPostingTime": "evening",
      "improvements": [
        "Consider adding a person for scale and relatability",
        "Try capturing during golden hour for warmer tones",
        "Include foreground elements for depth"
      ],
      "engagementTips": [
        "Ask followers about their favorite sunset spots",
        "Share a personal story about this location",
        "Use Instagram Stories to show behind-the-scenes"
      ]
    },
    "createdAt": "2024-01-15T10:35:00.000Z",
    "updatedAt": "2024-01-15T10:36:00.000Z"
  }
}
```

---

### Get All User Posts
**GET** `/posts`

Get all posts for the authenticated user. **Protected**

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "count": 5,
  "posts": [
    {
      "_id": "60d5ec49f1b2c8b1f8c4e5a2",
      "user": "60d5ec49f1b2c8b1f8c4e5a1",
      "imageUrl": "/uploads/image-1234567890-123456789.jpg",
      "originalFileName": "beach-sunset.jpg",
      "status": "analyzed",
      "aiGeneratedCaptions": [...],
      "aiGeneratedHashtags": [...],
      "contentAnalysis": {...},
      "suggestions": {...},
      "createdAt": "2024-01-15T10:35:00.000Z"
    }
  ]
}
```

---

### Get Single Post
**GET** `/posts/:id`

Get details of a specific post. **Protected**

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id`: Post ID

**Response:** `200 OK`
```json
{
  "_id": "60d5ec49f1b2c8b1f8c4e5a2",
  "user": "60d5ec49f1b2c8b1f8c4e5a1",
  "imageUrl": "/uploads/image-1234567890-123456789.jpg",
  "originalFileName": "beach-sunset.jpg",
  "fileSize": 2048576,
  "mimeType": "image/jpeg",
  "status": "analyzed",
  "aiGeneratedCaptions": [...],
  "aiGeneratedHashtags": [...],
  "contentAnalysis": {...},
  "suggestions": {...},
  "createdAt": "2024-01-15T10:35:00.000Z",
  "updatedAt": "2024-01-15T10:36:00.000Z"
}
```

---

### Delete Post
**DELETE** `/posts/:id`

Delete a post and its associated image. **Protected**

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id`: Post ID

**Response:** `200 OK`
```json
{
  "message": "Post deleted successfully"
}
```

---

### Update Post Metrics
**PUT** `/posts/:id/metrics`

Update engagement metrics after posting to Instagram. **Protected**

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id`: Post ID

**Request Body:**
```json
{
  "likes": 250,
  "comments": 15,
  "shares": 8
}
```

**Response:** `200 OK`
```json
{
  "message": "Metrics updated successfully",
  "post": {
    "_id": "60d5ec49f1b2c8b1f8c4e5a2",
    "status": "posted",
    "userMetrics": {
      "actualLikes": 250,
      "actualComments": 15,
      "actualShares": 8,
      "postedOn": "2024-01-15T11:00:00.000Z"
    },
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

---

## Error Responses

All endpoints may return these error responses:

### 400 Bad Request
```json
{
  "message": "Invalid input data"
}
```

### 401 Unauthorized
```json
{
  "message": "Not authorized, no token"
}
```

### 403 Forbidden
```json
{
  "message": "Not authorized to access this resource"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server error",
  "error": "Error details..."
}
```

---

## File Upload Specifications

### Supported Image Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)

### File Size Limits
- Maximum: 10MB per file
- Recommended: 2-5MB for optimal processing

### File Naming
- Files are automatically renamed with timestamp
- Format: `image-{timestamp}-{random}.{ext}`

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider:
- 100 requests per 15 minutes per IP
- 50 AI analysis requests per day per user
- Implement using `express-rate-limit`

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123",
    "niche": "travel"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

### Upload Image
```bash
curl -X POST http://localhost:5000/api/posts/upload \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -F "image=@/path/to/image.jpg" \
  -F "description=A beautiful photo"
```

---

## WebSocket Support

Currently not implemented. Future enhancement could include:
- Real-time AI analysis progress
- Live notifications
- Collaborative features
