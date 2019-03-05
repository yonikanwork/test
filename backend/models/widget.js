const mongoose = require("mongoose");

const widgetSchema = mongoose.Schema({
  title: { type: String, required: true },
});

module.exports = mongoose.model("Widget", widgetSchema);