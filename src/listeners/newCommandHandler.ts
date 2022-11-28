import { Client, Collection, GuildMember } from "discord.js"
import { Client as SClient } from "statcord.js"
import fs from "fs"
import path from "path"
import { QuickDB } from "quick.db"
import { webhookReporter } from "../utilities"
import { config } from "../../data/config"

// const log = createSimpleLogger("./data/mcb.log")
// log.setLevel("debug")
import { debug, log, warn, error } from "../lib/tsabLogger"
const db = new QuickDB()
const sysInternals = db.table("sysInt")

export default (client: Client, statcord: SClient): void => {
  const slashCommandsMap = new Collection()
  const messageCommandsMap = new Collection()
  const commandDir: string = `${process.cwd()}/build/src/commands/`
  // const commandFiles = fs.readdirSync(commandDir).filter(file => file.endsWith('.js'));

  fs.readdirSync(commandDir).forEach((file) => {
    if (file.startsWith("temp")) return
    if (file.endsWith("map")) return

    file = file.replace(/\..+$/, "")
    file = file.toLowerCase()

    const cmd = require(`${commandDir}${file}`)

    if (!cmd.data) {
      messageCommandsMap.set(cmd.name, cmd)
      log(`Imported Message Command: ${cmd.name}`)
    } else {
      slashCommandsMap.set(cmd.data.name, cmd)
      log(`Imported Command: ${cmd.data.name}`)
    }
  })

  client.on("interactionCreate", async (ctx) => {
    if (ctx.isChatInputCommand()) {
      const { commandName } = ctx
      // @ts-ignore
      const command1: any = slashCommandsMap.get(ctx.commandName)
      if (!command1) return debug("AAAAAAAAAAAAAAAAAAAA COMMAND NOT FOUND")

      try {
        await command1.execute(ctx, client)
        return statcord.postCommand(command1, ctx.user.id)
      } catch (e: any) {
        error(e)
        await ctx.reply({
          content: `Something went wrong trying to execute that command. Please contact <@${config.discord.botOwners[0]}> about this.`,
        })
      }
    } else return
  })

  client.on("messageCreate", async (msg) => {
    if (!config.discord.messageCommandsEnabled) return
    if (!msg.content.startsWith(config.discord.botPrefix) || msg.author.bot)
      return

    const args: Array<string> = msg.content
      .slice(config.discord.botPrefix.length)
      .trim()
      .split(/ +/)
    const command = args.shift()?.toLowerCase() as string

    if (messageCommandsMap.has(command)) {
      msg.channel.sendTyping()

      const command1: any = messageCommandsMap.get(command)

      const minArgs = command1.minArgs
      const maxArgs = command1.maxArgs
      let commandPattern = command1.commandPattern

      if (!command1.commandPattern || commandPattern === undefined) {
        commandPattern = "No pattern found"
      }
      if (args.length < minArgs) {
        await msg.reply(
          `Expected \`${minArgs}\` argument(s). Got \`${args.length}\`. Command pattern is \`${config.discord.botPrefix}${commandPattern}\`.`
        )
        return
      }

      if (args.length > maxArgs) {
        await msg.reply(
          `Maximum \`${maxArgs}\` argument(s). Got \`${args.length}\`. Command pattern is \`${config.discord.botPrefix}${commandPattern}\`.`
        )
        return
      }

      if (command1.isOwner || !command1.isOwner === undefined) {
        if (config.discord.botOwners.includes(msg.author.id)) {
          command1.execute(msg, args, client)
          return statcord.postCommand(command, msg.author.id)
        } else {
          await msg.reply(config.responses.noPermission)
          return
        }
      }

      command1.execute(msg, args, client)
      await statcord.postCommand(command, msg.author.id)
      return

      // if(command1.requiredPermissions || !command1.requiredPermissions === undefined) {
      //     if (config.discord.botOwners.includes(msg.author.id)) {
      //         commandToRun.execute(msg, args, client);
      //         statcord.postCommand(command, msg.author.id);
      //         return;
      //     }
      //     const member = client.guilds.cache.get(msg.guild!.id)!.members.cache.get(msg.author.id)
      //     for(let i=0; i<commandToRun.requiredPermissions.length; i++) {
      //         if (!member!.permissions.has(`${commandToRun.requiredPermissions[i]}`)) return msg.reply(config.responses.noPermission);
      //     }
      //
      //     log.info('Special command run!')
      //     commandToRun.execute(msg, args, client);
      //     statcord.postCommand(command, msg.author.id);
      //     return;
      // } else {
      //     commandToRun.execute(msg, args, client);
      //     statcord.postCommand(command, msg.author.id);
      //     return;
      // }
    }
  })

  client.on("error", async (e) => {
    await error(`${e.name}\n${e.message}`, {
      sendWebhook: true,
    })
  })
}
