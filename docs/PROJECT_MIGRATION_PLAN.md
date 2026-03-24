# Migration Plan: Next.js/Firebase → MERN Stack (Vanilla HTML/CSS/JS)

## Architecture Overview

### Current Stack
- Frontend: Next.js 16 + React 19 + TypeScript
- Backend: Firebase (Firestore, Auth, Functions, Storage)
- State: Zustand
- Styling: Tailwind CSS

### Target Stack
- Frontend: Vanilla HTML + CSS + JavaScript
- Backend: Node.js + Express
- Database: MongoDB
- Auth: JWT + bcrypt
- File Storage: Local/Multer or AWS S3
- Payment: Razorpay/Stripe integration

## New Project Structure

```
msd-hacks-mern/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── env.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   └── payments.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── assets/
│   │   ├── css/
│   │   │   ├── style.css
│   │   │   └── components.css
│   │   ├── js/
│   │   │   ├── main.js
│   │   │   ├── api.js
│   │   │   ├── auth.js
│   │   │   ├── cart.js
│   │   │   └── components.js
│   │   └── images/
│   ├── pages/
│   │   ├── index.html
│   │   ├── products.html
│   │   ├── product-detail.html
│   │   ├── cart.html
│   │   ├── checkout.html
│   │   ├── ai-picks.html
│   │   └── login.html
│   └── components/
│       └── (HTML templates loaded via JS)
│
└── README.md
```

## Migration Steps

1. ✅ Create backend structure
2. ✅ Set up MongoDB models
3. ✅ Create Express API routes
4. ✅ Convert React components to vanilla HTML/CSS/JS
5. ✅ Implement client-side routing
6. ✅ Replace Firebase Auth with JWT
7. ✅ Replace Firestore with MongoDB
8. ✅ Implement cart in localStorage
9. ✅ Add payment integration

## Key Changes

### Authentication
- Firebase Auth → JWT tokens stored in localStorage
- httpOnly cookies for refresh tokens

### Database
- Firestore → MongoDB with Mongoose
- Real-time listeners → Polling or WebSockets

### File Storage
- Firebase Storage → Multer (local) or AWS S3

### State Management
- Zustand → localStorage + vanilla JS state

### Styling
- Tailwind CSS → Custom CSS (keeping design system)

### Routing
- Next.js routing → Manual routing with History API
