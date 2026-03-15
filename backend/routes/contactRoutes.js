const express = require("express");
const router = express.Router();
const ContactUs = require("../models/ContactUs");

// ➤ POST: Save a contact message
router.post("/", async (req, res) => {
  console.log("📩 Contact form received:", req.body);

  try {
    const entry = new ContactUs(req.body);
    const saved = await entry.save();
    console.log("✅ Contact saved:", saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Contact save error:", err);
    res.status(400).json({ error: err.message });
  }
});

// ➤ GET: Retrieve all messages (optional)
router.get("/", async (req, res) => {
  try {
    const messages = await ContactUs.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    console.error("❌ Contact fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
