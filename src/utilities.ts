import {config} from "../data/config";
import {createSimpleLogger} from "simple-node-logger";
import {QuickDB} from "quick.db";
import {EmbedBuilder, WebhookClient} from "discord.js";

const log = createSimpleLogger("./data/mcb.log");
const db = new QuickDB();

export function checkForInfo() {
  if (!config.discord.serverId) {
    log.error("No server specified, exit to prevent further errors...");
    process.exit();
  } else if (!config.discord.logChannel) {
    log.error("No log channel, exit to prevent further errors...");
    process.exit();
  } else if (!config.discord.staffRole) {
    log.error("No staff role, exit to prevent further errors...");
    process.exit();
  } else {
    log.debug("All checks passed, starting bot..");
  }
}

export function checkForOwner(authorId: string) {
  if (!config.discord.botOwners.includes(authorId)) {
    return true;
  } else {
    return false;
  }
}

export async function disclaimerCheck(db: QuickDB, table: any) {
  if (!await table.get('registered') || await table.get('registered') === null || await table.get("registered") === false) {
    log.info("-----");
    log.warn("DISCLAIMER: SDS do not take responsibility for any loopholes or exploits in commands or internal systems.")
    log.warn("Any known vulnerabilities in the code we ship will be fixed ASAP, but any code you create, modify and/or delete, is your responsibility.")
    log.warn("This bot is NOT made to serve multiple guilds, it's only designed to serve 1 guild, so if you use the bot in multiple, things will at some point break.")
    log.info("-----");
    log.debug('Disclaimer displayed, registering bot in DB')

    await table.set('registered', true);
  }
}

/** */
export async function customLogger(mode: string, user: string) {
  switch (mode) {
    case "botOwnerCommandError":
      return console.log(`CMD HANDLER >> ${user} attempted to run a bot owner command.`);

    case "botNoPermissionError":
      return console.log(`CMD HANDLER >> ${user} attempted to run a command, for which they lack permissions.`);

    default:
      return;
  }
}

/**
 * Report different logs to a designated Discord webhook
 * @param {string} mode - What type of log will be sent. debug, info, warn, error, note
 * @param {string} text - Text to be sent along with the embed.
 * @return {object} webhook - Returns a DiscordJS Webhook object */
export async function webhookReporter(mode: string, text: string) {
  if (!config.discord.loggingWebhook) {
    return log.error('No webhook found! Check your config!')
  }

  const whClient = new WebhookClient({ url: config.discord.loggingWebhook })

  switch (mode) {
    case "debug":
      const debugEmbed = new EmbedBuilder()
          .setTitle('Debug Message')
          .setDescription(text)
          .setColor('Blue')
          .setTimestamp()
          .setFooter({ text: 'TSAB Utilities' })

      return await whClient.send({ embeds: [debugEmbed] })

    case "info":
      const infoEmbed = new EmbedBuilder()
          .setTitle('Info Message')
          .setDescription(text)
          .setColor('#2f3136')
          .setTimestamp()
          .setFooter({ text: 'TSAB Utilities' })

      return await whClient.send({embeds: [infoEmbed]})

    case "warn":
      const warnEmbed = new EmbedBuilder()
          .setTitle('Warn Notice')
          .setDescription(text)
          .setColor('Yellow')
          .setTimestamp()
          .setFooter({ text: 'TSAB Utilities' })

      return await whClient.send({embeds: [warnEmbed]})

    case "error":
      const errorEmbed = new EmbedBuilder()
          .setTitle('Error Notice')
          .setDescription(text)
          .setColor('Red')
          .setTimestamp()
          .setFooter({ text: 'TSAB Utilities' })

      return await whClient.send({embeds: [errorEmbed]})

    case "note":
      const noteEmbed = new EmbedBuilder()
          .setTitle('Note')
          .setDescription(text)
          .setColor('Green')
          .setTimestamp()
          .setFooter({ text: 'TSAB Utilities' })

      return await whClient.send({embeds: [noteEmbed]})

    default:
      return log.warn('Not a correct log type!')
  }
}