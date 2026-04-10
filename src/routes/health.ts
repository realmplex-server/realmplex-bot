import express from "express";
import { container } from "@sapphire/framework";
import { TextChannel } from "discord.js";
import { list, message } from "./players";
import { playerListMessage } from "../functions/playerListMessage";

const router: express.Router = express.Router();

router.post("/", (_req, res) => {
  res.send();
});

router.post("/startup", async (_req, res) => {
  const logChannel = await container.client.channels.fetch(process.env.LOG_CHANNEL!);
  if (!logChannel || !(logChannel instanceof TextChannel)) return;

  logChannel.send({ content: "✅ **Server has started**" });
  list.forEach(() => list.pop());
  playerListMessage(list, logChannel);

  res.send();
});

router.post("/shutdown", async (_req, res) => {
  const logChannel = await container.client.channels.fetch(process.env.LOG_CHANNEL!);
  if (!logChannel || !(logChannel instanceof TextChannel)) return;

  message?.delete().catch(() => {});
  logChannel.send({ content: "❌ **Server has stopped**" });
  list.forEach(() => list.pop());

  res.send();
});

export default router;
