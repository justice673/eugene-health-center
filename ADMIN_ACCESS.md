# 🔐 Admin Dashboard Access Guide

## ✅ Admin Dashboard Exists!

**URL**: `http://localhost:3000/admin`

The admin dashboard includes:
- User management
- Medication management (add, edit, delete)
- Appointment management
- Analytics and statistics
- System overview

---

## 🚀 Create Admin User (Easiest Method)

### Step 1: Run the Admin Creation Script

```bash
cd backend
node create-admin.js
```

### Step 2: Default Admin Credentials

After running the script, you'll get:

```
Email:    admin@eugenehealth.com
Password: Admin123!
```

### Step 3: Login

1. Go to: `http://localhost:3000/signin`
2. Enter the credentials above
3. You'll be automatically redirected to `/admin`

---

## 📋 Alternative Methods

### Method 2: Create via Signup + Database Update

1. Sign up normally at `/signup` with any email
2. Note the email you used
3. Connect to MongoDB (Compass or shell)
4. Find the user document
5. Update `role` field from `"user"` to `"admin"`
6. Save

### Method 3: Create via MongoDB Shell

```bash
# Connect to MongoDB
mongosh

# Use your database
use eugene-health-center

# Create admin user
db.users.insertOne({
  fullName: "Admin User",
  email: "admin@eugenehealth.com",
  phone: "+1234567890",
  password: "$2a$10$...", // You'll need to hash the password
  role: "admin",
  subscriptionPlan: "Premium Plan",
  subscriptionStatus: "active",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

**Note**: For Method 3, you need to hash the password using bcrypt. The script handles this automatically.

---

## 🔒 Security Notes

1. **Change the default password** after first login
2. **Don't share admin credentials** publicly
3. **Use strong passwords** in production
4. **Limit admin access** to trusted users only

---

## 🎯 Admin Dashboard Features

Once logged in as admin, you can:

- ✅ View all registered users
- ✅ Add, edit, and delete medications
- ✅ View all appointments across all users
- ✅ View system statistics and analytics
- ✅ Manage user accounts
- ✅ View payment history

---

## 🐛 Troubleshooting

### "Access Denied" or redirected to user dashboard

- Make sure the user's `role` field in database is set to `"admin"` (not `"user"`)
- Check the user object in `AuthContext` - it should show `role: "admin"`
- Try logging out and logging back in

### Script fails to connect to MongoDB

- Make sure MongoDB is running
- Check `backend/.env` has correct `MONGODB_URI`
- Verify the connection string is valid

### Can't find admin user after creation

- Check MongoDB database directly
- Verify the email matches exactly (case-sensitive)
- Check if user was created in the correct database

---

## ✅ Quick Start Command

```bash
cd backend && node create-admin.js
```

Then login with:
- **Email**: `admin@eugenehealth.com`
- **Password**: `Admin123!`

---

**Your admin dashboard is ready!** 🎉

