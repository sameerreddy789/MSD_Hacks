# MSD_Hacks — Next.js 14 + Firebase E-Commerce

> "Hack your productivity. Not your wallet."
> A dark, cyberpunk SaaS e-commerce template selling AI-powered tech tools.

## Tech Stack
- **Frontend**: Next.js (App Router), React, TypeScript
- **Styling**: Tailwind CSS v4, custom CSS variables, Framer Motion
- **State Management**: Zustand
- **Backend/DB**: Firebase Auth, Firestore, Storage, Cloud Functions
- **AI Integration**: Vercel AI SDK + OpenAI GPT-4o-mini (via Cloud Functions)
- **Payment Gateway**: Modular abstraction (Razorpay/Stripe APIs in Cloud Functions)

---

## 🚀 Setup Instructions

### 1. Prerequisites
- Node.js `v20+`
- Firebase account
- Payment Gateway keys (Razorpay/Stripe)
- OpenAI API Key

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install Cloud Function dependencies
cd functions
npm install
cd ..
```

### 3. Firebase Initialization
Ensure you have the Firebase CLI installed globally:
```bash
npm i -g firebase-tools
firebase login
```
Set your current project inside `.firebaserc`:
```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```

### 4. Deploying Security Rules & Functions
Security rules are predefined in `firestore.rules` and `storage.rules`.
Deploy them to your Firebase project:
```bash
firebase deploy --only firestore:rules,storage:rules
```
Deploy the Cloud functions:
```bash
firebase deploy --only functions
```

### 5. Environment Variables
Copy the `.env.example` file to create your own `.env.local`:
```bash
cp .env.example .env.local
```
Fill in the requested variables:
- Your `NEXT_PUBLIC_FIREBASE_*` config object.
- Your `OPENAI_API_KEY` for the AI recommendation engine.
- Your `RAZORPAY_KEY_*` for transaction webhook verification.
- *Server-side Firebase Admin credentials.*

### 6. Start the App
Run the local development server:
```bash
npm run dev
```
To run Firebase Emulator:
```bash
firebase emulators:start
```
*(Make sure to set `NEXT_PUBLIC_USE_FIREBASE_EMULATOR=true` in `.env.local` to connect to it.)*

---

## 📦 Project Structure
- **/src/app**: Next.js App Router root, pages (Home, Products, Cart, Checkout, Dashboard)
- **/src/components**: Shared reusable UI elements, glassmorphism overlays, Neon buttons.
- **/src/lib**: Core configuration (Firebase client initialization).
- **/src/store**: Zustand states logic.
- **/functions**: Server-side HTTPS endpoints, auth hooks, payment webhooks.
- **firebase.json**: Defines the build paths and firestore/storage configurations.
