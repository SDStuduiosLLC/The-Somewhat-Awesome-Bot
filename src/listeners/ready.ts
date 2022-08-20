import {ActivityType, Client, EmbedBuilder, Role, TextChannel} from "discord.js";
import { createSimpleLogger } from "simple-node-logger";
import { config } from "../../data/config";
import { checkForInfo } from "../Utils";
import mongoose from "mongoose";
import { QuickDB } from "quick.db";
import Statcord from "statcord.js";

const log = createSimpleLogger("./data/mcb.log");
log.setLevel("debug"); // set to INFO for production (i mean unless you want lots more info then go ahead lol)

const db = new QuickDB();

export default (client: Client, statcord: Statcord.Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }

    checkForInfo();
    statcord.autopost();

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

    const statusText = "summer do the dev shuffle";
    client.user.setActivity(statusText, { type: ActivityType.Watching });
    log.debug(`Set custom status to ${statusText}`);

    // const logEmbed1 = {
    //   title: "Status Log",
    //   description:
    //     "<a:success_tick:1005196730461073550> Bot successfully (re)booted!",
    //   fields: [
    //     {
    //       name: "Connected Server",
    //       value: `${guild?.name}`,
    //       inline: true,
    //     },
    //     {
    //       name: "Log Channel",
    //       value: `<#${logChannel.id}>`,
    //       inline: true,
    //     },
    //     {
    //       name: "Staff Role",
    //       value: `<@&${staffRole.id}>`,
    //       inline: true,
    //     },
    //   ],
    //   timestamp: new Date(),
    //   author: {
    //     name: "",
    //     icon_url:
    //       "https://us-east-1.tixte.net/uploads/cdn2.summerdev.tk/landscape-g729e5666c_1920(1)(2)(1).62becd48b7ee38.80166689.jpg",
    //   },
    // };

    const logEmbed1 = new EmbedBuilder()
        .setTitle('Status Log')
        .setDescription("<a:success_tick:1005196730461073550> Bot successfully (re)booted!")
        .addFields(
            { name: "Linked Server", value: `${guild?.name}`, inline: true },
            { name: "Log Channel", value: `<#${logChannel.id}>`, inline: true },
            { name: "Staff Role", value: `<@&${staffRole.id}>`, inline: true }
        )
        .setTimestamp()


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
