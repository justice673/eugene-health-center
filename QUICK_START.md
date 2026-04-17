# 🚀 Quick Start Guide

## Setup in 3 Minutes!

### Step 1: Create Environment File

Create a file named `.env.local` in the root directory:

```bash
# Copy this and replace with your actual values
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eugene-health?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_characters
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 2: Get MongoDB Connection String

**Quick Option - MongoDB Atlas (Free):**
1. Visit: https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create a cluster (takes 3-5 minutes)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your password
7. Replace `<dbname>` with `eugene-health`

**Example:**
```
mongodb+srv://myuser:mypassword123@cluster0.xxxxx.mongodb.net/eugene-health?retryWrites=true&w=majority
```

### Step 3: Generate JWT Secret

Run this command in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste it as your `JWT_SECRET` in `.env.local`.

### Step 4: Start the Server

```bash
npm run dev
```

### Step 5: Test It!

1. Open http://localhost:3000
2. Click "Sign Up"
3. Create an account
4. You'll be redirected to pricing page
5. Sign in and access your dashboard!

---

## ✅ Verify It's Working

### Check MongoDB Connection
- Look for "✅ MongoDB Connected Successfully" in your terminal
- If you see connection errors, double-check your MONGODB_URI

### Test Sign-Up
1. Go to http://localhost:3000/signup
2. Fill in the form
3. Click "Sign Up"
4. You should see a success message
5. Check your MongoDB database - you should see a new user!

### Test Sign-In
1. Go to http://localhost:3000/signin
2. Enter your credentials
3. Click "Sign In"
4. You should be redirected to /dashboard

---

## 🐛 Troubleshooting

**"MongoDB Connection Error"**
- Make sure your IP is whitelisted in MongoDB Atlas
- Go to Network Access → Add IP Address → Allow Access from Anywhere (for development)

**"Cannot find module"**
- Run: `npm install`
- Restart the dev server

**"JWT Secret Not Defined"**
- Make sure `.env.local` exists in the root directory
- Restart the dev server after creating the file

**Build errors with contexts**
- Clear Next.js cache: `rm -rf .next`
- Restart: `npm run dev`

---

## 📊 What's Available Now

### API Endpoints
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `GET /api/appointments` - Get appointments (requires auth)
- `POST /api/appointments` - Create appointment (requires auth)
- `POST /api/payments` - Process payment (simulated, requires auth)
- `GET /api/medications` - Get medications (public)

### Frontend Pages
- `/` - Home page
- `/signup` - User registration
- `/signin` - User login
- `/dashboard` - User dashboard (requires auth)
- `/admin` - Admin dashboard (requires admin role)
- `/pricing` - Subscription plans
- `/consultation` - Book consultation
- `/medications` - Browse medications
- `/symptom-checker` - Check symptoms
- `/appointments` - View appointments
- `/contact` - Contact page
- `/faq` - FAQ page
- `/how-it-works` - Platform guide
- `/privacy` - Privacy policy
- `/terms` - Terms of service

---

## 🎯 Test User Accounts

After starting the server, create test accounts:

**Regular User:**
- Email: user@test.com
- Password: TestUser123

**Admin User:**
- Email: admin@test.com
- Password: AdminPass123
- (Will have admin role automatically if email contains "admin")

---

## 📝 Next Steps

1. ✅ Create `.env.local` with your MongoDB credentials
2. ✅ Start the dev server
3. ✅ Test sign-up and sign-in
4. ✅ Book a test appointment
5. ✅ Try the payment simulation
6. 🔄 Customize the frontend
7. 🔄 Add more features as needed

---

## 💡 Tips

- **Development**: Use MongoDB Atlas free tier (512MB)
- **Production**: Upgrade to paid tier for better performance
- **Security**: Change JWT_SECRET before deploying
- **Payments**: Currently simulated - integrate Stripe for real payments
- **Email**: Add SendGrid or similar for email notifications

---

## 🆘 Need Help?

Check the detailed documentation:
- `MONGODB_SETUP.md` - Complete backend guide
- `README.md` - Project overview

---

**You're all set! Happy coding! 🎉**


