# 🚀 Quick Start: Run Backend with MongoDB

## Step 1: Choose MongoDB Option

### Option A: MongoDB Atlas (Cloud) - RECOMMENDED ⭐
**No installation needed! Free tier available.**

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Create a free cluster (M0 - takes 3-5 minutes)
4. Create database user:
   - Go to "Database Access" → "Add New Database User"
   - Username: `eugene-admin` (or any name)
   - Password: Create a strong password (save it!)
   - Privileges: "Atlas Admin"
5. Whitelist IP:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for development
6. Get connection string:
   - Go to "Database" → Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Add database name: `...mongodb.net/eugene-health-center?retryWrites=true&w=majority`

### Option B: Install Local MongoDB
```bash
# Ubuntu/Debian
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

## Step 2: Update .env File

Edit `backend/.env` and set your MongoDB connection string:

**For MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/eugene-health-center?retryWrites=true&w=majority
```

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/eugene-health-center
```

## Step 3: Start Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
✅ MongoDB Connected: ...
🚀 Server running on port 5000
```

## Step 4: Test Connection

Open another terminal:
```bash
curl http://localhost:5000/api/health
```

Expected: `{"status":"OK","message":"Eugene Health Center API is running",...}`

## ✅ Done!

Your backend is now running with MongoDB! 🎉

For detailed instructions, see: `MONGODB_SETUP.md`
