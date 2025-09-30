#!/bin/bash
echo "Building FRA WebGIS Application..."

# Set Node.js version
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # Load NVM

# Install Node.js 20 if not already installed
if ! command -v nvm &> /dev/null; then
    echo "Installing NVM..."
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi

# Use Node.js 20.x
echo "Using Node.js 20.x..."
nvm install 20
nvm use 20

# Build React frontend
echo "Building React frontend..."
cd vanachitra-prototype

# Clean install and fix vulnerabilities
echo "Installing dependencies..."
npm ci || npm install

echo "Running security audit..."
npm audit fix --force || true

echo "Building application..."
npm run build

# Copy build files to Flask directory
echo "Copying build files..."
cd ..
mkdir -p fradss/react_build
cp -r vanachitra-prototype/build/* fradss/react_build/

echo "Build complete!"
