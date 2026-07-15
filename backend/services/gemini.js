const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize once, using your API key from .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateProductDescription({ productName, ingredients, weight, features, tone }) {
  // "gemini-2.5-flash" = fast + free-tier friendly, good enough for this task
  const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

  // This is the PROMPT — the exact instructions the model sees.
  // Notice: role + task + specifics + constraints, like we just discussed.

  //Valiant - A
//   const prompt = `You are a professional copywriter for an e-commerce food brand.
// Write a product description for the following item, suitable for listing on Amazon.in or Flipkart.

// Product name: ${productName}
// Ingredients: ${ingredients || "not specified"}
// Weight: ${weight || "not specified"}
// Key features: ${features || "not specified"}
// Tone: ${tone || "premium"}

// Write 2-3 short sentences only. Do not include a title or headings, just the description text.`;


  //Valiant - B
//   const prompt = `You are a high-converting e-commerce copywriter who writes like top Amazon bestseller listings.
// Write a short, punchy product description for:

// Product name: ${productName}
// Ingredients: ${ingredients || "not specified"}
// Weight: ${weight || "not specified"}
// Key features: ${features || "not specified"}
// Tone: ${tone || "premium"}

// Use 1-2 sentences maximum. Lead with the strongest benefit. Avoid generic phrases like "perfect for" or "great choice." Make it feel urgent and specific, not generic.`;




//valiant - C
const prompt = `Write a factual, no-fluff product description for an e-commerce listing.

Product: ${productName}
Ingredients: ${ingredients || "not specified"}
Weight: ${weight || "not specified"}
Features: ${features || "not specified"}
Tone: ${tone || "premium"}

Rules:
- Maximum 40 words.
- No marketing clichés ("guilt-free," "elevate," "journey," "perfect for").
- State facts about the product, then one clear benefit.
- No emojis, no exclamation marks.`;






  // This line actually sends the prompt to Google's servers and waits for a reply
  const result = await model.generateContent(prompt);

  // The response comes back wrapped in an object — .response.text() extracts the plain string
  const text = result.response.text();

  return text;
}

module.exports = generateProductDescription;