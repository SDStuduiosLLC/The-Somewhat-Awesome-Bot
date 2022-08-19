import { config } from "../../data/config"
import { Embed, Message, Client, EmbedBuilder, Guild, Role } from "discord.js"

module.exports = {
  name: "info",
  description: "Provides info about the bot",
  async execute(msg: Message, args: Array<string>, client: Client) {
    const linkedServer = client.guilds.cache.get(
      config.discord.serverId
    ) as Guild

    const staffRole = linkedServer.roles.cache.get(
      config.discord.staffRole
    ) as Role

    const embed = new EmbedBuilder()
      .setTitle(`Bot Info`)
      .setAuthor({
        name: client.user?.tag as string,
        iconURL: `${client.user?.avatarURL()}`,
      })
      .setDescription(
        `TSAB is an opensource, customisable bot made and developed by SummerDev Studios.`
      )
      .addFields(
        {
          name: " <:uptime:1010103785747660800> Uptime",
          value: `${client.uptime}`,
          inline: true,
        },
        {
          name: "<:linked_server:1010103784162197504> Linked Server",
          value: `${linkedServer.name}`,
          inline: true,
        },
        // { name: "‍", value: "‍", inline: true },
        {
          name: "<:staff_role:1010103782505447515> Staff Role",
          value: `<@${staffRole.id}>`,
          inline: true,
        },
        {
          name: "<:log_channel:1010103780764811319> Log Channel",
          value: `<#${config.discord.logChannel}>`,
          inline: true,
        }
      )

    msg.reply({ embeds: [embed] })
  },
}
