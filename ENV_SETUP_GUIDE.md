# 🔧 Environment Variables Setup Guide

This guide explains all the environment variables needed for your Eugene Health Center project.

---

## 📁 File Locations

- **Backend**: `backend/.env` (for Express.js server)
- **Frontend**: `.env.local` (for Next.js app)

---

## 🔴 Backend Environment Variables (`backend/.env`)

### 1. `PORT=5000`
- **What it does**: Sets the port where your Express.js backend server runs
- **Default**: 5000
- **When to change**: If port 5000 is already in use, change to another port (e.g., 5001, 8000)
- **Example**: `PORT=5000`

### 2. `NODE_ENV=development`
- **What it does**: Sets the environment mode
- **Options**: 
  - `development` - Shows detailed errors, uses dev tools
  - `production` - Optimized, hides sensitive errors
- **When to change**: Set to `production` when deploying to live server
- **Example**: `NODE_ENV=development`

### 3. `MONGODB_URI=...` ⚠️ **REQUIRED**
- **What it does**: Connection string to your MongoDB database
- **Required**: YES - Without this, your backend cannot connect to the database
- **How to get it**:
  
  **Option A: MongoDB Atlas (Cloud) - RECOMMENDED**
  1. Sign up at https://www.mongodb.com/cloud/atlas
  2. Create a free cluster
  3. Create database user (username + password)
  4. Whitelist IP (allow 0.0.0.0/0 for development)
  5. Get connection string from "Connect" → "Connect your application"
  6. Format: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/eugene-health-center?retryWrites=true&w=majority`
  
  **Option B: Local MongoDB**
  - Install MongoDB on your computer
  - Format: `mongodb://localhost:27017/eugene-health-center`
  
- **Example (Atlas)**: `MONGODB_URI=mongodb+srv://admin:MyPass123@cluster0.abc123.mongodb.net/eugene-health-center?retryWrites=true&w=majority`
- **Example (Local)**: `MONGODB_URI=mongodb://localhost:27017/eugene-health-center`

### 4. `JWT_SECRET=...` ⚠️ **REQUIRED**
- **What it does**: Secret key used to sign and verify JWT authentication tokens
- **Required**: YES - Without this, user authentication won't work
- **Security**: Must be a long, random string (at least 32 characters)
- **How to generate**:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- **Example**: `JWT_SECRET=my_super_secret_jwt_key_12345678901234567890`
- **⚠️ IMPORTANT**: Never share this secret! Change it in production!

### 5. `FRONTEND_URL=http://localhost:3000`
- **What it does**: Allows your frontend to communicate with backend (CORS)
- **Default**: http://localhost:3000
- **When to change**: 
  - If frontend runs on different port
  - In production, set to your actual frontend domain
- **Example**: `FRONTEND_URL=http://localhost:3000`

---

## 🟢 Frontend Environment Variables (`.env.local`)

### 1. `NEXT_PUBLIC_API_URL=http://localhost:5000` ⚠️ **REQUIRED**
- **What it does**: Tells your Next.js frontend where to find the Express.js backend
- **Required**: YES - Without this, frontend cannot communicate with backend
- **Format**: Must match the backend PORT
- **When to change**: 
  - If backend runs on different port, update this
  - In production, set to your actual backend URL
- **Example**: `NEXT_PUBLIC_API_URL=http://localhost:5000`
- **⚠️ IMPORTANT**: 
  - Must start with `NEXT_PUBLIC_` for Next.js to expose it to the browser
  - Must match the PORT in `backend/.env`

---

## ✅ Quick Setup Checklist

### Step 1: Backend Setup
- [ ] Create `backend/.env` file
- [ ] Set `MONGODB_URI` (get from MongoDB Atlas or use local)
- [ ] Set `JWT_SECRET` (generate a random string)
- [ ] Set `PORT=5000` (or your preferred port)
- [ ] Set `FRONTEND_URL=http://localhost:3000`
- [ ] Set `NODE_ENV=development`

### Step 2: Frontend Setup
- [ ] Create `.env.local` file in project root
- [ ] Set `NEXT_PUBLIC_API_URL=http://localhost:5000` (must match backend PORT)

### Step 3: Verify
- [ ] Start backend: `cd backend && npm run dev`
- [ ] Start frontend: `npm run dev`
- [ ] Test: Open http://localhost:3000 and try to sign up

---

## 🔍 How It Works

### Backend Flow:
1. Backend reads `backend/.env` file using `dotenv` package
2. `MONGODB_URI` → Connects to MongoDB database
3. `JWT_SECRET` → Signs/verifies authentication tokens
4. `PORT` → Server listens on this port
5. `FRONTEND_URL` → Allows requests from this URL (CORS)

### Frontend Flow:
1. Next.js reads `.env.local` file automatically
2. `NEXT_PUBLIC_API_URL` → All API calls go to this URL
3. Frontend makes requests to: `${NEXT_PUBLIC_API_URL}/api/...`

### Connection Flow:
```
Frontend (localhost:3000) 
    ↓ (uses NEXT_PUBLIC_API_URL)
Backend (localhost:5000)
    ↓ (uses MONGODB_URI)
MongoDB Database
```

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
- ✅ Check `MONGODB_URI` is correct
- ✅ For Atlas: Check username/password, IP whitelist
- ✅ For Local: Check MongoDB service is running

### "JWT Secret not defined"
- ✅ Check `JWT_SECRET` exists in `backend/.env`
- ✅ Restart backend server after adding it

### "CORS error" or "Failed to fetch"
- ✅ Check `FRONTEND_URL` in `backend/.env` matches frontend URL
- ✅ Check `NEXT_PUBLIC_API_URL` in `.env.local` matches backend PORT
- ✅ Ensure both servers are running

### "Port already in use"
- ✅ Change `PORT` in `backend/.env` to another port
- ✅ Update `NEXT_PUBLIC_API_URL` in `.env.local` to match

---

## 📝 Example Complete Files

### `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://admin:password123@cluster0.abc123.mongodb.net/eugene-health-center?retryWrites=true&w=majority
JWT_SECRET=my_super_secret_jwt_key_12345678901234567890abcdef
FRONTEND_URL=http://localhost:3000
```

### `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🎉 You're All Set!

Once both `.env` files are configured correctly:
1. Backend will connect to MongoDB ✅
2. Frontend will connect to Backend ✅
3. Authentication will work ✅
4. All API calls will work ✅

**Start developing!** 🚀

