# Eugene Health Center - Express.js Backend

Complete Express.js backend API for Eugene Online Health Center.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Environment File

Create `.env` file in the backend directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=http://localhost:3000
```

### 3. Start Server

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Appointments
- `GET /api/appointments` - Get user appointments (requires auth)
- `GET /api/appointments/:id` - Get single appointment (requires auth)
- `POST /api/appointments` - Create appointment (requires auth)
- `PUT /api/appointments/:id` - Update appointment (requires auth)
- `DELETE /api/appointments/:id` - Cancel appointment (requires auth)

### Payments
- `POST /api/payments` - Process payment (simulated, requires auth)
- `GET /api/payments` - Get payment history (requires auth)
- `GET /api/payments/:id` - Get single payment (requires auth)

### Medications
- `GET /api/medications` - Get all medications (public)
- `GET /api/medications/:id` - Get single medication (public)
- `POST /api/medications` - Create medication (admin only)
- `PUT /api/medications/:id` - Update medication (admin only)
- `DELETE /api/medications/:id` - Delete medication (admin only)

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user (requires auth)
- `PUT /api/users/:id` - Update user (requires auth)
- `DELETE /api/users/:id` - Delete user (admin only)

### Doctors
- `GET /api/doctors` - Get all doctors (public)
- `GET /api/doctors/:id` - Get single doctor (public)

### Dashboard
- `GET /api/dashboard/stats` - Get user dashboard stats (requires auth)
- `GET /api/dashboard/admin/stats` - Get admin dashboard stats (admin only)

## 🔐 Authentication

All protected routes require JWT token in Authorization header:

```
Authorization: Bearer <token>
```

## 📝 Example Requests

### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "password": "SecurePass123"
  }'
```

### Sign In
```bash
curl -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Get Appointments (with token)
```bash
curl -X GET http://localhost:5000/api/appointments \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🗄️ Database Models

- **User** - User accounts (patients, doctors, admins)
- **Appointment** - Medical appointments
- **Medication** - Medication catalog
- **Payment** - Payment transactions

## 🛡️ Security Features

- JWT authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation
- CORS protection

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT tokens
- **cors** - CORS middleware
- **dotenv** - Environment variables
- **express-validator** - Input validation

## 🔧 Development

The backend uses ES6 modules. Make sure Node.js version is 14+.

For development with auto-reload:
```bash
npm run dev
```

## 📚 Documentation

See the main project README for complete documentation.


