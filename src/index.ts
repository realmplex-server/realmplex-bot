import { LogLevel, SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";
import app from "./routes/index";

const client = new SapphireClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  logger: {
    level: process.env.NODE_ENV === "development" ? LogLevel.Debug : LogLevel.Info,
  },
});

client.login(process.env.DISCORD_TOKEN);
app.listen(process.env.API_PORT, () => {
  client.logger.info("Server is listening on port 3000");
});
