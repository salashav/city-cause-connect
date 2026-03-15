const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

console.log("🚀 Starting backend server...");
const app = express();

// ----------------------------------------------
// CORS
// ----------------------------------------------
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ----------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.url}`);
  next();
});

// ----------------------------------------------
// MONGO DB
// ----------------------------------------------
mongoose
  .connect("mongodb://localhost:27017/mycitydb")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ----------------------------------------------
// ROUTES
// ----------------------------------------------
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const reportRoutes = require("./routes/reportRoutes");
app.use("/api/reports", reportRoutes);

const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contact", contactRoutes);

const feedbackRoutes = require("./routes/feedbackRoutes");
app.use("/api/feedback", feedbackRoutes);

// ⭐ FIXED: Ensure this file exists inside /routes folder
const serviceCategoryRoutes = require("./routes/serviceCategoryRoutes");
app.use("/api/service-categories", serviceCategoryRoutes);

// ----------------------------------------------
// CATEGORY MASTER LIST (OLD CATEGORY API)
// ----------------------------------------------
const CategorySchema = new mongoose.Schema({
  key: String,
  label: String,
});

const Category = mongoose.model(
  "mycity_issue_category_masterlist",
  CategorySchema,
  "mycity_issue_category_masterlist"
);

app.get("/api/categories", async (req, res) => {
  try {
    const cat = await Category.find();
    res.json(cat);
  } catch (err) {
    res.status(500).json({ error: "Unable to load categories" });
  }
});

// ----------------------------------------------
// PRODUCTION BUILD
// ----------------------------------------------
const buildPath = path.join(__dirname, "..", "frontend", "build");
app.use(express.static(buildPath));

app.use((req, res, next) => {
  if (req.url.startsWith("/api")) return next();
  res.sendFile(path.join(buildPath, "index.html"));
});

// ----------------------------------------------
const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Running at http://localhost:${PORT}`));
