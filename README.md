# 🛍️ Bazzar — Full-Stack MERN E-Commerce Platform

**Bazzar** is a full-stack e-commerce application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It provides customers with a seamless online shopping experience, while a dedicated admin dashboard enables efficient management of products, inventory, and customer orders.

The platform features secure authentication, dynamic product management, shopping cart functionality, cloud-based image storage, and online payment integration.

<p align="center">
  <a href="https://bazzar-6j4n.vercel.app/">
    <strong>🌐 Live Store</strong>
  </a>
  &nbsp; | &nbsp;
  <a href="https://bazzar-k52v.vercel.app/">
    <strong>⚙️ Admin Dashboard</strong>
  </a>
  &nbsp; | &nbsp;
  <a href="https://github.com/omnarayanmaurya/Bazzar">
    <strong>💻 Source Code</strong>
  </a>
</p>

---

## 🌐 Live Demo

| Application     | Description                                    | Link                                                 |
| --------------- | ---------------------------------------------- | ---------------------------------------------------- |
| Customer Store  | Browse products, manage cart, and place orders | [Visit Store](https://bazzar-6j4n.vercel.app/)       |
| Admin Dashboard | Manage products and customer orders            | [Visit Admin Panel](https://bazzar-k52v.vercel.app/) |

---

## ✨ Features

### 🛒 Customer Store

* **User Authentication:** User registration, login, and authentication using JWT.
* **Product Browsing:** Explore available products through an organized product catalogue.
* **Product Categories:** Browse products by category and subcategory.
* **Product Details:** View product descriptions, images, prices, and available sizes.
* **Shopping Cart:** Add products, select sizes, update quantities, and remove items.
* **Cart Management:** Maintain cart information using application state and browser storage.
* **Order Placement:** Place orders through the checkout process.
* **Payment Integration:** Razorpay payment gateway integration.
* **Cash on Delivery:** Support for cash-on-delivery orders.
* **Order Management:** View previously placed orders and their status.
* **Responsive Interface:** Shopping experience designed for different screen sizes.

### ⚙️ Admin Dashboard

A separate admin application provides centralized control over the e-commerce platform.

* **Admin Authentication:** Protected admin access.
* **Dashboard:** View store statistics and order information.
* **Product Management:** Add new products with multiple images.
* **Inventory Management:** View and manage existing products.
* **Product Removal:** Remove products from the catalogue.
* **Image Uploads:** Upload and store product images using Cloudinary.
* **Order Management:** View customer orders.
* **Order Status Updates:** Update order processing and delivery statuses.

---

## 🧰 Technology Stack

| Category          | Technologies               |
| ----------------- | -------------------------- |
| Frontend          | React.js, Vite, JavaScript |
| Backend           | Node.js, Express.js        |
| Database          | MongoDB, Mongoose          |
| Authentication    | JSON Web Tokens (JWT)      |
| API Communication | Axios, REST APIs           |
| Image Storage     | Cloudinary                 |
| File Uploads      | Multer                     |
| Payment Gateway   | Razorpay                   |
| Notifications     | React Toastify             |
| Deployment        | Vercel                     |
| Version Control   | Git, GitHub                |

---

## 🏗️ Application Architecture

Bazzar follows a client-server architecture with three independently deployable applications.

```text
                    BAZZAR E-COMMERCE
                           |
              +------------+------------+
              |            |            |
          CUSTOMER       ADMIN        BACKEND
          FRONTEND      FRONTEND       API
              |            |            |
              +------------+------------+
                           |
                     REST APIs
                           |
                    EXPRESS SERVER
                           |
              +------------+------------+
              |            |            |
           MongoDB      Cloudinary    Razorpay
          Database     Image Storage  Payments
```

### Application Components

* **Customer Frontend:** Handles the shopping experience and customer interactions.
* **Admin Frontend:** Provides administrative functionality for managing products and orders.
* **Backend API:** Handles authentication, business logic, database operations, image uploads, and payment processing.

---

## 📁 Project Structure

```text
Bazzar/
│
├── admin/                  # Admin dashboard (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.jsx
│   └── package.json
│
├── backend/                # Express.js backend
│   ├── config/             # Database and Cloudinary configuration
│   ├── controllers/        # Application business logic
│   ├── middleware/         # Authentication and file upload middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # REST API routes
│   ├── server.js
│   └── package.json
│
├── frontend/               # Customer-facing application
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Getting Started

Follow these steps to run Bazzar locally.

### 1. Prerequisites

Make sure you have installed:

* [Node.js](https://nodejs.org/)
* npm
* [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)
* [Cloudinary Account](https://cloudinary.com/)
* [Razorpay Account](https://razorpay.com/)

### 2. Clone the Repository

```bash
git clone https://github.com/omnarayanmaurya/Bazzar.git

cd Bazzar
```

### 3. Install Dependencies

Install dependencies separately for all three applications.

**Backend:**

```bash
cd backend
npm install
```

**Customer Frontend:**

```bash
cd ../frontend
npm install
```

**Admin Frontend:**

```bash
cd ../admin
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the backend directory.

Add the required environment variables using the names expected by your backend configuration:

```env
PORT=4000

MONGODB_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

> **Important:** Check the backend configuration files for the exact Cloudinary environment variable names. Never commit your actual `.env` file or expose API keys, passwords, or database credentials.

Configure the frontend environment variables according to your application configuration.

For the customer frontend, create `frontend/.env`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

For the admin frontend, configure its backend URL in the environment variable used by `admin/src/App.jsx`.

### 5. Run the Applications

Open three separate terminals.

**Terminal 1 — Backend:**

```bash
cd backend
npm run server
```

**Terminal 2 — Customer Frontend:**

```bash
cd frontend
npm run dev
```

**Terminal 3 — Admin Dashboard:**

```bash
cd admin
npm run dev
```

Use the local URLs displayed by Vite in your terminals to access the applications.

> If your backend package uses a different start script, use the script defined in `backend/package.json`.

---

## 🔐 Security

Bazzar uses several mechanisms to protect application functionality:

* JWT-based authentication.
* Protected admin and customer routes.
* Environment variables for sensitive configuration.
* Backend-side authentication middleware.
* Separate customer and admin applications.
* Server-side payment verification.

**Security Note:** Never expose private API keys, database credentials, JWT secrets, or payment gateway secrets in frontend code or public repositories.

---

## ☁️ Deployment

The applications are deployed on Vercel.

| Component         | Deployment |
| ----------------- | ---------- |
| Customer Frontend | Vercel     |
| Admin Frontend    | Vercel     |
| Backend API       | Vercel     |

Cloudinary handles product image storage, while MongoDB Atlas provides cloud database hosting.

For production deployment, configure all required environment variables in the corresponding Vercel project settings.

---

## 🚀 Future Enhancements

Potential improvements for future versions include:

* Product reviews and ratings.
* Wishlist functionality.
* Advanced product filtering and sorting.
* Discount coupons and promotional offers.
* Email notifications for order updates.
* Enhanced analytics and sales reports.
* Pagination for product listings.
* Improved inventory tracking.

---

## 👨‍💻 Developer

**Om Narayan Maurya**

B.Tech Computer Science & Engineering | Full-Stack Developer

* GitHub: [@omnarayanmaurya](https://github.com/omnarayanmaurya)
* LinkedIn: [Connect with me](https://www.linkedin.com/in/om-narayan-maurya-70886b308/)

---

## 📄 License

This project is developed for educational and portfolio purposes.

---

<p align="center">
  <strong>Built with ❤️ using the MERN Stack</strong>
  <br>
  <em>Bazzar — A complete online shopping experience.</em>
</p>
