const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB.js");
const authRoutes = require("./routes/authRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const testRoutes = require("./routes/testRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Make sure the DB is connected before any request is handled
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ message: "Database connection failed" });
  }
});

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "GATE/UGC NET Practice Platform API" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/users", userRoutes);

// Vercel runs this as a serverless function, so only listen when running locally
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
