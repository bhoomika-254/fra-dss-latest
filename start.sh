#!/bin/bash

# FRA WebGIS Deployment Script for Railway
echo "🚀 Starting FRA WebGIS deployment..."

# Step 1: Install Node.js dependencies and build React app
echo "📦 Installing Node.js dependencies..."
cd vanachitra-prototype
npm install

echo "🔨 Building React application..."
npm run build

# Step 2: Copy React build to Flask static directory
echo "📁 Copying React build files to Flask directory..."
if [ -d "build" ]; then
    # Create react_build directory if it doesn't exist
    mkdir -p ../fradss/react_build
    
    # Copy all build files
    cp -r build/* ../fradss/react_build/
    echo "✅ React build files copied successfully"
else
    echo "❌ React build directory not found!"
    exit 1
fi

# Step 3: Navigate to Flask directory and install Python dependencies
echo "🐍 Installing Python dependencies..."
cd ../fradss
pip install -r requirements.txt

# Step 4: Start Flask application
echo "🌐 Starting Flask server..."
python app.py
