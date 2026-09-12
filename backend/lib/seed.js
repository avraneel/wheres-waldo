import { prisma } from "./prisma";

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
