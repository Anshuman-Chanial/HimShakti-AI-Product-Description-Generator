const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany();
  await prisma.product.createMany({
    data: [
      { title: "Himalayan Millet Snack", description: "Crispy, nutritious snacks made from high-altitude millets grown in Uttarakhand. Rich in protein and fiber." },
      { title: "Traditional Fruit Pickle", description: "Artisanal fruit pickles made from locally sourced Himalayan produce using age-old family recipes." },
      { title: "Mountain Berry Juice", description: "Cold-pressed juices from wild Himalayan berries, packed with antioxidants and natural goodness." },
    ],
  });
  console.log("Seeded 3 products");
}

main().finally(() => prisma.$disconnect());