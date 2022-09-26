import { config } from "../../data/config"
import {Message, Client, EmbedBuilder, Guild, Role, CommandInteraction, SlashCommandBuilder} from "discord.js"

module.exports = {
  // name: "info",
  // description: "Provides info about the bot",
  // minArgs: 0,
  // maxArgs: 0,
  // category: 'Utility',
  // slash: true,
  data: new SlashCommandBuilder()
      .setName('info')
      .setDescription('Info about TSAB'),
  async execute(ctx: CommandInteraction, client: Client) {
    const linkedServer = client.guilds.cache.get(
      config.discord.serverId
    ) as Guild;

    const staffRole = linkedServer.roles.cache.get(
      config.discord.staffRole
    ) as Role;

    const dateStamp = Number(client.uptime);

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
          value: `${new Date(dateStamp).toISOString().slice(11, 19)}\nResets every 24hrs`,
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
          value: `<@&${staffRole.id}>`,
          inline: true,
        },
        {
          name: "<:log_channel:1010103780764811319> Log Channel",
          value: `<#${config.discord.logChannel}>`,
          inline: true,
        },
          {
            name: `<:primary_owner:1010261201013440585> Primary Bot Owner`,
            value: `<@${config.discord.botOwners[0]}>`,
            inline: true
          },
          {
              name: `<:docs:1010676727078473842> Docs`,
              value: 'https://tsab-docs.summerdev.tk',
              inline: true
          }
      )

    await ctx.reply({embeds: [embed], ephemeral: true})
  },
}
