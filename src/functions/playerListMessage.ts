import { ContainerBuilder, EmbedBuilder, MessageFlags, TextChannel } from "discord.js";

export async function playerUpdateMessage(username: string, channel: TextChannel, joined: Number) {
  const embed = new EmbedBuilder() //
    .setColor(joined ? 0x64c864 : 0xc86464)
    .setAuthor({
      name: `${username} ${joined ? "joined" : "left"} the game`,
      iconURL: `https://crafthead.net/helm/${username}`,
    });

  return await channel.send({
    embeds: [embed],
  });
}

export async function playerListMessage(list: string[], channel: TextChannel) {
  let playerList = "";
  if (list.length === 0) playerList = "*No players online*";
  list.sort();
  list.forEach((username) => {
    playerList += `- [${username}](https://namemc.com/profile/${username})\n`;
  });

  const listContainer = new ContainerBuilder() //
    .setAccentColor(0x64c864)
    .addTextDisplayComponents(
      (textDisplay) => textDisplay.setContent(`### Player List`),
      (textDisplay) => textDisplay.setContent(`**${list.length}/20** players online`),
      (textDisplay) => textDisplay.setContent(playerList),
    );

  return await channel.send({
    components: [listContainer],
    flags: MessageFlags.IsComponentsV2,
  });
}
