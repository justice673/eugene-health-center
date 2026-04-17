# ✅ MongoDB Installation Verification Guide

## Step-by-Step Verification

After running the installation commands, follow these steps to verify everything is working:

---

## 1. Check MongoDB Installation

```bash
mongod --version
```

**Expected output:**
```
db version v7.0.x
```

If you see version info, MongoDB is installed ✅

---

## 2. Check MongoDB Service Status

```bash
sudo systemctl status mongod
```

**Expected output:**
```
● mongod.service - MongoDB Database Server
   Loaded: loaded
   Active: active (running) since ...
```

If you see `Active: active (running)`, MongoDB is running ✅

---

## 3. Test MongoDB Connection

```bash
mongosh
```

**Expected output:**
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+...
Using MongoDB: 7.0.x
Using Mongosh: ...
```

If you see the MongoDB shell, connection works! Type `exit` to leave.

---

## 4. Verify Backend Connection

Once MongoDB is running, your backend should automatically reconnect (nodemon will restart it).

**Check your backend terminal for:**
```
✅ MongoDB Connected: localhost
🚀 Server running on port 5000
```

If you see this, everything is working! ✅

---

## 5. Test API Endpoint

Open a new terminal and test:

```bash
curl http://localhost:5000/api/health
```

**Expected response:**
```json
{
  "status": "OK",
  "message": "Eugene Health Center API is running",
  "timestamp": "2025-11-26T..."
}
```

---

## 🐛 Troubleshooting

### MongoDB Not Starting?

```bash
# Check MongoDB logs
sudo journalctl -u mongod -n 50

# Try starting manually
sudo systemctl start mongod

# Check if port 27017 is in use
sudo lsof -i :27017
```

### "Permission denied" errors?

- Make sure you're using `sudo` for systemctl commands
- Check if MongoDB service exists: `sudo systemctl list-units | grep mongod`

### Still getting connection errors?

1. Verify MongoDB is running: `sudo systemctl status mongod`
2. Check backend .env file has: `MONGODB_URI=mongodb://localhost:27017/eugene-health-center`
3. Restart backend: Press `Ctrl+C` in backend terminal, then `npm run dev`

---

## ✅ Success Checklist

- [ ] MongoDB installed (`mongod --version` works)
- [ ] MongoDB service running (`sudo systemctl status mongod` shows active)
- [ ] Can connect to MongoDB (`mongosh` works)
- [ ] Backend shows: `✅ MongoDB Connected: localhost`
- [ ] API health check works: `curl http://localhost:5000/api/health`

---

## 🎉 You're Done!

Once all checks pass, your backend is fully connected to MongoDB and ready to use!

