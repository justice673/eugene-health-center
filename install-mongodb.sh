#!/bin/bash

# MongoDB Installation Script for Ubuntu/Debian
# Run this script with: bash install-mongodb.sh

echo "🚀 Installing MongoDB..."

# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package list
echo "📦 Updating package list..."
sudo apt-get update

# Install MongoDB
echo "⬇️ Installing MongoDB (this may take a few minutes)..."
sudo apt-get install -y mongodb-org

# Start MongoDB service
echo "▶️ Starting MongoDB service..."
sudo systemctl start mongod

# Enable MongoDB to start on boot
sudo systemctl enable mongod

# Check MongoDB status
echo "✅ Checking MongoDB status..."
sudo systemctl status mongod --no-pager | head -10

echo ""
echo "🎉 MongoDB installation complete!"
echo ""
echo "Your backend should now be able to connect."
echo "The backend will auto-restart with nodemon."
echo ""
echo "To verify MongoDB is running:"
echo "  sudo systemctl status mongod"
echo ""
echo "To test MongoDB connection:"
echo "  mongosh"

