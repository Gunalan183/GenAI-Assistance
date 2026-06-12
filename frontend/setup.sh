#!/bin/bash

# Frontend Setup Script for LinkedIn AI Outreach

echo "🚀 Setting up LinkedIn AI Outreach Frontend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your configuration."
else
    echo "✅ .env file already exists"
fi

echo ""
echo "✅ Frontend setup completed successfully!"
echo ""
echo "📝 Next steps:"
echo "   1. Update your .env file with the correct API URL"
echo "   2. Run 'npm run dev' to start the development server"
echo "   3. Open http://localhost:5173 in your browser"
echo ""
echo "🎉 Happy coding!"
