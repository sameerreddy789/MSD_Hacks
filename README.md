# MSDHacks - Cool & Productive E-Commerce Platform

A complete e-commerce platform for selling productivity tools and digital products.

## 🏗️ Architecture

- **Frontend:** Vanilla HTML/CSS/JavaScript (no framework)
- **Backend:** Node.js + Express + MongoDB
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT + bcrypt
- **Payment:** Razorpay/Stripe integration

## 📁 Project Structure

```
msd-hacks/
├── frontend/                 # Vanilla HTML/CSS/JS frontend
│   ├── index.html           # Homepage
│   ├── products.html        # Product listing
│   ├── product-detail.html  # Product details
│   ├── cart.html            # Shopping cart
│   ├── checkout.html        # Checkout page
│   ├── login.html           # Login/Register
│   ├── fluid-autonomous.html # Autonomous fluid simulation showcase
│   ├── fluid-simple-test.html # Minimal fluid test page
│   ├── assets/
│   │   ├── css/
│   │   │   ├── style.css           # Main styles
│   │   │   └── components.css      # Component styles
│   │   └── js/
│   │       ├── main.js             # General utilities
│   │       ├── data.js             # Mock product data
│   │       ├── cart.js             # Cart management
│   │       ├── auth.js             # Authentication
│   │       └── fluid-autonomous.js # WebGL fluid simulation
│   └── FLUID_COMPONENT_README.md   # Fluid simulation docs
│
├── backend/                  # Express API server
│   ├── config/
│   │   ├── db.js            # MongoDB connection
│   │   └── env.js           # Environment validation
│   ├── models/
│   │   ├── User.js          # User schema
│   │   ├── Product.js       # Product schema
│   │   ├── Order.js         # Order schema
│   │   └── Review.js        # Review schema
│   ├── controllers/
│   │   ├── authController.js      # Auth logic
│   │   ├── productController.js   # Product logic
│   │   └── orderController.js     # Order logic
│   ├── routes/
│   │   ├── auth.js          # Auth routes
│   │   ├── products.js      # Product routes
│   │   └── orders.js        # Order routes
│   ├── middleware/
│   │   ├── auth.js          # JWT authentication
│   │   ├── validate.js      # Input validation
│   │   └── errorHandler.js  # Error handling
│   ├── .env.example         # Environment template
│   ├── package.json         # Backend dependencies
│   └── server.js            # Express server
│
├── docs/                     # Documentation
│   ├── MERN_CONVERSION_COMPLETE.md
│   ├── PROJECT_MIGRATION_PLAN.md
│   ├── SECURITY_AUDIT_REPORT.md
│   └── AUDIT_SUMMARY.md
│
├── .gitignore
├── AGENTS.md                 # AI agent rules
├── CLAUDE.md                 # Claude-specific docs
└── README.md                 # This file
```

## 🚀 Quick Start

### Frontend Only (No Backend Required)

```bash
cd frontend
npx serve .
# Open http://localhost:3000
```

The frontend works standalone with mock data!

### Full Stack Setup

#### 1. Setup Backend

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and secrets

# Start MongoDB (if local)
mongod

# Start backend server
npm run dev
```

Backend runs on `http://localhost:5000`

#### 2. Setup Frontend

```bash
cd frontend
npx serve .
```

Frontend runs on `http://localhost:3000`

## 🔑 Environment Variables

### Backend (.env)

```bash
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/msd_hacks
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
CLIENT_URL=http://localhost:3000

# Payment
RAZORPAY_KEY_ID=your-key-id
RAZORPAY_KEY_SECRET=your-key-secret
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:slug` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Create order
- `POST /api/orders/verify` - Verify payment
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get single order

## 🎨 Frontend Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Product browsing with filters & search
- ✅ Shopping cart (localStorage)
- ✅ Checkout flow with payment
- ✅ Autonomous WebGL fluid simulation with Lissajous curves
- ✅ Glassmorphic UI design
- ✅ User authentication
- ✅ Cyberpunk/tech design theme
- ✅ Toast notifications
- ✅ Loading states
- ✅ Empty states

## 🔐 Security Features

- Helmet.js for security headers
- CORS configured
- Rate limiting (100 req/15min general, 10 req/15min auth)
- JWT authentication
- Password hashing with bcrypt (cost factor 12)
- Input validation with express-validator
- MongoDB injection prevention
- Error handling middleware

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3 (Custom design system)
- Vanilla JavaScript (ES6+)
- localStorage for cart & auth

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- bcrypt for password hashing
- Razorpay/Stripe for payments

### Development Tools
- nodemon (backend dev server)
- serve (frontend dev server)

## 📖 Documentation

- **Frontend Guide:** `frontend/README.md`
- **Quick Start:** `frontend/QUICK_START.md`
- **Backend Setup:** `backend/.env.example`
- **Security Audit:** `docs/SECURITY_AUDIT_REPORT.md`
- **Migration Plan:** `docs/MERN_CONVERSION_COMPLETE.md`

## 🚢 Deployment

### Frontend
- **Netlify:** Drag & drop `frontend` folder
- **Vercel:** Connect GitHub repo
- **GitHub Pages:** Push to `gh-pages` branch

### Backend
- **Railway:** Connect GitHub repo
- **Render:** Connect GitHub repo
- **Heroku:** Use Heroku CLI

### Database
- **MongoDB Atlas:** Free tier available

## 🧪 Testing

### Frontend
Open `frontend/index.html` in browser and test:
- Browse products
- Add to cart
- Complete checkout
- Try AI recommendations
- Login/Register

### Backend
```bash
cd backend
npm test  # (Add tests as needed)
```

## 📝 License

MIT License - Feel free to use for your projects!

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📧 Support

For issues and questions, please open a GitHub issue.

---

**Built with ❤️ for students and young professionals**

*Hack your productivity. Not your wallet.*
