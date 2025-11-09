const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug: Check if environment variables are loaded
console.log("🔍 Environment Check:");
console.log("PORT:", process.env.PORT);
console.log(
  "MONGODB_URI:",
  process.env.MONGODB_URI ? "✅ Loaded" : "❌ Missing"
);
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "✅ Loaded" : "❌ Missing");

// MongoDB Connection with better error handling
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/dsa-sheet";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    console.log("\n💡 Troubleshooting:");
    console.log("1. Make sure MongoDB is running: mongod");
    console.log("2. Check .env file exists in server folder");
    console.log("3. Verify MONGODB_URI in .env file");
  });

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/topics", require("./routes/topics"));
app.use("/api/progress", require("./routes/progress"));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "🚀 DSA Sheet API is running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
