// routes/api.js
// All 6 API endpoints live here, organized using Express's "Router"

const express = require("express");
const router = express.Router();
// const { products, history, getNextHistoryId } = require("../data/store");
const prisma = require("../lib/prisma");

// 1. GET /api/products — list all products
// router.get("/products", (req, res) => {
//   res.status(200).json(products);
// });
router.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.status(200).json(products);
});

// 2. GET /api/products/:id — get one specific product
// router.get("/products/:id", (req, res) => {..

//   const id = parseInt(req.params.id);
//   const product = products.find((p) => p.id === id);

//   if (!product) {
//     return res.status(404).json({ error: "Product not found" });
//   }

//   res.status(200).json(product);
// });
router.get("/products/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.status(200).json(product);
});


// 3. POST /api/generate — generate a description (fake/template version for now)
// router.post("/generate", (req, res) => {
//   const { productName, ingredients, weight, features, tone } = req.body;

//   if (!productName) {
//     return res.status(400).json({ error: "productName is required" });
//   }

//   // Fake generated text — real Gemini API call comes in Week 7
//   const generatedText = `${productName} — crafted with ${ingredients || "premium natural ingredients"}, ${weight || ""}. ${features || ""} A ${tone || "premium"} choice for conscious buyers.`;

//   const newEntry = {
//     id: getNextHistoryId(),
//     productName,
//     generatedText,
//     tone: tone || "premium",
//     createdAt: new Date().toISOString(),
//   };

//   history.push(newEntry);

//   res.status(201).json(newEntry);
// });
router.post("/generate", async (req, res) => {
  const { productName, ingredients, weight, features, tone } = req.body;

  if (!productName) {
    return res.status(400).json({ error: "productName is required" });
  }

  const generatedText = `${productName} — crafted with ${ingredients || "premium natural ingredients"}, ${weight || ""}. ${features || ""} A ${tone || "premium"} choice for conscious buyers.`;

  const newEntry = await prisma.generationHistory.create({
    data: {
      productName,
      generatedText,
      tone: tone || "premium",
    },
  });

  res.status(201).json(newEntry);
});


// 4. GET /api/history — list all past generations
// router.get("/history", (req, res) => {
//   res.status(200).json(history);
// });
router.get("/history", async (req, res) => {
  const history = await prisma.generationHistory.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.status(200).json(history);
});






// PUT /api/history/:id — update a saved generation's tone
router.put("/history/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { tone } = req.body;

  try {
    const updated = await prisma.generationHistory.update({
      where: { id },
      data: { tone },
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(404).json({ error: "History entry not found" });
  }
});





// 5. DELETE /api/history/:id — delete one saved generation
// router.delete("/history/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = history.findIndex((h) => h.id === id);

//   if (index === -1) {
//     return res.status(404).json({ error: "History entry not found" });
//   }

//   history.splice(index, 1);
//   res.status(204).send();
// });
router.delete("/history/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.generationHistory.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "History entry not found" });
  }
});


// 6. GET /api/history/search?q=... — search history by product name
// router.get("/history/search", (req, res) => {
//   const query = (req.query.q || "").toLowerCase();
//   const results = history.filter((h) =>
//     h.productName.toLowerCase().includes(query)
//   );

//   res.status(200).json(results);
// });
router.get("/history/search", async (req, res) => {
  const query = req.query.q || "";
  const results = await prisma.generationHistory.findMany({
    where: {
      productName: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  res.status(200).json(results);
});

module.exports = router;