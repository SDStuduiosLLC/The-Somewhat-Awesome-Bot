import { Client, Collection, Message } from "discord.js";
import { config } from "../../data/config";
import { createSimpleLogger } from "simple-node-logger";
import * as fs from "fs";
// import { commandMap } from "../Utils";

const log = createSimpleLogger("./data/mcb.log");

export default (client: Client, commands: any): void => {
  // client.on("messageCreate", async (msg: Message) => {
  //   if (!msg.content.startsWith(config.discord.botPrefix) || msg.author.bot)
  //     return;
  //   const args = msg.content
  //     .slice(config.discord.botPrefix.length)
  //     .trim()
  //     .split(/ +/);
  //   const command = args.shift()?.toLowerCase();
  //   console.log(`beans ${commandMap}`);
  //   if (!commandMap.has(command)) return;
  //   try {
  //     commandMap.get(command);
  //   } catch (e) {
  //     log.error(e);
  //     msg.reply({
  //       content: `${config.responses.genericError} - Something went wrong executing that command!`,
  //     });
  //   }
  // });
};
