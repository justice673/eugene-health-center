# 🚀 Start Backend Server

## ❌ Error: ERR_CONNECTION_REFUSED

This means your **backend server is not running**.

---

## ✅ Quick Fix: Start the Backend

### Step 1: Open a New Terminal

Keep your frontend running in one terminal, open a **new terminal** for the backend.

### Step 2: Navigate to Backend Directory

```bash
cd /home/justice/Desktop/eugene-health-center/backend
```

### Step 3: Start the Backend Server

```bash
npm run dev
```

### Step 4: Verify It's Running

You should see:
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
🚀 Server running on port 5000
📡 Environment: development
🌐 Frontend URL: http://localhost:3000
```

---

## 📋 Running Both Servers

You need **TWO terminals** running:

### Terminal 1: Frontend (Next.js)
```bash
cd /home/justice/Desktop/eugene-health-center
npm run dev
```
**Runs on**: http://localhost:3000

### Terminal 2: Backend (Express.js)
```bash
cd /home/justice/Desktop/eugene-health-center/backend
npm run dev
```
**Runs on**: http://localhost:5000

---

## ✅ Success Indicators

When both are running:

1. **Frontend terminal** shows:
   ```
   ▲ Next.js 16.0.5
   - Local: http://localhost:3000
   ```

2. **Backend terminal** shows:
   ```
   ✅ MongoDB Connected: ...
   🚀 Server running on port 5000
   ```

3. **Browser** can make API calls without errors

---

## 🐛 Troubleshooting

### "Port 5000 already in use"
- Another process is using port 5000
- Kill it: `lsof -ti:5000 | xargs kill`
- Or change PORT in `backend/.env`

### "MongoDB connection failed"
- Check `backend/.env` has correct `MONGODB_URI`
- Make sure MongoDB is running (if local) or Atlas is accessible

### "Cannot find module"
- Run: `cd backend && npm install`
- Then restart: `npm run dev`

---

## 🎯 Quick Start Command

```bash
# Terminal 1: Frontend
cd /home/justice/Desktop/eugene-health-center
npm run dev

# Terminal 2: Backend (open new terminal)
cd /home/justice/Desktop/eugene-health-center/backend
npm run dev
```

---

**Once both servers are running, try logging in again!** 🚀

