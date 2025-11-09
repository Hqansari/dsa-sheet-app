# 🚀 DSA Mastery - Full Stack Learning Platform

A comprehensive Data Structures & Algorithms learning platform built with the MERN stack. Track your progress, access curated resources, and prepare for coding interviews.

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based user authentication
- 📊 **Progress Tracking** - Track completed problems and overall progress
- 🎯 **Topic-wise Organization** - Problems organized by DSA topics
- 📚 **Curated Resources** - YouTube tutorials, LeetCode links, and articles
- 🎨 **Modern UI** - Beautiful glassmorphism design with smooth animations
- 📱 **Fully Responsive** - Works seamlessly on all devices
- ☁️ **Cloud Database** - MongoDB Atlas for reliable data storage

## 🛠️ Tech Stack

**Frontend:**

- React.js
- Tailwind CSS
- Lucide Icons
- React Router
- Axios

**Backend:**

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt

## 📁 Project Structure

```
dsa-sheet-app/
├── client/                 # Frontend React application
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context API
│   │   ├── utils/         # Utility functions
│   │   ├── styles/        # CSS files
│   │   └── hooks/         # Custom React hooks
│   └── package.json
│
└── server/                # Backend Node.js application
    ├── models/           # Mongoose schemas
    ├── routes/           # API routes
    ├── middleware/       # Custom middleware
    ├── server.js         # Entry point
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/dsa-sheet-app.git
cd dsa-sheet-app
```

2. **Setup Backend**

```bash
cd server
npm install

# Create .env file
echo "PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development" > .env

# Seed database with sample data
npm run seed

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

3. **Setup Frontend**

```bash
cd ../client
npm install

# Start frontend
npm start
```

Frontend will run on `http://localhost:3000`

## 📝 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🎯 Features Overview

### Authentication

- Secure user registration and login
- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes

### Dashboard

- Overall progress statistics
- Topics completed count
- Current learning streak
- Search functionality

### Topic Details

- Problem list with difficulty levels
- Progress tracking per topic
- Filter problems by difficulty
- Direct links to resources

### Problem Cards

- Checkbox to mark completion
- Difficulty indicators (Easy/Medium/Hard)
- Tags for problem categories
- External resource links (YouTube, LeetCode, Articles)

## 📱 Screenshots

### Login Page

Beautiful gradient background with glassmorphism effects

### Dashboard

Stats cards, progress tracking, and topic cards

### Topic Detail

Filterable problem list with completion tracking

## 🌐 Deployment

### Backend (AWS EC2)

```bash
# On EC2 instance
git clone https://github.com/YOUR_USERNAME/dsa-sheet-app.git
cd dsa-sheet-app/server
npm install
pm2 start server.js --name "dsa-backend"
```

### Frontend (AWS S3 + CloudFront)

```bash
npm run build
# Upload build folder to S3
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Husna Qasim**

- GitHub: [@hqansari](https://github.com/hqansari)

## 🙏 Acknowledgments

- MongoDB Atlas for cloud database
- Lucide for beautiful icons
- Tailwind CSS for styling utilities

---

**Made with ❤️ for aspiring developers**
