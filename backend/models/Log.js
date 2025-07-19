const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  userId: { type: String, index: true },
  logs: [{ url: String, timeSpent: Number, date: Date }],
});

module.exports = mongoose.model("Log", logSchema);