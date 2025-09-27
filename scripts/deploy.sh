#!/bin/bash

# Deployment script for Swetaranyam Sisters Website
echo "🚀 Deploying Swetaranyam Sisters Website..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run type checking
echo "🔍 Running type checks..."
npm run check

# Run linting
echo "🧹 Running linter..."
npm run lint

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🌐 Ready for deployment to Vercel"
    echo ""
    echo "To deploy:"
    echo "1. Push to GitHub repository"
    echo "2. Connect repository to Vercel"
    echo "3. Deploy automatically or use 'vercel --prod'"
else
    echo "❌ Build failed. Please fix errors before deploying."
    exit 1
fi
