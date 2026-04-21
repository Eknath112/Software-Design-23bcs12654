# ⚡ Quick Start Reference Card

## 🔑 Get Gemini API Key (2 min)
1. Visit: https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API key in new project"
4. Copy your key (starts with AIzaSy...)

## 📥 Setup Project (5 min)

```bash
# 1. Extract and enter project
unzip insta-optimizer.zip
cd insta-optimizer

# 2. Setup Backend
cd server
npm install
cp .env.example .env
# Edit .env and add your Gemini API key

# 3. Setup Frontend (new terminal)
cd ../client
npm install
```

## ⚙️ Edit .env File

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/insta-optimizer
JWT_SECRET=your_random_secret_here
GEMINI_API_KEY=AIzaSy...your_key_here
AI_SERVICE=gemini
MAX_FILE_SIZE=10485760
```

## 🚀 Run Application

### Terminal 1 - Backend:
```bash
cd server
npm run dev
```

### Terminal 2 - Frontend:
```bash
cd client
npm start
```

### Terminal 3 - MongoDB:
```bash
# Windows: Already running as service
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

## 🌐 Access Application
**Open:** http://localhost:3000

## ✅ Test Flow
1. Register account
2. Upload image
3. Add description
4. Choose tone
5. Click "Upload & Analyze"
6. View AI results!

## 🐛 Quick Fixes

**Port in use?** 
Change PORT in .env to 5001

**MongoDB error?**
```bash
mongosh  # Test connection
```

**Module not found?**
```bash
rm -rf node_modules
npm install
```

**AI not working?**
- Check API key in .env
- Verify AI_SERVICE=gemini
- Restart backend (Ctrl+C then npm run dev)

## 📁 Important Files

- `server/.env` - Configuration (YOUR API KEY!)
- `server/utils/aiService.js` - AI integration
- `client/src/pages/Upload.js` - Upload page
- `client/src/pages/PostDetail.js` - Results page

## 🎓 For Presentation

**Show these features:**
- AI caption generation (3 styles)
- Hashtag recommendations (20 tags)
- Content analysis
- Dashboard statistics
- Upload interface

**Mention these tech skills:**
- MERN Stack (MongoDB, Express, React, Node.js)
- Google Gemini AI integration
- JWT authentication
- File upload handling
- RESTful API design

## 📞 Help

Stuck? Check:
1. GEMINI_SETUP_GUIDE.md (detailed guide)
2. README.md (project overview)
3. API_DOCUMENTATION.md (API reference)

## 🔗 Useful Links

- Gemini API: https://makersuite.google.com/app/apikey
- Gemini Docs: https://ai.google.dev/docs
- Node.js: https://nodejs.org/
- MongoDB: https://www.mongodb.com/

---

**That's it! Simple, free, and powerful! 🚀**
