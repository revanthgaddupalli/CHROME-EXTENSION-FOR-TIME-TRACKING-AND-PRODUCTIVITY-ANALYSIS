const express = require("express");
const Log = require("../models/Log");

const router = express.Router();

// POST: Add or update logs for a user
router.post("/", async (req, res) => {
  const { userId, logs } = req.body;
  const userLog = await Log.findOneAndUpdate(
    { userId },
    { $push: { logs: { $each: logs } } },
    { upsert: true, new: true }
  );
  res.json(userLog);
});

// GET: Retrieve logs for a user
router.get("/", async (req, res) => {
  const { userId } = req.query;
  const userLog = await Log.findOne({ userId });
  if (!userLog) return res.status(404).json({ message: "No logs found" });
  res.json(userLog);
});

// ✅ DELETE: Remove all logs (reset)
router.delete("/", async (req, res) => {
  try {
    await Log.deleteMany({});
    res.status(200).json({ message: "All logs deleted successfully." });
  } catch (error) {
    console.error("Failed to delete logs:", error);
    res.status(500).json({ message: "Failed to delete logs." });
  }
});

module.exports = router;