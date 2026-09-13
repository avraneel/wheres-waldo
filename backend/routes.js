import { Router } from "express";
import { prisma } from "./lib/prisma.js";

const routes = Router();

routes.post("/", async (req, res) => {
  const name = req.body.name;
  const userX = Number(req.body.x);
  const userY = Number(req.body.y);
  const { x, y } = await prisma.characters.findFirst({
    where: {
      name: name,
    },
  });
  if (userX === x && userY === y) {
    res.status(200).json({ found: true });
  } else {
    res.status(200).json({ found: false });
  }
});

export default routes;
