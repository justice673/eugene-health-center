# 🗄️ MongoDB Setup Guide for Eugene Health Center

This guide will help you set up MongoDB for your backend, whether you choose **MongoDB Atlas (Cloud)** or **Local MongoDB**.

---

## 🚀 Quick Start (Choose One Option)

### Option 1: MongoDB Atlas (Cloud) - **RECOMMENDED** ⭐

MongoDB Atlas is free and doesn't require local installation. Perfect for development!

#### Step 1: Create MongoDB Atlas Account
1. Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Try Free"** or **"Sign Up"**
3. Create a free account (no credit card required for free tier)

#### Step 2: Create a Cluster
1. After logging in, click **"Build a Database"**
2. Choose **"M0 Free"** tier (Free forever)
3. Select a cloud provider (AWS recommended)
4. Choose a region closest to you
5. Click **"Create"** (takes 3-5 minutes)

#### Step 3: Create Database User
1. Go to **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter username and password (save these!)
5. Set user privileges to **"Atlas Admin"** or **"Read and write to any database"**
6. Click **"Add User"**

#### Step 4: Whitelist Your IP Address
1. Go to **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ For production, use specific IPs only
4. Click **"Confirm"**

#### Step 5: Get Connection String
1. Go back to **"Database"** (Clusters)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<username>` and `<password>` with your database user credentials
6. Add your database name at the end: `...mongodb.net/eugene-health-center?retryWrites=true&w=majority`

#### Step 6: Add to .env File
Create `.env` file in `backend/` directory:
```env
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/eugene-health-center?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

---

### Option 2: Local MongoDB Installation

#### Step 1: Install MongoDB

**On Ubuntu/Debian:**
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package list
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod
```

**On macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**On Windows:**
1. Download MongoDB from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Run the installer
3. MongoDB will start automatically as a service

#### Step 2: Verify MongoDB is Running
```bash
# Check MongoDB status
sudo systemctl status mongod  # Linux
# or
brew services list  # macOS
```

#### Step 3: Create .env File
Create `.env` file in `backend/` directory:
```env
MONGODB_URI=mongodb://localhost:27017/eugene-health-center
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

---

## 📝 Complete Setup Steps

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Create .env File
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Then edit `.env` and add your MongoDB connection string.

### 3. Generate JWT Secret (Optional but Recommended)
```bash
# Generate a random secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it as `JWT_SECRET` in your `.env` file.

### 4. Start the Backend Server
```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 Server running on port 5000
📡 Environment: development
🌐 Frontend URL: http://localhost:3000
```

---

## ✅ Verify Connection

### Test 1: Health Check
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Eugene Health Center API is running",
  "timestamp": "2025-11-26T..."
}
```

### Test 2: Create a Test User
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "password": "TestPass123"
  }'
```

If successful, you'll get a response with a token and user data.

---

## 🔧 Troubleshooting

### "Cannot connect to MongoDB"
- **Atlas**: Check your connection string, username, password, and IP whitelist
- **Local**: Ensure MongoDB service is running (`sudo systemctl status mongod`)

### "Authentication failed"
- Verify username and password in connection string
- Check database user permissions in Atlas

### "Connection timeout"
- Check your internet connection (for Atlas)
- Verify MongoDB service is running (for local)
- Check firewall settings

### "Port 5000 already in use"
- Change `PORT` in `.env` to another port (e.g., 5001)
- Or kill the process: `lsof -ti:5000 | xargs kill`

---

## 🎯 Next Steps

1. ✅ MongoDB is connected
2. ✅ Backend server is running
3. 🔄 Test API endpoints
4. 🔄 Connect frontend to backend
5. 🔄 Start developing!

---

## 📚 Useful MongoDB Commands (Local Only)

```bash
# Connect to MongoDB shell
mongosh

# Show databases
show dbs

# Use your database
use eugene-health-center

# Show collections
show collections

# View users
db.users.find().pretty()

# View appointments
db.appointments.find().pretty()
```

---

## 🎉 You're All Set!

Your backend is now connected to MongoDB and ready to use! 🚀

