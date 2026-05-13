# TheHairLocs - Premium Hair Care E-Commerce Platform

![TheHairLocs](https://myhairlocs.netlify.app/)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB)

## 🌐 Live Website

**[TheHairLocs](https://myhairloc.netlify.app/)**

A premium e-commerce platform for hair care products, built with React and Firebase. TheHairLocs offers a seamless shopping experience with a wide range of hair care products including oils, shampoos, conditioners, styling products, moisturizers, and serums.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Firebase Setup](#firebase-setup)
- [Available Scripts](#available-scripts)
- [Pages Overview](#pages-overview)
- [Admin Panel](#admin-panel)
- [Product Categories](#product-categories)
- [Contact Information](#contact-information)
- [License](#license)

---

## ✨ Features

### User Features
- 🛒 **Shopping Cart** - Add products to cart, manage quantities
- ❤️ **Favorites/Wishlist** - Save favorite products for later
- 👤 **User Authentication** - Sign up, login, and account management
- 📦 **Order Tracking** - View order history and status
- 🔍 **Product Search & Filter** - Find products by category, price, rating
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- ⭐ **Product Reviews** - View ratings and reviews

### Admin Features
- 📊 **Dashboard** - Overview of sales, orders, and statistics
- 🛍️ **Product Management** - Add, edit, delete products
- 📁 **Category Management** - Manage product categories
- 👥 **User Management** - View and manage registered users
- 📋 **Order Management** - View and process orders
- ⚙️ **Settings** - Configure store settings

### Additional Features
- 🔔 **Toast Notifications** - Instant feedback for user actions
- 🛒 **Cart Sidebar** - Quick cart preview
- 📢 **Sale Products** - Special sale section
- 💬 **WhatsApp Chat** - Direct customer support
- 🔝 **Back to Top** - Quick navigation button

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 19.2.3 |
| **Routing** | React Router DOM 7.11.0 |
| **UI Framework** | Material UI (MUI) 7.3.6 |
| **Backend** | Firebase (Auth, Firestore) |
| **Icons** | Font Awesome 7.1.0 |
| **Carousel** | Swiper 12.0.3 |
| **Styling** | CSS3 |

---

## 📁 Project Structure

```
thehairlocs/
├── public/
│   ├── assets/
│   │   ├── fonts/          # Poppins, Roboto fonts
│   │   └── images/         # Product images, banners, categories
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── admin/
│   │   └── adminPages/    # Admin-specific pages
│   ├── components/
│   │   ├── layout/        # Layout components (Navbar, Footer, etc.)
│   │   ├── sections/      # Page sections (Hero, Banner, etc.)
│   │   └── ui/            # Reusable UI components
│   ├── config/
│   │   └── firebase.js    # Firebase configuration
│   ├── contaxt/           # React Context (Cart, Favorites)
│   ├── data/              # Static data (Products, Categories)
│   ├── pages/             # All page components
│   ├── styles/            # Global CSS styles
│   ├── user/
│   │   └── userPages/     # User-specific pages
│   └── utils/             # Utility functions
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Before running the project, ensure you have:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Firebase Account**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd thehairlocs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a project at [Firebase Console](https://console.firebase.google.com/)
   - Enable **Authentication** (Email/Password)
   - Enable **Firestore Database**
   - Get your Firebase config credentials

4. **Create environment file**
   Create a `.env` file in the root directory (see Firebase Setup below)

5. **Start development server**
   ```bash
   npm start
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory with your Firebase configuration:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

---

## 🔥 Firebase Setup

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard

### Step 2: Enable Authentication
1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** provider

### Step 3: Enable Firestore Database
1. Go to **Firestore Database** → **Create database**
2. Start in **Test mode** (or set appropriate rules)

### Step 4: Get Configuration
1. Go to **Project Settings** → **General**
2. Scroll down to "Your apps" section
3. Select the web app (</>) icon
4. Copy the Firebase config object

### Step 5: Configure Firebase in Project
Update `src/config/firebase.js` with your credentials:

```javascript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Runs the app in development mode |
| `npm run build` | Builds the app for production |
| `npm test` | Launches the test runner |
| `npm run eject` | Ejects from Create React App |

---

## 📄 Pages Overview

### Public Pages
| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Main landing page with hero, categories, featured products |
| `/products` | Products | Browse all products with filters |
| `/product/:id` | Product Details | Individual product information |
| `/categories` | Categories | View all product categories |
| `/sale` | Sale | Sale products page |
| `/about` | About | About TheHairLocs |
| `/contact` | Contact | Contact form and information |
| `/faqs` | FAQs | Frequently asked questions |
| `/cart` | Cart | Shopping cart |
| `/favorites` | Favorites | Saved wishlist items |
| `/checkout` | Checkout | Order checkout process |
| `/order-success/:id` | Order Success | Order confirmation |
| `/privacy-policy` | Privacy Policy | Privacy policy page |
| `/shipping-policy` | Shipping Policy | Shipping information |
| `/refund-policy` | Refund Policy | Refund policy page |

### Authentication Pages
| Route | Page | Description |
|-------|------|-------------|
| `/login` | Login | User login |
| `/SignUp` | Sign Up | User registration |

### User Account Pages
| Route | Page | Description |
|-------|------|-------------|
| `/user/orders` | User Orders | Order history |
| `/account/orders` | User Orders | Order history (alternate route) |

---

## ⚙️ Admin Panel

Access the admin panel at `/admin/dashboard` (requires admin role)

### Admin Routes
| Route | Page | Description |
|-------|------|-------------|
| `/admin/dashboard` | Dashboard | Overview statistics |
| `/admin/mange-products` | Manage Products | View and edit products |
| `/admin/addproducts` | Add Product | Add new product |
| `/admin/orders` | Admin Orders | Manage customer orders |
| `/admin/users` | Users | Manage registered users |
| `/admin/settings` | Settings | Store settings |
| `/admin/mange-categories` | Manage Categories | Manage categories |

### Admin Access
- Navigate to `/login`
- Sign in with an admin account
- Admin role is set in Firestore user documents

---

## 🧴 Product Categories

| Category | Description |
|----------|-------------|
| **Oils** | Hair growth and nourishing oils (Castor, Almond, Coconut, Onion, Argan, etc.) |
| **Shampoos** | Various shampoos for different hair types |
| **Conditioners** | Hair conditioning and repair products |
| **Styling** | Gels, sprays, mousses, waxes, creams |
| **Moisturizers** | Hair moisturizers and serums |
| **Serums** | Hair treatment serums and masks |

### Product Features
- Multiple images per product
- Sale pricing with discount badges
- Rating system (1-5 stars)
- Stock availability
- Hair type compatibility tags
- Featured product flag

---

## 📞 Contact Information

| Detail | Information |
|--------|-------------|
| **Location** | Gujrat, Punjab, Pakistan |
| **Phone** | 0327-6317391 |
| **Email** | hsyedumer12534@gmail.com@gmail.com |
| **Website** | https://myhairloc.netlify.app/ |

### Social Media
- Facebook
- WhatsApp
- Instagram

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developer

Developed by **UMER**

© 2025 TheHairLocs. All rights reserved.

---

## 🙏 Acknowledgments

- [Create React App](https://create-react-app.dev/)
- [Firebase](https://firebase.google.com/)
- [Material UI](https://mui.com/)
- [Font Awesome](https://fontawesome.com/)
- [Swiper](https://swiperjs.com/)

---

## 🔗 Quick Links

- 🌐 **Live Website**: https://myhairloc.netlify.app/
- 📧 **Support**: syedumer12534@gmail.com
- 📱 **Phone**: 0337-6317391

