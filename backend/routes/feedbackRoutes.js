const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// ➤ POST: Submit feedback - submitted values from the server gets routed to this 
router.post("/", async (req, res) => {
  console.log("📩 Feedback received:", req.body);

  try {
    //mapping user submitted values to a model - feedback model - feedback model defines a structure and everything is saved in that format 
    //frontend -> server.js (api ) -> Routes -> invokes model (format) -> stored in Mongo 
    const entry = new Feedback(req.body);
    const saved = await entry.save();

    console.log("✅ Feedback saved:", saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Feedback save error:", err);
    res.status(400).json({ error: err.message });
  }
});

// ➤ GET: Get all feedback (optional)
router.get("/", async (req, res) => {
  try {
    const allFeedback = await Feedback.find().sort({ date: -1 });
    res.json(allFeedback);
  } catch (err) {
    console.error("❌ Feedback fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
