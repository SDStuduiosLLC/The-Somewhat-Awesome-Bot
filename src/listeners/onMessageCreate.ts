import { Client as SClient } from "statcord.js";
import {
  Client,
  Collection,
  GuildTextChannelResolvable,
  Message,
  TextChannel,
} from "discord.js";
import { config } from "../../data/config";
import { createSimpleLogger } from "simple-node-logger";
import * as fs from "fs";
import { checkForOwner } from "../Utils";
import { EmbedBuilder } from "@discordjs/builders";
// import { commandMap } from "../Utils";

const Ping = require("../commands/Ping");

const log = createSimpleLogger("./data/mcb.log");

export default (client: Client, statcord: SClient): void => {
  client.on("messageCreate", async (msg: Message) => {
    if (!msg.content.startsWith(config.discord.botPrefix) || msg.author.bot)
      return;

    const args = msg.content
      .slice(config.discord.botPrefix.length)
      .trim()
      .split(/ +/);
    const command = args.shift()?.toLowerCase() as string;
    console.log(msg.author.id);

    console.log("Posting stat...");
    statcord.postCommand(command, msg.author.id);

    if (command === "ping") {
      Ping.execute(msg, args, client);
    } else if (command === "manstatpost") {
      if (checkForOwner(msg.author.id)) return;
      console.log("beans");
      statcord.post();
    }
  });

  client.on("messageCreate", async (msg: Message) => {
    // @ts-expect-error
    if (msg.channel.name.startsWith("ticket-")) {
      const msgArray = msg.content.split(" ");
      for (let i = 0; i < msgArray.length; i++) {
        if (
          msgArray[i] === "automod" ||
          msgArray[i] === "automod," ||
          msgArray[i] === "Automod" ||
          msgArray[i] === "Automod," ||
          msgArray[i] === "AutoMod" ||
          msgArray[i] === "AutoMod,"
        ) {
          const logChannel = msg.guild?.channels.cache.find(
            (c) => c.id === config.discord.logChannel
          ) as TextChannel;
          const embed = new EmbedBuilder()
            .setTitle("AutoMod Ticket Detection")
            .setDescription(
              `Mention of AutoMod has been detected in <#${msg.channel.id}>.`
            )
            .setFooter({ text: "This is a automated notification." })
            .setTimestamp();

          logChannel.send({
            content: "<@701561771529470074>",
            embeds: [embed],
          });
        }
      }
    }
  });
};
