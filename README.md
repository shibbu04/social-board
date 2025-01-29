# 🖼️ SocialBoard - Image Sharing Platform

A modern, responsive social media platform for sharing images and connecting with others. Built with React, Node.js, and MongoDB.

## 👨‍💻 Live Project Link

[Click here](https://social-board.vercel.app/)

## ✨ Features

- 🔐 User authentication and authorization
- 📸 Image upload and sharing
- 👥 User profiles and social handles
- 🎨 Theme customization (Light/Green)
- 👑 Admin dashboard for user management
- 📱 Responsive design for all devices
- 🔄 Real-time updates
- 🎯 Role-based access control

## 🛠️ Tech Stack

### Frontend
- ⚛️ React
- 🎨 Tailwind CSS
- 📦 Zustand (State Management)
- 🔄 React Router
- 📝 React Hook Form
- ✅ Zod (Form Validation)
- 🎯 TypeScript
- 🚀 Vite

### Backend
- 🟢 Node.js
- 🚂 Express.js
- 🗄️ MongoDB
- 🔑 JWT Authentication
- 📁 Multer (File Upload)
- 🛡️ bcrypt.js

## 🚀 Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/social-board.git
cd social-board
```

2. Install dependencies for both frontend and backend
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

3. Set up environment variables
```bash
# In backend folder, create .env file
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=admin@admin.com
ADMIN_PASSWORD=admin123
```

## 🏃‍♂️ Running the Project

1. Start the backend server
```bash
# In backend folder
npm start
```

2. Start the frontend development server
```bash
# In root folder
npm run dev
```

## 📁 Project Structure

```
socialboard/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Page components
│   ├── store/          # Zustand store configurations
│   ├── lib/            # Utility functions and configurations
│   └── types/          # TypeScript type definitions
├── backend/
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   └── utils/        # Utility functions
│   └── uploads/        # Uploaded images storage
└── public/            # Static assets
```

## 🔒 Authentication

- Register with email and password
- Login with credentials
- JWT-based authentication
- Protected routes
- Role-based access (User, Admin, Superadmin)

## 👥 User Roles

- **User**: Can create, edit, and delete their own posts
- **Admin**: Can manage users and all posts
- **Superadmin**: Has full system access

## 🎨 Themes

- Light theme (Default)
- Green theme
- Persistent theme selection

## 👨‍💻 Developed By

[Shivam Singh](https://github.com/shibbu04/)

### 🔗 Connect with me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/shivamsingh57680/)
[![Portfolio](https://img.shields.io/badge/portfolio-%231DA1F2.svg?logo=Twitter&logoColor=white)](https://shivam04.tech/)
[![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)](https://github.com/shibbu04/)


Developed by Shivam ❣️