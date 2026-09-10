import { prisma } from "./prisma";

const character = await prisma.character.create({
  data: {
    name: "Waldo",
    x: 
    y: ,
  },
});
