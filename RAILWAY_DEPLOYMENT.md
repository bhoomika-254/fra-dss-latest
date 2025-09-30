# 🚀 Railway Deployment Guide for FRA WebGIS

## 📋 Pre-Deployment Setup

### 1. Build Process Overview
The deployment follows this sequence:
```bash
cd vanachitra-prototype
npm install
npm run build
cp -r build/* ../fradss/react_build/
cd ../fradss
python app.py
```

### 2. Files Created for Railway
- `nixpacks.toml` - Nixpacks configuration for build process
- `railway.json` - Railway-specific deployment settings
- `Procfile` - Alternative process definition
- `start.sh` - Build script (if needed)

## 🛠 Railway Deployment Steps

### 1. Connect Repository
1. Go to [railway.app](https://railway.app)
2. Sign up/Login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository: `bhoomika-254/fra-dss-latest`

### 2. Configure Build Settings
Railway will automatically detect the `nixpacks.toml` configuration:

**Build Phase:**
- Installs Node.js 18.x and Python 3.10
- Runs `npm install` in vanachitra-prototype
- Runs `pip install -r requirements.txt` in fradss
- Builds React app with `npm run build`
- Copies build files to `fradss/react_build/`

**Start Command:**
```bash
cd fradss && python app.py
```

### 3. Environment Variables (Optional)
Set these in Railway dashboard if needed:
- `FLASK_ENV=production`
- `PORT` (automatically set by Railway)
- `HOST=0.0.0.0` (automatically set)

### 4. Domain Configuration
- Railway provides a free `.railway.app` subdomain
- Custom domain can be added in project settings

## 📁 Project Structure
```
fra-webgis/
├── vanachitra-prototype/     # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── build/ (generated)
├── fradss/                   # Flask backend
│   ├── app.py
│   ├── requirements.txt
│   ├── react_build/ (copied from build)
│   ├── templates/
│   ├── static/
│   └── output/
├── nixpacks.toml            # Build configuration
├── railway.json             # Railway settings
├── Procfile                 # Process definition
└── start.sh                 # Build script
```

## 🔧 Troubleshooting

### Common Issues:
1. **"Script start.sh not found"** - Fixed with nixpacks.toml
2. **React files not found** - Build process copies to react_build/
3. **Port binding issues** - App now uses Railway's PORT env var
4. **Build timeouts** - Optimized build process in nixpacks.toml

### Build Logs to Check:
- Node.js and Python installation
- npm install success
- React build completion
- File copy operations
- Flask app startup

## 🌐 Access Your Deployed App
Once deployed, your app will be available at:
- Main page: `https://your-app.railway.app/`
- Upload page: `https://your-app.railway.app/upload`
- FRA Claims: `https://your-app.railway.app/fra-claims`
- WebGIS: `https://your-app.railway.app/gee`

## 📊 Expected Deployment Time
- Build Phase: 3-5 minutes
- Deploy Phase: 1-2 minutes
- Total: ~5-7 minutes

## ✅ Verification Steps
1. Check build logs for errors
2. Verify React build files are copied
3. Test all routes work correctly
4. Confirm bilingual functionality
5. Test file upload and claims data

Your FRA WebGIS application should now be successfully deployed on Railway! 🎉
