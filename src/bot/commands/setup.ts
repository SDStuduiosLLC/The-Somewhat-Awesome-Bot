import { Message, Client, EmbedBuilder, Guild, TextChannel } from "discord.js"
import * as config from "../../../data/config"

module.exports = {
  name: "setup",
  description:
    "Runs some background checks and makes sure all settings are correct.",
  minArgs: 0,
  maxArgs: 0,
  commandPattern: "setup",
  category: "Utility",
  async execute(msg: Message, args: Array<string>, client: Client) {
    const guild = client.guilds.cache.get(
      config.config.discord.serverId
    ) as Guild
    const logChannel = guild.channels.cache.get(
      config.config.discord.logChannel
    ) as TextChannel

    /** Bot Admin Self Check */

    if (
      // @ts-ignore
      guild.members.cache.get(client.user.id).permissions.has("Administrator")
    ) {
      const embed1 = new EmbedBuilder()
        .setTitle("Safety Warning!")
        .setDescription(config.config.responses.botHasAdmin)
        .setColor("Red")
        .setTimestamp(Date.now())
        .setFooter({ text: "Automated System Check" })

      await msg.reply({ embeds: [embed1] })
      return await logChannel.send({ embeds: [embed1] })
    }
  },
}
