# Quick Setup Guide

## Step-by-Step Setup for College Project

### Prerequisites Check
```bash
# Check Node.js (should be v14+)
node --version

# Check MongoDB (should be v4.4+)
mongod --version

# Check npm
npm --version
```

### 1. Get AI API Key (Choose ONE)

#### Option A: Anthropic Claude (Recommended - Easier to get started)
1. Visit: https://console.anthropic.com/
2. Sign up with email
3. Click "Get API Keys"
4. Create new key
5. Copy the key (starts with 'sk-ant-')

#### Option B: OpenAI GPT
1. Visit: https://platform.openai.com/
2. Sign up with email
3. Go to "API Keys"
4. Create new secret key
5. Copy the key (starts with 'sk-')

### 2. Setup Backend

```bash
# Navigate to server folder
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your favorite text editor
# For Anthropic Claude:
nano .env
# or
code .env
# or
vim .env

# Add your API key:
ANTHROPIC_API_KEY=your_actual_key_here
AI_SERVICE=anthropic

# OR for OpenAI:
OPENAI_API_KEY=your_actual_key_here
AI_SERVICE=openai
```

### 3. Setup Frontend

```bash
# Open new terminal, navigate to client folder
cd client

# Install dependencies
npm install
```

### 4. Start MongoDB

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Ubuntu/Debian Linux
sudo systemctl start mongod

# Windows (run as Administrator)
net start MongoDB

# Or manually:
mongod --dbpath /path/to/your/data/directory
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

You should see:
```
🚀 Server is running on port 5000
📊 Environment: development
🔗 API: http://localhost:5000/api
MongoDB Connected: localhost
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

Browser will automatically open at `http://localhost:3000`

### 6. Test the Application

1. Register a new account
2. Upload a test image
3. Wait for AI analysis (takes 5-10 seconds)
4. View generated captions and hashtags!

## Common Issues & Solutions

### Issue: MongoDB connection error
**Solution:** 
```bash
# Start MongoDB service
# macOS:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod

# Verify it's running:
mongosh
# Should connect without errors
```

### Issue: "Cannot find module" errors
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### Issue: Port 5000 already in use
**Solution:**
Change PORT in `.env` file:
```env
PORT=5001
```

### Issue: AI API calls failing
**Solution:**
1. Check your API key is correct in `.env`
2. Verify you have API credits
3. Check `AI_SERVICE` matches your key type
4. Restart the backend server after changing `.env`

### Issue: Images not showing
**Solution:**
1. Check `uploads/` folder exists in server directory
2. Verify file was uploaded successfully
3. Check browser console for errors

## Testing Checklist

- [ ] Backend starts without errors
- [ ] Frontend opens in browser
- [ ] Can register new account
- [ ] Can login with created account
- [ ] Can upload image
- [ ] AI analysis completes
- [ ] Captions are generated
- [ ] Hashtags are generated
- [ ] Can view post details
- [ ] Can delete posts
- [ ] Dashboard shows stats

## For Presentation/Demo

### Sample Test Data
Create a test account:
- **Name:** John Doe
- **Email:** john@example.com
- **Password:** test123
- **Niche:** Travel

### Good Test Images
Use images that are:
- Clear and well-lit
- Have recognizable subjects
- Professional quality
- Relevant to your chosen niche

### Demo Flow
1. Show landing page and features
2. Register new account
3. Upload an image with description
4. Show AI analysis process
5. Display generated captions (try copying one)
6. Show hashtags organized by volume
7. Display content analysis
8. Show suggestions
9. Navigate to dashboard
10. Show all posts view

## Project Highlights for Presentation

**Technical Skills Demonstrated:**
- Full-stack development (MERN)
- RESTful API design
- User authentication (JWT)
- File upload handling
- AI/ML integration
- Database design (MongoDB)
- React state management
- Responsive UI design
- Security best practices

**Business Value:**
- Solves real problem for Instagram creators
- Saves time in content creation
- Improves engagement potential
- Scalable architecture
- Modern tech stack

## Development Tips

1. Keep both terminals open while developing
2. Backend changes require restart (`Ctrl+C` then `npm run dev`)
3. Frontend has hot reload (changes appear automatically)
4. Check browser console for frontend errors
5. Check terminal for backend errors
6. Use MongoDB Compass for database visualization

## Next Steps After Basic Setup

1. Customize the UI colors/styling
2. Add your own branding
3. Modify AI prompts for better results
4. Add more features (see README)
5. Deploy to cloud (Heroku, Vercel, Railway)

---

**Need Help?** Check the main README.md for detailed documentation!
