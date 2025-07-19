const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const logRoutes = require("./routes/logs");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use("/api/logs", logRoutes);

// Serve the dashboard files
const dashboardPath = path.join(__dirname, "../dashboard");
app.use("/analytics-dashboard", express.static(dashboardPath));
app.get("/ping", (req, res) => res.send("pong"));
app.listen(3000, () => console.log("🚀 Server running on port 3000"));