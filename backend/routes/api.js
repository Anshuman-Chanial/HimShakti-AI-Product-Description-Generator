// routes/api.js
// All 6 API endpoints live here, organized using Express's "Router"

const express = require("express");
const router = express.Router();
const { products, history, getNextHistoryId } = require("../data/store");

// 1. GET /api/products — list all products
router.get("/products", (req, res) => {
  res.status(200).json(products);
});

// 2. GET /api/products/:id — get one specific product
router.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.status(200).json(product);
});

// 3. POST /api/generate — generate a description (fake/template version for now)
router.post("/generate", (req, res) => {
  const { productName, ingredients, weight, features, tone } = req.body;

  if (!productName) {
    return res.status(400).json({ error: "productName is required" });
  }

  // Fake generated text — real Gemini API call comes in Week 7
  const generatedText = `${productName} — crafted with ${ingredients || "premium natural ingredients"}, ${weight || ""}. ${features || ""} A ${tone || "premium"} choice for conscious buyers.`;

  const newEntry = {
    id: getNextHistoryId(),
    productName,
    generatedText,
    tone: tone || "premium",
    createdAt: new Date().toISOString(),
  };

  history.push(newEntry);

  res.status(201).json(newEntry);
});

// 4. GET /api/history — list all past generations
router.get("/history", (req, res) => {
  res.status(200).json(history);
});

// 5. DELETE /api/history/:id — delete one saved generation
router.delete("/history/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = history.findIndex((h) => h.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "History entry not found" });
  }

  history.splice(index, 1);
  res.status(204).send();
});

// 6. GET /api/history/search?q=... — search history by product name
router.get("/history/search", (req, res) => {
  const query = (req.query.q || "").toLowerCase();
  const results = history.filter((h) =>
    h.productName.toLowerCase().includes(query)
  );

  res.status(200).json(results);
});

module.exports = router;