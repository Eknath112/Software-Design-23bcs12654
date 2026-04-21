# 🚀 Complete Setup Guide with Google Gemini API

## Why Gemini? (Best for Students!)

✅ **FREE to use** - No credit card required
✅ **Generous free tier** - 60 requests per minute
✅ **Easy to get** - Get API key in 2 minutes
✅ **Powerful AI** - Google's latest AI model
✅ **Perfect for college projects**

---

## 📋 What You'll Need

1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - [Download here](https://www.mongodb.com/try/download/community)
3. **Google Account** - For Gemini API key
4. **Code Editor** - VS Code recommended

---

## Part 1: Get Your FREE Gemini API Key (2 Minutes)

### Step 1: Go to Google AI Studio
Open your browser and visit: **https://makersuite.google.com/app/apikey**

Or go to: **https://aistudio.google.com/**

### Step 2: Sign in with Google
- Click "Sign in" 
- Use any Gmail account (personal or college email)
- Accept terms and conditions

### Step 3: Create API Key
1. Click **"Get API Key"** button
2. Click **"Create API key in new project"**
3. Your API key will be generated instantly!
4. **Copy the key** - It looks like: `AIzaSyC...` (keep it safe!)

### Step 4: Save Your Key
**IMPORTANT:** Keep this key private. Don't share it or commit it to GitHub!

---

## Part 2: Install Prerequisites

### Install Node.js

**Windows:**
1. Download from: https://nodejs.org/
2. Run the installer
3. Follow the wizard (keep default settings)
4. Verify: Open Command Prompt and type:
   ```cmd
   node --version
   npm --version
   ```

**macOS:**
```bash
# Using Homebrew (recommended)
brew install node

# Verify
node --version
npm --version
```

**Linux (Ubuntu/Debian):**
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

### Install MongoDB

**Windows:**
1. Download: https://www.mongodb.com/try/download/community
2. Run installer, choose "Complete" installation
3. Install as a Windows Service
4. MongoDB Compass will also be installed (useful GUI)

**macOS:**
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
# Import MongoDB public GPG key
curl -fsSL https://pgp.mongodb.com/server-6.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor

# Add MongoDB repository
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

---

## Part 3: Project Setup

### Step 1: Extract the Project
```bash
# Extract the ZIP file you downloaded
unzip insta-optimizer.zip

# Navigate to project folder
cd insta-optimizer
```

### Step 2: Setup Backend

```bash
# Go to server folder
cd server

# Install all dependencies (this will take 1-2 minutes)
npm install

# Create .env file from template
cp .env.example .env
```

**For Windows (use Command Prompt or PowerShell):**
```cmd
cd server
npm install
copy .env.example .env
```

### Step 3: Configure Environment Variables

Open the `.env` file in your favorite text editor:

**Option 1: Using VS Code**
```bash
code .env
```

**Option 2: Using Notepad (Windows)**
```cmd
notepad .env
```

**Option 3: Using nano (Linux/Mac)**
```bash
nano .env
```

**Edit the file and add your Gemini API key:**
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/insta-optimizer

# JWT Secret - CHANGE THIS to any random string!
JWT_SECRET=my_super_secret_key_12345_change_this

# Google Gemini API Key - ADD YOUR KEY HERE
GEMINI_API_KEY=AIzaSyC...your_actual_key_here

# Choose AI service
AI_SERVICE=gemini

# File Upload
MAX_FILE_SIZE=10485760
```

**Important Points:**
- Replace `AIzaSyC...` with YOUR actual Gemini API key
- Change `JWT_SECRET` to any random string (e.g., `college_project_2024_secret`)
- Keep `AI_SERVICE=gemini`
- Save the file!

### Step 4: Setup Frontend

Open a **NEW terminal/command prompt window** and:

```bash
# Navigate to client folder
cd client

# Install dependencies (takes 1-2 minutes)
npm install
```

**For Windows:**
```cmd
cd client
npm install
```

---

## Part 4: Start MongoDB

### Windows:
MongoDB should already be running as a service. To verify:
```cmd
# Open Services (Win + R, type "services.msc")
# Look for "MongoDB Server" - it should be "Running"

# Or check with:
mongosh
# If it connects, MongoDB is running!
```

### macOS:
```bash
# Start MongoDB
brew services start mongodb-community

# Verify it's running
brew services list
# MongoDB should show "started"
```

### Linux:
```bash
# Start MongoDB
sudo systemctl start mongod

# Check status
sudo systemctl status mongod

# Enable auto-start on boot
sudo systemctl enable mongod
```

### Troubleshooting MongoDB:
If MongoDB won't start, try:
```bash
# Create data directory
sudo mkdir -p /data/db
sudo chown -R $USER /data/db

# Start manually
mongod
```

---

## Part 5: Run the Application! 🎉

You'll need **TWO terminal windows** open:

### Terminal 1 - Start Backend:
```bash
# Make sure you're in the server folder
cd server

# Start the backend server
npm run dev
```

You should see:
```
🚀 Server is running on port 5000
📊 Environment: development
🔗 API: http://localhost:5000/api
MongoDB Connected: localhost
```

✅ If you see this, backend is working!

### Terminal 2 - Start Frontend:
```bash
# Make sure you're in the client folder
cd client

# Start the React app
npm start
```

The browser will automatically open at: **http://localhost:3000**

✅ You should see the landing page with "InstaOptimizer"!

---

## Part 6: Test the Application

### 1. Register an Account
- Click **"Sign Up"** or **"Get Started Free"**
- Fill in details:
  - Name: Your Name
  - Email: youremail@example.com
  - Password: test123 (minimum 6 characters)
  - Instagram Username: @yourhandle (optional)
  - Niche: Choose your content niche
- Click **"Sign Up"**

### 2. Upload Your First Image
- Click **"Upload"** in the navigation
- Choose an image from your computer
  - Best results with clear, high-quality photos
  - Max size: 10MB
  - Formats: JPG, PNG, GIF, WebP
- Add a description (optional but recommended):
  - Example: "A beautiful sunset at the beach with palm trees"
- Choose caption tone: Engaging, Professional, Casual, etc.
- Click **"Upload & Analyze"**

### 3. Wait for AI Magic ✨
- The AI will analyze your image (takes 5-15 seconds)
- You'll see a loading spinner
- Then you'll be redirected to the results page!

### 4. View Results
You'll see:
- **3 AI-generated captions** in different styles
- **20 recommended hashtags** (categorized by reach)
- **Content analysis** (objects, colors, mood)
- **Suggestions** (posting time, improvements, engagement tips)

### 5. Copy and Use!
- Click **"Copy"** on any caption
- Click **"Copy All Hashtags"**
- Now you can paste them on Instagram!

---

## 🎯 Project Structure

```
insta-optimizer/
│
├── server/                          # Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js       # Login/Register logic
│   │   └── postController.js       # Upload/Analyze logic
│   ├── middleware/
│   │   ├── auth.js                 # JWT authentication
│   │   └── upload.js               # File upload config
│   ├── models/
│   │   ├── User.js                 # User database schema
│   │   └── Post.js                 # Post database schema
│   ├── routes/
│   │   ├── authRoutes.js           # Auth API endpoints
│   │   └── postRoutes.js           # Post API endpoints
│   ├── utils/
│   │   └── aiService.js            # Gemini AI integration ⭐
│   ├── uploads/                    # Uploaded images stored here
│   ├── .env                        # Your configuration (SECRET!)
│   ├── .env.example                # Template for .env
│   ├── package.json                # Backend dependencies
│   └── server.js                   # Main backend file
│
├── client/                          # Frontend (React)
│   ├── public/
│   │   └── index.html              # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js           # Navigation bar
│   │   ├── context/
│   │   │   └── AuthContext.js      # User authentication state
│   │   ├── pages/
│   │   │   ├── Home.js             # Landing page
│   │   │   ├── Login.js            # Login page
│   │   │   ├── Register.js         # Sign up page
│   │   │   ├── Dashboard.js        # User dashboard
│   │   │   ├── Upload.js           # Image upload page ⭐
│   │   │   ├── Posts.js            # All posts list
│   │   │   └── PostDetail.js       # AI analysis results ⭐
│   │   ├── services/
│   │   │   └── api.js              # API calls to backend
│   │   ├── App.js                  # Main React component
│   │   ├── index.js                # React entry point
│   │   └── index.css               # Global styles
│   └── package.json                # Frontend dependencies
│
├── README.md                        # Project documentation
├── SETUP_GUIDE.md                   # Setup instructions
└── API_DOCUMENTATION.md             # API reference
```

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot find module" errors
**Solution:**
```bash
# Delete node_modules and reinstall
cd server
rm -rf node_modules
npm install

cd ../client
rm -rf node_modules
npm install
```

### Issue 2: MongoDB connection error
**Error:** `MongooseServerSelectionError`

**Solution:**
```bash
# Check if MongoDB is running
mongosh

# If not running, start it:
# Windows: Check Services for "MongoDB Server"
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Issue 3: Port 5000 already in use
**Error:** `EADDRINUSE: address already in use :::5000`

**Solution:**
Edit `.env` file and change port:
```env
PORT=5001
```

### Issue 4: Gemini API errors
**Error:** `API key not valid` or `403 Forbidden`

**Solutions:**
1. **Check your API key** in `.env` file
2. **Verify AI_SERVICE** is set to `gemini`
3. **Check Gemini quota**: Visit https://makersuite.google.com/app/apikey
4. **Wait 1 minute** and try again (rate limiting)
5. **Restart backend server** after changing `.env`:
   ```bash
   # Press Ctrl+C to stop
   # Then start again:
   npm run dev
   ```

### Issue 5: Images not uploading
**Solutions:**
1. Check file size (must be under 10MB)
2. Check file format (JPG, PNG, GIF, WebP only)
3. Verify `uploads/` folder exists in `server/` directory
4. Check browser console for errors (F12)

### Issue 6: Frontend won't connect to backend
**Solution:**
1. Make sure backend is running on port 5000
2. Check `proxy` in `client/package.json`:
   ```json
   "proxy": "http://localhost:5000"
   ```
3. Restart both servers

### Issue 7: "npm: command not found"
**Solution:**
Node.js is not installed or not in PATH.
- Reinstall Node.js from https://nodejs.org/
- Restart your terminal/command prompt
- Verify: `node --version`

---

## 📊 Testing Checklist

Before your presentation/demo:

- [ ] Backend starts without errors
- [ ] Frontend opens in browser
- [ ] Can register new account
- [ ] Can login successfully
- [ ] Can upload image
- [ ] AI analysis completes successfully
- [ ] 3 captions are generated
- [ ] Hashtags are displayed
- [ ] Content analysis shows data
- [ ] Suggestions are provided
- [ ] Can copy captions
- [ ] Can view all posts
- [ ] Can delete a post
- [ ] Dashboard shows statistics

---

## 🎓 For Your College Presentation

### What to Show:

1. **Landing Page**
   - Modern UI with gradient background
   - Feature highlights
   - Call-to-action buttons

2. **Registration & Login**
   - Secure authentication with JWT
   - Password hashing (bcrypt)
   - Form validation

3. **Upload Interface**
   - Drag & drop functionality
   - Image preview
   - Description and tone selection

4. **AI Analysis (Main Feature!)**
   - Show the AI processing
   - Display 3 unique captions
   - Show hashtag categorization
   - Demonstrate content analysis
   - Show actionable suggestions

5. **Dashboard**
   - Post statistics
   - Recent posts grid
   - Pro tips section

### Technical Highlights to Mention:

✅ **Full-Stack MERN Application**
- MongoDB: NoSQL database
- Express: Backend framework
- React: Frontend framework
- Node.js: Runtime environment

✅ **AI/ML Integration**
- Google Gemini API (latest AI model)
- Natural language processing
- Image content analysis
- Smart recommendation system

✅ **Modern Features**
- JWT Authentication
- File upload handling
- RESTful API design
- Responsive UI (mobile-friendly)
- Real-time state management (React Context)

✅ **Security**
- Password hashing with bcrypt
- Protected API routes
- File type validation
- File size limits
- Environment variables for secrets

✅ **Best Practices**
- MVC architecture
- Modular code structure
- Error handling
- Input validation
- Clean code with comments

---

## 🚀 Next Steps After Setup

### Customize for Your Needs:

1. **Change Colors/Branding**
   - Edit `client/src/index.css`
   - Update gradient colors
   - Add your logo

2. **Modify AI Prompts**
   - Edit `server/utils/aiService.js`
   - Customize caption generation prompts
   - Adjust hashtag strategy

3. **Add More Features**
   - Analytics dashboard with charts
   - Schedule posts
   - A/B testing for captions
   - Instagram API integration
   - Team collaboration

4. **Deploy to Cloud**
   - Backend: Railway, Render, or Heroku
   - Frontend: Vercel or Netlify
   - Database: MongoDB Atlas (free tier)

---

## 📞 Need Help?

### Common Resources:

- **Gemini API Docs**: https://ai.google.dev/docs
- **Node.js Docs**: https://nodejs.org/docs
- **React Docs**: https://react.dev
- **MongoDB Docs**: https://docs.mongodb.com
- **Express Docs**: https://expressjs.com

### Check These Files:
- `README.md` - Project overview
- `API_DOCUMENTATION.md` - API endpoints reference
- `SETUP_GUIDE.md` - This file!

### Debugging Tips:
1. **Check backend terminal** for server errors
2. **Check frontend terminal** for React errors
3. **Open browser console** (F12) for frontend errors
4. **Check MongoDB** is running
5. **Verify .env file** has correct values
6. **Restart servers** after changing config

---

## 🎉 Congratulations!

You now have a fully functional AI-powered Instagram content optimizer running on your machine!

### What You've Learned:
✅ Full-stack web development
✅ AI API integration
✅ Database management
✅ User authentication
✅ File upload handling
✅ Modern React development
✅ RESTful API design

### Ready for Production?
This project is perfect as-is for your college project. If you want to deploy it online:
1. Sign up for MongoDB Atlas (free)
2. Deploy backend to Railway/Render (free)
3. Deploy frontend to Vercel (free)

---

**Happy Coding! 🚀📸✨**

If something doesn't work, don't panic! 99% of issues are solved by:
1. Restarting the servers
2. Checking the .env file
3. Making sure MongoDB is running
4. Reinstalling node_modules

**You got this! 💪**
