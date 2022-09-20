import { Client as SClient } from "statcord.js";
import {
  Client,
  Message,
  TextChannel,
  PermissionsBitField, User
} from "discord.js";
import { config } from "../../data/config";
import { createSimpleLogger } from "simple-node-logger";
import { checkForOwner } from "../Utils";
import { EmbedBuilder } from "@discordjs/builders";
import fs from "fs";
// @ts-ignore
import { AsciiTable3, AlignmentEnum } from "ascii-table3";

// Node logger
const log = createSimpleLogger("./data/mcb.log");

// Automatic command importer
const commandArray: Array<string> = [];
const commandDir: string = `${process.cwd()}/src/commands/`;

fs.readdirSync(commandDir).forEach(file => {
  file = file.replace(/\..+$/, '');
  file = file.toLowerCase();
  if (file.startsWith('temp')) return;
  commandArray.push(file);
  log.info(`Imported Command: ${file}`);
})

const table = new AsciiTable3('Commands')
    .setHeading('Name', 'Description', 'MinArgs', 'MaxArgs', 'Category')
    .setStyle('unicode-single')

for (let i=0;i<commandArray.length;i++) {
  const cmdToImport = require(`${commandDir}${commandArray[i]}`);
  console.log()
  table.addRow(`${cmdToImport.name}`, cmdToImport.description, cmdToImport.minArgs, cmdToImport.maxArgs, cmdToImport.category)
}

console.log(table.toString());

export default (client: Client, statcord: SClient): void => {
  // @ts-ignore
  // TODO: Add legit fully typed handler with full command interaction
  client.on("messageCreate", async (msg: Message) => {
    if (msg.mentions.has(client.user as User)) return msg.reply(`Heyo! My prefix is \`${config.discord.botPrefix}\` - We are working on pinging, just not quite there yet!`)

    if (!msg.content.startsWith(config.discord.botPrefix) || msg.author.bot) return;

    const args = msg.content
      .slice(config.discord.botPrefix.length)
      .trim()
      .split(/ +/);
    const command = args.shift()?.toLowerCase() as string;

    if (commandArray.includes(command)) {
      msg.channel.sendTyping();

      const commandToRun = require(`${commandDir}${command}`);

      let minArgs = commandToRun.minArgs;
      let maxArgs = commandToRun.maxArgs;

      let commandPattern = commandToRun.commandPattern;

      if (!commandToRun.commandPattern || commandPattern === undefined) {
        commandPattern = "No pattern found"
      }

      if (args.length < minArgs) {
        return msg.reply(`Expected \`${minArgs}\` argument(s). Got \`${args.length}\`. Command pattern is \`${config.discord.botPrefix}${commandPattern}\`.`)
      }

      if (args.length > maxArgs) {
        return msg.reply(`Maximum \`${maxArgs}\` argument(s). Got \`${args.length}\`. Command pattern is \`${config.discord.botPrefix}${commandPattern}\`.`)
      }

      if (commandToRun.isOwner || !commandToRun.isOwner === undefined) {
        if (config.discord.botOwners.includes(msg.author.id)) {
          commandToRun.execute(msg, args, client);
          return statcord.postCommand(command, msg.author.id);
        } else {
          return msg.reply(config.responses.noPermission);
        }
      }

      if(commandToRun.requiredPermissions || !commandToRun.requiredPermissions === undefined) {
        if (config.discord.botOwners.includes(msg.author.id)) {
          commandToRun.execute(msg, args, client);
          return statcord.postCommand(command, msg.author.id);
        }
        const member = client.guilds.cache.get(msg.guild!.id)!.members.cache.get(msg.author.id)
        for(let i=0; i<commandToRun.requiredPermissions.length; i++) {
          if (!member!.permissions.has(`${commandToRun.requiredPermissions[i]}`)) return msg.reply(config.responses.noPermission);
        }

        log.info('Special command run!')
        commandToRun.execute(msg, args, client);
        return statcord.postCommand(command, msg.author.id);
      } else {
        commandToRun.execute(msg, args, client);
        return statcord.postCommand(command, msg.author.id);
      }
    } else if (command === "manstatpost") {
      if (checkForOwner(msg.author.id)) return;
      console.log("beans");
      await statcord.post();
    } else {
      await msg.reply('Sorry! Command was not found. Please open a ticket if this is incorrect.')
    }
  });

  client.on('error', async (error) => {
    log.error(`OH F**K SOMETHING REALLY REALLY WENT WRONG. HERE'S THE RUNDOWN: \n\n${error}`)
  })
};
