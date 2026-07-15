# Prompt Engineering Log — HimShakti AI Product Description Generator

This document logs the prompt variations tested for the `/api/generate` endpoint's Gemini integration (Week 7).

## Test Product
- Name: Himalayan Millet Snacks
- Ingredients: millets, sea salt
- Weight: 150g
- Features: high protein, gluten-free
- Tone: health-focused

## Variant A — Standard copywriter framing
**Prompt:**
> You are a professional copywriter for an e-commerce food brand. Write a product description for the following item, suitable for listing on Amazon.in or Flipkart. [product details]. Write 2-3 short sentences only. Do not include a title or headings, just the description text.

**Output:**
> Nourish your body with our Himalayan Millet Snacks, a crisp and wholesome treat crafted purely from nutritious millets and a touch of sea salt. Packed with high protein and naturally gluten-free, this 150g pack is the perfect guilt-free companion for your daily health goals.

**Assessment:** Safe and readable, but leans on generic marketing phrases ("nourish your body," "guilt-free companion") that could apply to almost any snack.

## Variant B — Punchy/persuasive framing
**Prompt:**
> You are a high-converting e-commerce copywriter who writes like top Amazon bestseller listings. [product details]. Use 1-2 sentences maximum. Lead with the strongest benefit. Avoid generic phrases like "perfect for" or "great choice." Make it feel urgent and specific, not generic.

**Output:**
> Fuel your body with clean, high-protein energy from just two pure ingredients: ancient Himalayan millets and sea salt. Ditch the processed junk and claim your 150g bag of gluten-free, nutrient-dense crunch before your next midday crash hits.

**Assessment:** Most distinctive voice and highest urgency, but introduces unverified claims ("ancient") and casual language ("midday crash") that don't fit a small regional food business's brand tone or regulatory context.

## Variant C — Factual/constrained framing ✅ (chosen)
**Prompt:**
> Write a factual, no-fluff product description for an e-commerce listing. [product details]. Rules: Maximum 40 words. No marketing clichés ("guilt-free," "elevate," "journey," "perfect for"). State facts about the product, then one clear benefit. No emojis, no exclamation marks.

**Output:**
> Himalayan Millet Snacks (150g) are made with only millets and sea salt. This gluten-free snack is high in protein, which supports muscle maintenance and provides lasting energy.

**Assessment:** Best fit for HimShakti's actual context — a real food processing unit, not a hype D2C brand. States verifiable facts (ingredients, protein content) before making a benefit claim, avoids overselling, and is short enough to work directly as an e-commerce bullet/description without editing. Selected as the production prompt.

## System Prompt / Role
No separate system prompt was used — the role and constraints were included directly in the user prompt sent per request, since each generation is a single-turn call rather than a chat.