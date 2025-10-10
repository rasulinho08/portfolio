# Portfolio Full-Stack Setup Guide 🚀

This guide will help you set up your complete portfolio system with React frontend and Node.js backend.

## 🎯 What You Have

✅ **Frontend**: Modern React portfolio with authentication and admin features
✅ **Backend**: Node.js/Express server with SQLite database
✅ **Authentication**: JWT-based login system with admin roles
✅ **Admin Panel**: Manage testimonials, contact messages, and user requests
✅ **Database**: SQLite with automatic schema setup

## 📋 Prerequisites

Before starting, make sure you have:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Git** (optional but recommended) - [Download here](https://git-scm.com/)
- A code editor (VS Code recommended)

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Dependencies

Open your terminal in the project folder and run:

```bash
# Install frontend dependencies
npm install

# Install backend dependencies (from project root)
npm install express sqlite3 bcryptjs jsonwebtoken cors helmet express-rate-limit multer dotenv nodemailer
```

### Step 2: Initialize Database

```bash
# Create and setup database aye deyirem d
node backend/scripts/init-db.js
```

This creates:
- SQLite database with all required tables
- Default admin user (username: admin, password: admin123)
- Test data for development

### Step 3: Start the Backend Server

```bash
# Start backend server
node backend/server.js
```

You should see:
```
✓ Database initialized successfully
✓ Server running on port 5000
✓ CORS enabled for http://localhost:5173
```

### Step 4: Start the Frontend

Open a new terminal and run:

```bash
# Start frontend development server
npm run dev
```

Visit: `http://localhost:5173`

## 🔐 Default Login Credentials

**Admin Account:**
- Username: `admin`
- Password: `admin123`
- Role: Administrator

**Test User:**
- Username: `testuser`
- Password: `password123`
- Role: User

## 🌟 Features Available

### Frontend Features:
- ✨ Modern animated portfolio sections
- 🔐 User authentication (login/register)
- 📝 Contact forms with backend integration
- ⭐ Testimonial submission system
- 📱 Responsive mobile design
- 🎨 Beautiful orange/purple gradient theme

### Admin Panel Features:
- 📊 Dashboard with statistics
- 👥 User management
- ⭐ Testimonial approval/rejection
- 📧 Contact message management
- 🛍️ Shop inquiry handling
- 📈 Admin activity logs

### Backend API Endpoints:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/testimonials` - Get approved testimonials
- `POST /api/testimonials` - Submit new testimonial
- `POST /api/contact` - Submit contact form
- `GET /api/admin/*` - Admin-only endpoints

## 🛠️ Configuration

### Environment Variables (.env)

The `.env` file is already created with secure defaults:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
NODE_ENV=development
DB_PATH=./backend/database.sqlite
```

**Important**: Change `JWT_SECRET` before deploying to production!

### Database Location

Your SQLite database is stored at: `backend/database.sqlite`

## 🚨 Troubleshooting

### Common Issues:

**Port Already in Use:**
```bash
# Kill process using port 5000
npx kill-port 5000
# Then restart: node backend/server.js
```

**Database Issues:**
```bash
# Delete and recreate database
del backend\database.sqlite
node backend\scripts\init-db.js
```

**Permission Issues:**
```bash
# Run as administrator if needed
# Or check file permissions in backend/ folder
```

**CORS Errors:**
- Make sure both frontend (5173) and backend (5000) are running
- Check that CORS is configured for your frontend URL

## 🌐 Deployment Options

### Option 1: Local Network Access

To access from other devices on your network:

1. Find your local IP address:
```bash
ipconfig
```

2. Update CORS in `backend/server.js`:
```javascript
const corsOptions = {
  origin: ['http://localhost:5173', 'http://YOUR_IP:5173'],
  // ...
}
```

3. Access via: `http://YOUR_IP:5173`

### Option 2: Production Deployment

**Recommended Services:**
- **Frontend**: Netlify, Vercel, or GitHub Pages
- **Backend**: Railway, Render, or DigitalOcean
- **Database**: Keep SQLite or upgrade to PostgreSQL

**Pre-deployment Checklist:**
- [ ] Change JWT_SECRET in production
- [ ] Update CORS origins for production domain
- [ ] Set NODE_ENV=production
- [ ] Test all authentication flows
- [ ] Backup database

## 📱 Testing Your Setup

### 1. Test Frontend:
- Visit `http://localhost:5173`
- Navigate through all sections
- Try the contact form
- Submit a testimonial

### 2. Test Authentication:
- Click "Sign In" in navigation
- Login with admin credentials
- Access admin panel
- Test user registration

### 3. Test Admin Panel:
- View dashboard statistics
- Manage testimonials
- Check contact messages
- Review user accounts

## 🔧 Development Tips

### Adding New Features:

**New API Endpoint:**
1. Add route to `backend/routes/api.js`
2. Add corresponding frontend function
3. Update admin panel if needed

**New Database Table:**
1. Add schema to `backend/scripts/init-db.js`
2. Create migration script
3. Update API endpoints

**Styling Changes:**
- Colors are in CSS variables (index.css)
- Components use Tailwind CSS classes
- Animations powered by Framer Motion

## 📞 Need Help?

If you encounter any issues:

1. **Check Console**: Look for error messages in browser/terminal
2. **Verify Setup**: Ensure all steps were followed correctly
3. **Check Logs**: Backend logs errors to console
4. **Database Issues**: Reinitialize database if needed

## 🎉 You're All Set!

Your portfolio system includes:
- ✅ Modern React frontend
- ✅ Secure authentication system  
- ✅ Admin panel for content management
- ✅ Contact form integration
- ✅ Testimonial system
- ✅ Mobile-responsive design
- ✅ Professional styling

**Next Steps:**
1. Customize content in React components
2. Add your projects and skills
3. Configure email integration
4. Deploy to production

Happy coding! 🚀