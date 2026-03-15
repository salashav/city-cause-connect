const express = require("express");
const router = express.Router();
const Report = require("../models/Report");

// Create a new report
router.post("/", async (req, res) => {
  console.log("📩 Received POST request");
  console.log("Request body:", req.body);

  try {
    // Create and save the report
    const newReport = new Report(req.body);
    const saved = await newReport.save();

    console.log("✅ Report saved:", saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error saving report:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Get all reports
router.get("/", async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    console.error("❌ Error fetching reports:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
