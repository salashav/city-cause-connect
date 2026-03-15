const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  
  // ✅ FIXED: enum removed — now category can come from MongoDB master list
  category: { 
    type: String,
    required: true 
  },
  
  description: { type: String, required: true },
  location: { type: String, required: true },
  
  // Urgency enum values (kept as-is)
  urgency: { 
    type: String, 
    enum: ["low", "medium", "high"], 
    default: "medium" 
  },
  
  // Status enum (kept as-is)
  status: { 
    type: String, 
    enum: ["reported", "in progress", "resolved"],
    default: "reported" 
  },

  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Report", reportSchema);
