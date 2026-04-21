# InstaOptimizer - AI-Powered Instagram Content Optimizer

A full-stack MERN application that uses AI to help Instagram creators optimize their content by generating captions, hashtags, and providing content improvement suggestions.

## 🌟 Features

- **AI Caption Generation**: Generate multiple engaging captions in different tones
- **Smart Hashtag Research**: Get optimized hashtags categorized by reach (high, medium, low volume)
- **Content Analysis**: AI analyzes images for objects, colors, mood, and provides descriptions
- **Improvement Suggestions**: Get tips on how to improve your content
- **Engagement Optimization**: Best posting times and engagement tips
- **User Dashboard**: Track all your posts and their performance
- **Secure Authentication**: JWT-based auth with password hashing

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** - Server and API
- **MongoDB** with **Mongoose** - Database
- **JWT** - Authentication
- **Multer** - File uploads
- **Bcrypt** - Password hashing
- **Axios** - HTTP client for AI API calls

### Frontend
- **React** - UI framework
- **React Router** - Navigation
- **Axios** - API communication
- **React Toastify** - Notifications
- **CSS3** - Modern styling with gradients

### AI Integration
- **Google Gemini** (Recommended - FREE for students!)
- **OpenAI GPT-4** 
- **Anthropic Claude**

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- An API key from **Google Gemini (FREE)**, OpenAI, or Anthropic

**👉 We recommend Google Gemini API - it's completely FREE for students!**
Get your key at: https://makersuite.google.com/app/apikey

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd insta-optimizer
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/insta-optimizer
JWT_SECRET=your_super_secret_jwt_key_here

# Choose ONE AI service:
# For Google Gemini (FREE - Recommended):
GEMINI_API_KEY=your_gemini_api_key_here
AI_SERVICE=gemini

# OR for Anthropic Claude:
# ANTHROPIC_API_KEY=your_anthropic_api_key_here
# AI_SERVICE=anthropic

# OR for OpenAI:
# OPENAI_API_KEY=your_openai_api_key_here
# AI_SERVICE=openai

MAX_FILE_SIZE=10485760
```

### 3. Setup Frontend

```bash
cd ../client
npm install
```

### 4. Start MongoDB

Make sure MongoDB is running:
```bash
# On macOS with Homebrew:
brew services start mongodb-community

# On Ubuntu/Linux:
sudo systemctl start mongod

# On Windows:
net start MongoDB
```

### 5. Run the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm start
```

The application will open at `http://localhost:3000`

## 🔑 Getting AI API Keys

### Option 1: Google Gemini (FREE - Recommended for Students!)
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API key in new project"
4. Copy the API key (starts with AIzaSy...)
5. **No credit card required!**

**Why Gemini?**
- ✅ Completely FREE
- ✅ Generous free tier (60 requests/min)
- ✅ Easy to get (2 minutes)
- ✅ Powerful AI (Google's latest model)

### Option 2: Anthropic Claude
1. Go to https://console.anthropic.com/
2. Sign up for an account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key to your `.env` file

### Option 3: OpenAI
1. Go to https://platform.openai.com/
2. Sign up for an account
3. Navigate to API Keys
4. Create a new API key
5. Copy the key to your `.env` file

**For detailed setup instructions, see GEMINI_SETUP_GUIDE.md**

## 📱 How to Use

### 1. Register an Account
- Go to `/register`
- Fill in your details (name, email, password)
- Optionally add your Instagram username and niche
- Click "Sign Up"

### 2. Upload an Image
- Navigate to "Upload" in the navbar
- Select an image from your computer (max 10MB)
- Add a description of your image (optional but recommended)
- Choose a caption tone (engaging, professional, casual, funny, inspirational)
- Click "Upload & Analyze"

### 3. View AI Analysis
- After uploading, you'll be redirected to the post detail page
- View AI-generated captions (3 variations)
- See recommended hashtags (categorized by volume)
- Review content analysis (objects, colors, mood)
- Get improvement suggestions and engagement tips
- Copy captions and hashtags with one click

### 4. Manage Your Posts
- View all your posts in the "My Posts" section
- Click on any post to see full details
- Delete posts you no longer need

## 🏗️ Project Structure

```
insta-optimizer/
├── server/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic
│   │   └── postController.js     # Post logic
│   ├── middleware/
│   │   ├── auth.js               # JWT authentication
│   │   └── upload.js             # File upload config
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Post.js               # Post schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── postRoutes.js         # Post endpoints
│   ├── utils/
│   │   └── aiService.js          # AI integration
│   ├── uploads/                  # Uploaded images
│   ├── .env.example              # Environment template
│   ├── package.json
│   └── server.js                 # Entry point
│
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── Navbar.css
│   │   ├── context/
│   │   │   └── AuthContext.js    # Auth state management
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Upload.js
│   │   │   ├── Posts.js
│   │   │   └── PostDetail.js
│   │   ├── services/
│   │   │   └── api.js            # API calls
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Posts
- `POST /api/posts/upload` - Upload image (protected)
- `POST /api/posts/:id/analyze` - Analyze post with AI (protected)
- `GET /api/posts` - Get all user posts (protected)
- `GET /api/posts/:id` - Get single post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)
- `PUT /api/posts/:id/metrics` - Update post metrics (protected)

## 🎨 Features in Detail

### AI Caption Generation
The system generates 3 unique captions in your chosen tone:
- **Engaging**: Fun and interactive
- **Professional**: Business-focused
- **Casual**: Friendly and relaxed
- **Funny**: Humorous and entertaining
- **Inspirational**: Motivating and uplifting

### Hashtag Strategy
Hashtags are categorized for optimal reach:
- **High-volume** (500k+ posts): Maximum exposure
- **Medium-volume** (50k-500k posts): Balanced reach
- **Low-volume** (<50k posts): Niche targeting

### Content Analysis
AI analyzes your image for:
- Detected objects and subjects
- Dominant colors
- Overall mood/vibe
- Engaging description

### Suggestions
Get actionable advice on:
- Best posting times
- Content improvements
- Engagement tips

## 🔒 Security Features

- Passwords hashed with bcrypt
- JWT tokens for authentication
- Protected routes on backend
- File type validation
- File size limits
- MongoDB injection protection

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify `.env` file exists and has correct values
- Make sure port 5000 is available

### Frontend won't connect to backend
- Verify backend is running on port 5000
- Check proxy setting in `client/package.json`

### AI analysis failing
- Verify your API key is correct in `.env`
- Check if you have API credits remaining
- Make sure `AI_SERVICE` matches your API key type

### Image upload failing
- Check file size (max 10MB)
- Verify file type is supported (jpg, jpeg, png, gif, webp)
- Ensure `uploads/` directory exists in server folder

## 📝 Future Enhancements

- Instagram API integration for automatic posting
- Analytics dashboard with charts
- A/B testing for captions
- Scheduling posts
- Team collaboration features
- Mobile app version
- Support for video content

## 🎓 For College Projects

This project demonstrates:
- Full-stack development (MERN)
- RESTful API design
- Authentication & authorization
- File upload handling
- AI/ML integration
- Modern UI/UX design
- State management
- Database design
- Security best practices

## 📄 License

MIT License - feel free to use this project for learning and college assignments.

## 🤝 Contributing

This is a college project, but suggestions and improvements are welcome!

## 📧 Support

For issues or questions, please create an issue in the repository.

---

**Happy Optimizing! 🚀📸✨**
