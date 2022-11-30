import "chalk"
import "moment"
import { config } from "../../data/config"
import moment from "moment"
import chalk from "chalk"
import fs from "fs"
import { EmbedBuilder, Webhook, WebhookClient } from "discord.js"

/**
 * Checks if a log file exists. Returns the path, and creates one if required.
 * @return {string} filePath
 */
function getLogFile() {
  let filePath = ""

  if (
    !config.tsabLoggerSetting.logFilePath ||
    config.tsabLoggerSetting.logFilePath === undefined
  ) {
    filePath = "data/tsab.log"
  } else {
    filePath = config.tsabLoggerSetting.logFilePath
  }

  if (!fs.existsSync(`${filePath}`)) {
    fs.writeFile(
      filePath,
      "TSAB LOGGER FILE. AUTOMATICALLY GENERATED FILE. DO NOT EDIT OR DELETE.\n",
      (err) => {
        if (err) throw err
        debug("Created TSAB log file")
      }
    )
  }

  return filePath
}

getLogFile()

/**
 * Template for logger level options. You can ignore this.
 * @param {boolean} sendWebhook - Default: true
 */
interface OptionsInt {
  sendWebhook?: boolean
}

/**
 * @param {string} message
 * @param {OptionsInt} options
 */
export async function debug(message: string, options?: OptionsInt) {
  const sendWebhook = options?.sendWebhook
  const localmessage = `${moment().format()} ${chalk.white(
    "DEBUG"
  )} | ${chalk.white(message)}\n`

  process.stdout.write(
    `${moment().format()} ${chalk.white("DEBUG")} | ${chalk.white(message)}\n`
  )
  fs.appendFile(
    getLogFile(),
    `${moment().format()} DEBUG | ${message}\n`,
    (err) => console.error(err)
  )

  if (sendWebhook) {
    webhookReporter("debug", message)
  }
}

/**
 * @param {string} message
 * @param {OptionsInt} options
 */
export async function log(message: string, options?: OptionsInt) {
  const sendWebhook = options?.sendWebhook
  const localmessage = `${moment().format()} ${chalk.green(
    "LOG"
  )} | ${chalk.white(message)}\n`

  process.stdout.write(
    `${moment().format()} ${chalk.green("LOG")} | ${chalk.white(message)}\n`
  )
  fs.appendFile(getLogFile(), `${moment().format()} LOG | ${message}\n`, (err) =>
    console.error(err)
  )

  if (sendWebhook) {
    webhookReporter("info", message)
  }
}

/**
 * @param {string} message
 * @param {OptionsInt} options
 */
export async function warn(message: string, options?: OptionsInt) {
  const sendWebhook = options?.sendWebhook
  const localmessage = `${moment().format()} ${chalk.yellow(
    "WARN"
  )} | ${chalk.white(message)}\n`

  process.stdout.write(
    `${moment().format()} ${chalk.yellow("WARN")} | ${chalk.white(message)}\n`
  )
  fs.appendFile(
    getLogFile(),
    `${moment().format()} "WARN" | ${message}\n`,
    (err) => console.error(err)
  )

  if (sendWebhook) {
    webhookReporter("warn", message)
  }
}

/**
 * @param {string} message
 * @param {OptionsInt} options
 */
export async function error(message: string, options?: OptionsInt) {
  const sendWebhook = options?.sendWebhook
  const localmessage = `${moment().format()} ${chalk.redBright(
    "ERROR"
  )} | ${chalk.grey(message)}\n`

  process.stdout.write(
    `${moment().format()} ${chalk.redBright("ERROR")} | ${chalk.grey(
      message
    )}\n`
  )
  fs.appendFile(
    getLogFile(),
    `${moment().format()} ERROR | ${message}\n`,
    (err) => console.error(err)
  )

  if (sendWebhook) {
    webhookReporter("error", message)
  }
}

/**
 * Custom webhook logger module
 * @param {string} mode
 * @param {string} text
 * @returns {Webhook}
 */
async function webhookReporter(mode: string, text: string) {
  let hook = ""
  
  if (!config.tsabLoggerSetting.loggingWebhook) {
    return error("No webhook found! Check your config!")
    // TODO: add tsab internal log webhook url to default to
  } else {
    hook = config.tsabLoggerSetting.loggingWebhook
  }

  const whClient = new WebhookClient({
    url: hook,
  })

  switch (mode) {
    case "debug":
      const debugEmbed = new EmbedBuilder()
        .setTitle("Debug Log")
        .setDescription(text)
        .setColor("Blue")
        .setTimestamp()
        .setFooter({ text: "TSAB Utilities" })

      return await whClient.send({ embeds: [debugEmbed] })

    case "info":
      const infoEmbed = new EmbedBuilder()
        .setTitle("Log Line")
        .setDescription(text)
        .setColor("#2f3136")
        .setTimestamp()
        .setFooter({ text: "TSAB Utilities" })

      return await whClient.send({ embeds: [infoEmbed] })

    case "warn":
      const warnEmbed = new EmbedBuilder()
        .setTitle("Warn Log")
        .setDescription(text)
        .setColor("Yellow")
        .setTimestamp()
        .setFooter({ text: "TSAB Utilities" })

      return await whClient.send({ embeds: [warnEmbed] })

    case "error":
      const errorEmbed = new EmbedBuilder()
        .setTitle("Error Log")
        .setDescription(text)
        .setColor("Red")
        .setTimestamp()
        .setFooter({ text: "TSAB Utilities" })

      return await whClient.send({ embeds: [errorEmbed] })

    case "note":
      const noteEmbed = new EmbedBuilder()
        .setTitle("Note")
        .setDescription(text)
        .setColor("Green")
        .setTimestamp()
        .setFooter({ text: "TSAB Utilities" })

      return await whClient.send({ embeds: [noteEmbed] })

    default:
      return console.warn("Not a valid log type!")
  }
}
