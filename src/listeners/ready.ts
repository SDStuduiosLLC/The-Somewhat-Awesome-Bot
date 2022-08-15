import {
  ActivityType,
  Channel,
  Client,
  Collection,
  GuildBasedChannel,
  Message,
  Role,
  TextChannel,
} from "discord.js";
import { createSimpleLogger } from "simple-node-logger";
// import { Commands } from "../Commands";
import { config } from "../../data/config";
import { checkForInfo } from "../Utils";
import mongoose from "mongoose";
import { QuickDB } from "quick.db";
import path from "path";
import fs from "fs";
import Statcord from "statcord.js";

const Ping = require("../commands/Ping");

const log = createSimpleLogger("./data/mcb.log");
log.setLevel("debug"); // set to INFO for production (i mean unless you want lots more info then go aheaad lol)

const db = new QuickDB();

// let commandMap1 = new Collection();

export default (client: Client, statcord: Statcord.Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }

    checkForInfo();
    statcord.autopost();

    console.log(statcord);

    // log.info("Setting slash commands...");
    // await client.application.commands.set(Commands, config.discord.serverId);
    // log.info("Slash commands successfully set");

    log.info(`${client.user.tag} connected to Discord Gateway successfully`);

    const guild = client.guilds.cache.get(config.discord.serverId);
    const logChannel = guild?.channels.cache.get(
      config.discord.logChannel
    ) as TextChannel;
    const staffRole = guild?.roles.cache.get(config.discord.staffRole) as Role;

    // Log config info
    log.debug(`Set guild to ${guild?.name} (${guild?.id})`);
    log.debug(`Set log channel to #${logChannel.name} (${logChannel.id})`);
    log.debug(`Set staff role to @${staffRole.name} (${staffRole.id})`);
    log.debug(`Set shard count to ${config.discord.shardCount}`);

    const statusText = "the MBB Discord";
    client.user.setActivity(statusText, { type: ActivityType.Watching });
    log.debug(`Set custom status to ${statusText}`);

    const logEmbed1 = {
      title: "Status Log",
      description:
        "<a:success_tick:1005196730461073550> Bot successfully (re)booted!",
      feilds: [
        {
          name: "Connected Server",
          value: `${guild?.name}`,
          inline: true,
        },
        {
          name: "Log Channel",
          value: `<#${logChannel.id}>`,
          inline: true,
        },
        {
          name: "Staff Role",
          value: `<@${staffRole.id}>`,
          inline: true,
        },
      ],
      timestamp: new Date(),
      author: {
        name: "",
        icon_url:
          "https://us-east-1.tixte.net/uploads/cdn2.summerdev.tk/landscape-g729e5666c_1920(1)(2)(1).62becd48b7ee38.80166689.jpg",
      },
    };

    // @ts-ignore
    await logChannel?.send({ embeds: [logEmbed1] });

    mongoose
      .connect(config.mongo.connectionUri, {
        keepAlive: true,
      })
      .then(() => {
        log.info("Connected to MongoDB database...");
      })
      .catch((e) => {
        log.error(`DB Error: ${e}`);
      });

    try {
      log.debug("Linking commands...");
      // linkCommandsOld(client);
    } catch (e) {
      log.error("Error linking commands, exiting...");
      process.abort();
    }
  });
};

// function linkCommandsOld(client: Client) {
//   // // console.log(commandMap1);
//   // const dirPath = path.join(__dirname, "..", "commands");

//   // const commandFiles = fs
//   //   .readdirSync(dirPath)
//   //   .filter((file) => file.endsWith(".ts"));

//   // for (const file of commandFiles) {
//   //   const command = require(`./commands/${file}`);
//   //   console.log(command);
//   //   // commandMap1.set(command.name, command);
//   //   // console.log(`command map: ${command.name} ${commandMap1}`);
//   // }
// }
