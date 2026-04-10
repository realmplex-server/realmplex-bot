import express from "express";
import { container } from "@sapphire/framework";
import Players from "../interfaces";
import { Message, TextChannel } from "discord.js";
import { playerListMessage, playerUpdateMessage } from "../functions/playerListMessage";

const router: express.Router = express.Router();
export let message: Message<true> | null = null;

enum Actions {
  Leave,
  Join,
}

export let list: string[] = [];

router.get("/", (_req, res) => {
  res.send(list);
});

router.post("/", (req, res) => {
  const playerList: Players = JSON.parse(req.body);
  list = playerList.players;
  res.send();
});

router.put("/:username", async (req, res) => {
  const username = req.params.username;

  list.push(username);
  const logChannel = await container.client.channels.fetch(process.env.LOG_CHANNEL!);
  if (!logChannel || !(logChannel instanceof TextChannel)) return;

  playerUpdateMessage(username, logChannel, Actions.Join);

  if (message) message.delete().catch(() => {});
  message = await playerListMessage(list, logChannel);

  res.send();
});

router.delete("/:username", async (req, res) => {
  const username = req.params.username;

  list.splice(list.indexOf(username), 1);
  const logChannel = await container.client.channels.fetch(process.env.LOG_CHANNEL!);
  if (!logChannel || !(logChannel instanceof TextChannel)) return;

  playerUpdateMessage(username, logChannel, Actions.Leave);

  if (message) message.delete().catch(() => {});
  message = await playerListMessage(list, logChannel);

  res.send();
});

export default router;
