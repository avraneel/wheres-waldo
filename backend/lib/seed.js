import { prisma } from "./prisma.js";

async function seed() {
  try {
    await prisma.characters.createMany({
      data: [
        {
          name: "Waldo",
          x: 9,
          y: 4,
        },
        {
          name: "Wenda",
          x: 8,
          y: 4,
        },
        {
          name: "Odlaw",
          x: 1,
          y: 4,
        },
      ],
    });
  } catch (err) {
    console.error(err);
  }
  console.log("seeded successfully");
}

seed();
