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

routes.get("/time", (_req, res) => {
  const start = Date.now();
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  setInterval(() => {
    const seconds = ~~((Date.now() - start) / 1000);
    const secondsDisplayed = ("00" + (seconds % 60)).slice(-2);
    const minutes = ~~(seconds / 60);
    const minutesDisplayed = ("00" + (minutes % 60)).slice(-2);
    // const body = { min: minutesDisplayed, sec: secondsDisplayed };
    res.write(`${minutesDisplayed} : ${secondsDisplayed}`);
  }, 1000);
});

export default routes;
