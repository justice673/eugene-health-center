# 🔧 Install MongoDB - Quick Instructions

## Option 1: Run the Installation Script (Easiest)

I've created a script for you. Just run:

```bash
cd /home/justice/Desktop/eugene-health-center
bash install-mongodb.sh
```

This will:
1. Install MongoDB
2. Start the MongoDB service
3. Enable it to start on boot

---

## Option 2: Manual Installation (Step by Step)

Copy and paste these commands one by one in your terminal:

### Step 1: Import MongoDB GPG Key
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
```

### Step 2: Add MongoDB Repository
```bash
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
```

### Step 3: Update Package List
```bash
sudo apt-get update
```

### Step 4: Install MongoDB
```bash
sudo apt-get install -y mongodb-org
```

### Step 5: Start MongoDB Service
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Step 6: Verify Installation
```bash
sudo systemctl status mongod
```

You should see: `Active: active (running)`

---

## ✅ After Installation

Once MongoDB is installed and running:

1. **Your backend will auto-restart** (nodemon will detect the change)
2. You should see: `✅ MongoDB Connected: localhost`
3. The error will be gone!

---

## 🧪 Test MongoDB

To test if MongoDB is working:

```bash
mongosh
```

If it connects, you'll see the MongoDB shell. Type `exit` to leave.

---

## 🐛 Troubleshooting

### "Permission denied" errors
- Make sure you're using `sudo` for installation commands
- You'll need to enter your password

### "Service failed to start"
```bash
# Check MongoDB logs
sudo journalctl -u mongod

# Try starting manually
sudo systemctl start mongod
```

### Still getting connection errors?
- Make sure MongoDB is running: `sudo systemctl status mongod`
- Check if port 27017 is in use: `sudo lsof -i :27017`
- Restart MongoDB: `sudo systemctl restart mongod`

---

## 🎯 Alternative: Use MongoDB Atlas (Cloud)

If you prefer not to install MongoDB locally, you can use MongoDB Atlas (cloud):

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Create free account and cluster
3. Get connection string
4. Update `backend/.env` with Atlas connection string

See `QUICK_MONGODB_FIX.md` for detailed Atlas setup.

---

## ✅ Success!

Once MongoDB is running, your backend terminal should show:
```
✅ MongoDB Connected: localhost
🚀 Server running on port 5000
```

Then you're all set! 🎉

