const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const ServiceCategorySchema = new mongoose.Schema({
  key: String,
  title: String,
  description: String
});

const ServiceCategory = mongoose.model(
  "dynamicComponents",
  ServiceCategorySchema,
  "dynamicComponents"
);

router.get("/", async (req, res) => {
  try {
    const categories = await ServiceCategory.find({});
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to load service categories" });
  }
});

module.exports = router;
