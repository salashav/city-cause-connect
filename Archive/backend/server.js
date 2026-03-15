const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

console.log("🚀 Starting backend server...");
const app = express();

// ---------------------------------------------------
// ⭐ CORS - if youre making a local to local call - it is allowing - cause by default computers are enabling to block 
// ---------------------------------------------------
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ---------------------------------------------------
// ⭐ BODY PARSER
// ---------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------------------------------------
// ⭐ LOGGER - print the status of program 
// ---------------------------------------------------
app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.url}`);
  next();
});

// ---------------------------------------------------
// ⭐ MONGODB CONNECTION
// ---------------------------------------------------
const MONGO_URI = "mongodb://localhost:27017/mycitydb";

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ---------------------------------------------------
// ⭐ REPORT ROUTES - server - police - routes the request 
// ---------------------------------------------------
const reportRoutes = require("./routes/reportRoutes");
app.use("/api/reports", reportRoutes);

// CONTACTUS ROUTES
const contactRoutes = require("./routes/contactRoutes");
app.use("/api/contact", contactRoutes);

// FEEDBACK ROUTES
const feedbackRoutes = require("./routes/feedbackRoutes");
app.use("/api/feedback", feedbackRoutes);

// SERVICE CATEGORIES ROUTES (NEW)
const serviceCategoryRoutes = require("./routes/serviceCategoryRoutes");
app.use("/api/service-categories", serviceCategoryRoutes);



// ---------------------------------------------------
// ⭐ CATEGORY MASTER LIST API
// ---------------------------------------------------
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
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    console.error("❌ Category error:", err);
    res.status(500).json({ error: "Unable to load categories" });
  }
});

// ---------------------------------------------------
// ⭐ FRONTEND (React Build)
// ---------------------------------------------------
const buildPath = path.join(__dirname, "..", "frontend", "build");
app.use(express.static(buildPath));

app.use((req, res, next) => {
  if (req.url.startsWith("/api")) return next();
  res.sendFile(path.join(buildPath, "index.html"));
});

// ---------------------------------------------------
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
