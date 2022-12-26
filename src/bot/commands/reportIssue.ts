import {
  Client,
  EmbedBuilder,
  CommandInteraction,
  Guild,
  SlashCommandBuilder,
} from "discord.js"
import { log, warn, error } from "../../lib/tsabLogger"

module.exports = {
  data: new SlashCommandBuilder()
    .setName("report-bug")
    .setDescription("Report a bug about a TSAB instance")
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("What isn't working?")
        .setRequired(true)
    ),
  async execute(ctx: CommandInteraction, client: Client) {
    const reason = ctx.options.get("description")

    warn(`User Bug Report: ${reason}`, { sendWebhook: true })
    try {
      ctx.reply({
        content: `Bug Report Submitted!\n\nPlease don't harrass anyone from SDStudios or the people keeping this instance up and running.`,
        ephemeral: true,
      })
    } catch (e: any) {
      error(e, { sendWebhook: true })
    }
  },
}
