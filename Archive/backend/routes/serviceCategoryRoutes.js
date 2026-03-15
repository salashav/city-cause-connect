const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// -------------------------------
// ⭐ SCHEMA + MODEL
// -------------------------------
const ServiceCategorySchema = new mongoose.Schema({
  key: { type: String, required: true },
  label: { type: String, required: true },
  icon: { type: String, default: "📌" },
  description: { type: String, default: "" },
});

// Connect to existing MongoDB collection
const ServiceCategory = mongoose.model(
  "ServiceCategory",
  ServiceCategorySchema,
  "mycity_issue_category_masterlist" // <— Actual collection name
);

// -------------------------------
// ⭐ API: GET /api/service-categories
// -------------------------------
router.get("/", async (req, res) => {
  try {
    const categories = await ServiceCategory.find({});

    // Format results for frontend
    const formatted = categories.map((cat) => ({
      key: cat.key,
      title: cat.label,
      icon: cat.icon || "📌",
      description:
        cat.description ||
        `Report issues related to ${cat.label.toLowerCase()}.`,
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error("❌ Error fetching service categories:", err.message);
    res.status(500).json({
      error: "Unable to load service categories",
      details: err.message,
    });
  }
});

// -------------------------------
module.exports = router;
