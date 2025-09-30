#!/bin/bash
echo "Building FRA WebGIS Application..."

# Build React frontend
echo "Building React frontend..."
cd vanachitra-prototype
npm install
npm run build

# Copy build files to Flask directory
echo "Copying build files..."
cd ..
mkdir -p fradss/react_build
cp -r vanachitra-prototype/build/* fradss/react_build/

echo "Build complete!"
