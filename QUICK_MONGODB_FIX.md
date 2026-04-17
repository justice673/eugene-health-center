# 🚀 Quick MongoDB Fix

Your backend is trying to connect to local MongoDB, but it's not installed. Here are two solutions:

---

## ✅ Option 1: MongoDB Atlas (Cloud) - FASTEST ⚡

**Takes 5 minutes, no installation needed!**

### Step 1: Create Free Account
1. Go to: **https://www.mongodb.com/cloud/atlas/register**
2. Sign up (free, no credit card needed)

### Step 2: Create Cluster
1. Click **"Build a Database"**
2. Choose **"M0 Free"** (Free forever)
3. Select **AWS** as provider
4. Choose region closest to you
5. Click **"Create"** (takes 3-5 minutes)

### Step 3: Create Database User
1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter:
   - **Username**: `eugene-admin` (or any name)
   - **Password**: Create a strong password (SAVE THIS!)
5. Set privileges to **"Atlas Admin"**
6. Click **"Add User"**

### Step 4: Whitelist IP
1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ For development only! In production, use specific IPs
4. Click **"Confirm"**

### Step 5: Get Connection String
1. Go back to **"Database"** → **"Clusters"**
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update .env File
1. Open `backend/.env`
2. Replace the connection string:
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Add database name: `...mongodb.net/eugene-health-center?retryWrites=true&w=majority`

**Example:**
```env
MONGODB_URI=mongodb+srv://eugene-admin:MyPassword123@cluster0.abc123.mongodb.net/eugene-health-center?retryWrites=true&w=majority
```

### Step 7: Restart Backend
```bash
# The backend should auto-restart, or press Ctrl+C and run:
cd backend
npm run dev
```

You should see: `✅ MongoDB Connected: cluster0.xxxxx.mongodb.net`

---

## ✅ Option 2: Install Local MongoDB

**Takes 10-15 minutes, requires installation**

### Step 1: Install MongoDB
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package list
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org
```

### Step 2: Start MongoDB Service
```bash
# Start MongoDB
sudo systemctl start mongod

# Enable MongoDB to start on boot
sudo systemctl enable mongod

# Check status
sudo systemctl status mongod
```

### Step 3: Verify Installation
```bash
# Test MongoDB connection
mongosh
# If successful, you'll see MongoDB shell
# Type: exit
```

### Step 4: Restart Backend
```bash
cd backend
npm run dev
```

You should see: `✅ MongoDB Connected: localhost`

---

## 🎯 Which Option Should You Choose?

- **MongoDB Atlas**: ✅ Faster setup, no installation, works anywhere
- **Local MongoDB**: ✅ More control, works offline, good for learning

**Recommendation**: Use MongoDB Atlas for now (faster and easier)!

---

## 🐛 Still Having Issues?

### Error: "Authentication failed"
- ✅ Check username and password in connection string
- ✅ Make sure you replaced `<username>` and `<password>` with actual values

### Error: "IP not whitelisted"
- ✅ Go to Network Access in Atlas
- ✅ Add your IP or allow 0.0.0.0/0

### Error: "Connection timeout"
- ✅ Check internet connection
- ✅ Verify MongoDB service is running (for local)
- ✅ Check firewall settings

---

## ✅ Success Indicators

When it works, you'll see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 Server running on port 5000
📡 Environment: development
🌐 Frontend URL: http://localhost:3000
```

Then test with:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status":"OK","message":"Eugene Health Center API is running",...}
```

