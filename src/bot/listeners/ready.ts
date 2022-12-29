import {
  ActivityType,
  Client,
  EmbedBuilder,
  Role,
  TextChannel,
} from "discord.js"

import { config } from "../../../data/config"
import {
  checkForInfo,
  disclaimerCheck,
  webhookReporter,
} from "../../lib/utilities"
import mongoose from "mongoose"
import { QuickDB } from "quick.db"
import Statcord from "statcord.js"
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v10"

import { debug, log, error } from "../../lib/tsabLogger"

const db = new QuickDB()
const sysInternals = db.table("sysInt")
const rest = new REST({ version: "10" }).setToken(config.discord.token)

export default (client: Client, statcord: Statcord.Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return
    }

    await disclaimerCheck(db, sysInternals)

    await checkForInfo()
    // statcord.autopost()

    log(`${client.user.tag} connected to Discord Gateway successfully`)

    const guild = client.guilds.cache.get(config.discord.serverId)
    const logChannel = guild?.channels.cache.get(
      config.discord.logChannel
    ) as TextChannel
    const staffRole = guild?.roles.cache.get(config.discord.staffRole) as Role

    // Log config info
    debug(`Set guild to ${guild?.name} (${guild?.id})`)
    debug(`Set log channel to #${logChannel.name} (${logChannel.id})`)
    debug(`Set staff role to @${staffRole.name} (${staffRole.id})`)

    const statusText = "the suffering of humanity"
    client.user.setActivity(statusText, { type: ActivityType.Watching })
    debug(`Set custom status to ${statusText}`, { sendWebhook: true })

    const logEmbed1 = new EmbedBuilder()
      .setTitle("Status Log")
      .setDescription(
        "<a:success_tick:1005196730461073550> Bot successfully (re)booted!"
      )
      .addFields(
        { name: "Linked Server", value: `${guild?.name}`, inline: true },
        { name: "Log Channel", value: `<#${logChannel.id}>`, inline: true },
        { name: "Staff Role", value: `<@&${staffRole.id}>`, inline: true }
      )
      .setTimestamp()

    // @ts-ignore
    await logChannel?.send({ embeds: [logEmbed1] })

    await webhookReporter(
      "info",
      "Util module loaded correctly and successfully."
    )

    // This is just used to make sure I haven't totally messed up - and for reference w/out docs
    // Might remove on MS1, I'll see
    try {
      await rest.post(Routes.channelMessages(config.discord.logChannel), {
        body: {
          content: "Checking API connection.. OK",
        },
      })
    } catch (e: any) {
      error(`\`${e}\``, { sendWebhook: true })
    }

    mongoose
      .connect(config.mongo.connectionUri, {
        keepAlive: true,
      })
      .then(() => {
        log("Connected to MongoDB database...")
      })
      .catch((e) => {
        error(`DB Error: ${e}`)
      })

    try {
      debug("Linking commands...")
      // linkCommandsOld(client);
    } catch (e) {
      error("Error linking commands, exiting...")
      process.abort()
    }
  })
}
