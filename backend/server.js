// server.js
// This is the entry point — running this file starts your entire backend server

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware — runs on EVERY request, before reaching your actual routes
app.use(cors());              // allows frontend (port 3000) to talk to this backend
app.use(express.json());      // lets Express understand JSON sent in request bodies

// Mount all your /api routes
app.use("/api", apiRoutes);

// Basic error handling middleware — catches anything that crashes unexpectedly
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong on the server" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});