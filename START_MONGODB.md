# 🚀 Quick Fix: Start MongoDB

Your backend is trying to connect to MongoDB but it's not running. Here are two solutions:

---

## ✅ Solution 1: Start Local MongoDB (If Installed)

### Check if MongoDB is installed:
```bash
mongod --version
```

### If installed, start it:
```bash
# Start MongoDB service
sudo systemctl start mongod

# Enable it to start on boot
sudo systemctl enable mongod

# Check status
sudo systemctl status mongod
```

**Expected output:**
```
Active: active (running)
```

### Then restart your backend:
```bash
cd backend
npm run dev
```

---

## ✅ Solution 2: Use MongoDB Atlas (Cloud) - RECOMMENDED ⭐

**No installation needed! Works immediately!**

### Step 1: Create Free Account
1. Go to: **https://www.mongodb.com/cloud/atlas/register**
2. Sign up (free, no credit card)

### Step 2: Create Cluster (3-5 minutes)
1. Click **"Build a Database"**
2. Choose **"M0 Free"** tier
3. Select **AWS** provider
4. Choose region closest to you
5. Click **"Create"**

### Step 3: Create Database User
1. Go to **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter:
   - **Username**: `eugene-admin` (or any name)
   - **Password**: Create a strong password (SAVE THIS!)
5. Set privileges to **"Atlas Admin"**
6. Click **"Add User"**

### Step 4: Whitelist IP Address
1. Go to **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - ⚠️ For development only! In production, use specific IPs
4. Click **"Confirm"**

### Step 5: Get Connection String
1. Go to **"Database"** → **"Clusters"**
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update backend/.env
1. Open `backend/.env`
2. Replace `MONGODB_URI` with your Atlas connection string:
   - Replace `<username>` with your database username
   - Replace `<password>` with your database password
   - Add database name: `...mongodb.net/eugene-health-center?retryWrites=true&w=majority`

**Example:**
```env
MONGODB_URI=mongodb+srv://eugene-admin:MyPassword123@cluster0.abc123.mongodb.net/eugene-health-center?retryWrites=true&w=majority
```

### Step 7: Restart Backend
Your backend will auto-restart (nodemon). You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 Server running on port 5000
```

---

## 🔍 Which Solution Should I Use?

- **MongoDB Atlas**: ✅ Faster, no installation, works anywhere
- **Local MongoDB**: ✅ More control, works offline

**Recommendation**: Use MongoDB Atlas for now (faster setup)!

---

## 🐛 Still Having Issues?

### "MongoDB service not found"
→ MongoDB is not installed. Use Solution 2 (MongoDB Atlas).

### "Permission denied" when starting MongoDB
→ Make sure you're using `sudo`:
```bash
sudo systemctl start mongod
```

### "Connection timeout" with Atlas
→ Check:
- Username and password are correct
- IP address is whitelisted (0.0.0.0/0)
- Internet connection is working

---

## ✅ Success Indicators

When MongoDB is connected, you'll see:
```
✅ MongoDB Connected: localhost
```
or
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
```

Then your backend will show:
```
🚀 Server running on port 5000
📡 Environment: development
🌐 Frontend URL: http://localhost:3000
```

---

**Choose a solution above and your backend will connect!** 🚀

