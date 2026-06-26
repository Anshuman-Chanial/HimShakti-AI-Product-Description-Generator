// data/store.js
// In-memory data — acts as our temporary "database" for this week.
// Real database (Supabase/PostgreSQL) comes in Week 5.

// Sample HimShakti products — same ones currently hardcoded in your frontend
let products = [
  {
    id: 1,
    title: "Himalayan Millet Snack",
    description: "Crispy, nutritious snacks made from high-altitude millets grown in Uttarakhand. Rich in protein and fiber.",
  },
  {
    id: 2,
    title: "Traditional Fruit Pickle",
    description: "Artisanal fruit pickles made from locally sourced Himalayan produce using age-old family recipes.",
  },
  {
    id: 3,
    title: "Mountain Berry Juice",
    description: "Cold-pressed juices from wild Himalayan berries, packed with antioxidants and natural goodness.",
  },
];

// History of generated descriptions — starts empty, fills up as users generate
let history = [];

// nextHistoryId just keeps track of the next unique ID to assign
let nextHistoryId = 1;

module.exports = { products, history, getNextHistoryId: () => nextHistoryId++ };