const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: String, required: true },
  message: { type: String, required: true },
  
});

module.exports = mongoose.model(
  "Feedback",
  feedbackSchema,
  "feedback"        // 👉 Collection name
);
