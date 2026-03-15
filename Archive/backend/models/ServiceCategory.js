const mongoose = require("mongoose");

const ServiceCategorySchema = new mongoose.Schema({
  key: String,
  label: String,
  icon: String,
  description: String,
});

module.exports = mongoose.model(
  "ServiceCategory",
  ServiceCategorySchema,
  "mycity_issue_category_masterlist"
);
