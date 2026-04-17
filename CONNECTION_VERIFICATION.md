# 🔗 Frontend to Backend Connection Verification

## ✅ Current Configuration

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Backend (`backend/.env`)
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/eugene-health-center
JWT_SECRET=eugene_health_center_jwt_secret_key_2025_change_this_in_production_use_random_string
```

## 🔍 How the Connection Works

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                   │
│                  Port: 3000                             │
│                                                         │
│  src/lib/api.ts                                         │
│  ├─ API_URL = process.env.NEXT_PUBLIC_API_URL          │
│  └─ Makes fetch requests to: http://localhost:5000     │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ HTTP Requests
                     │ (fetch API)
                     ↓
┌─────────────────────────────────────────────────────────┐
│                    BACKEND (Express.js)                  │
│                  Port: 5000                             │
│                                                         │
│  backend/src/server.js                                   │
│  ├─ CORS allows: http://localhost:3000                 │
│  ├─ Routes: /api/auth, /api/appointments, etc.         │
│  └─ Responds with JSON                                 │
└─────────────────────────────────────────────────────────┘
```

## ✅ Verification Steps

### Step 1: Start Backend
```bash
cd backend
npm run dev
```

**Expected output:**
```
✅ MongoDB Connected: localhost (or cluster address)
🚀 Server running on port 5000
📡 Environment: development
🌐 Frontend URL: http://localhost:3000
```

### Step 2: Start Frontend
```bash
npm run dev
```

**Expected output:**
```
▲ Next.js 16.0.5
- Local:        http://localhost:3000
```

### Step 3: Test Connection

**Option A: Use the test script**
```bash
node test-connection.js
```

**Option B: Manual test with curl**
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Expected response:
# {"status":"OK","message":"Eugene Health Center API is running",...}
```

**Option C: Test in browser**
1. Open: http://localhost:3000
2. Open browser DevTools (F12)
3. Go to Network tab
4. Try to sign up or sign in
5. Check if requests go to `http://localhost:5000/api/...`

## 🔧 API Endpoints Available

All endpoints are prefixed with `/api`:

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Appointments
- `GET /api/appointments` - Get user appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/:id` - Get single appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Medications
- `GET /api/medications` - Get all medications (public)
- `GET /api/medications?category=Pain%20Relief` - Filter by category
- `GET /api/medications?search=aspirin` - Search medications

### Payments
- `POST /api/payments` - Process payment
- `GET /api/payments` - Get payment history

### Dashboard
- `GET /api/dashboard/stats` - Get user dashboard stats
- `GET /api/dashboard/admin/stats` - Get admin stats

## 🐛 Troubleshooting

### "Failed to fetch" or "Network error"
**Causes:**
1. Backend not running
2. Wrong URL in `.env.local`
3. CORS not configured

**Solutions:**
```bash
# 1. Check backend is running
curl http://localhost:5000/api/health

# 2. Verify .env.local
cat .env.local
# Should show: NEXT_PUBLIC_API_URL=http://localhost:5000

# 3. Check backend CORS
cat backend/.env | grep FRONTEND_URL
# Should show: FRONTEND_URL=http://localhost:3000
```

### "CORS error" in browser console
**Solution:**
- Check `FRONTEND_URL` in `backend/.env` matches your frontend URL
- Restart backend after changing `.env`

### "Connection refused"
**Solution:**
- Make sure backend is running on port 5000
- Check if port 5000 is in use: `lsof -i :5000`
- Change PORT in `backend/.env` if needed

### API calls go to wrong URL
**Solution:**
- Restart Next.js dev server after changing `.env.local`
- Clear Next.js cache: `rm -rf .next`
- Restart: `npm run dev`

## ✅ Connection Checklist

- [ ] Backend `.env` has `PORT=5000`
- [ ] Backend `.env` has `FRONTEND_URL=http://localhost:3000`
- [ ] Frontend `.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:5000`
- [ ] Backend server is running (`npm run dev` in backend/)
- [ ] Frontend server is running (`npm run dev` in root/)
- [ ] MongoDB is connected (check backend terminal)
- [ ] Health endpoint works: `curl http://localhost:5000/api/health`

## 🎯 Quick Test

Run this command to test everything:

```bash
# Terminal 1: Start backend
cd backend && npm run dev

# Terminal 2: Start frontend  
npm run dev

# Terminal 3: Test connection
node test-connection.js
```

## 📝 Example API Call from Frontend

```typescript
// In your React component
import { api } from '@/lib/api';

// Sign up
const response = await api.signup({
  fullName: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  password: 'SecurePass123'
});

const data = await response.json();
console.log(data); // { message: 'User registered successfully', token: '...', user: {...} }
```

## 🎉 Success Indicators

When everything is connected correctly:

1. ✅ Backend terminal shows: `✅ MongoDB Connected`
2. ✅ Frontend can make API calls without errors
3. ✅ Browser Network tab shows requests to `localhost:5000`
4. ✅ Authentication works (signup/signin)
5. ✅ Data loads from backend (medications, appointments, etc.)

---

**Your frontend and backend are now connected!** 🚀

