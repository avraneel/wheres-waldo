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

    // why this format? look here: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#event_stream_format
    res.write(`data: ${minutesDisplayed} : ${secondsDisplayed}\n\n`);
  }, 1000);
});

routes.post("/leaderboard", async (req, res) => {
  const name = req.body.name;
  const [mins, seconds] = req.body.time.split(" : ");
  await prisma.leaderboard.create({
    data: {
      name,
      mins: Number(mins),
      seconds: Number(seconds),
    },
  });
  res.status(201).json({ message: "done" });
});

routes.get("/leaderboard", async (_req, res) => {
  const leaderboard =
    await prisma.$queryRaw`select * from "Leaderboard" order by mins, seconds`;
  res.status(200).json(leaderboard);
});

export default routes;
