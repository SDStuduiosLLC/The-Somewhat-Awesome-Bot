import { Command } from "./Command";
import { Client, GatewayIntentBits, Partials, Collection } from "discord.js";
import { createSimpleLogger } from "simple-node-logger";
import ready from "./listeners/ready";
import onMessageCreate from "./listeners/onMessageCreate";
import { config } from "../data/config";
// @ts-ignore
import Twit from "twit";
import * as figlet from "figlet";
import * as fs from "fs";
import Statcord from "statcord.js";

const log = createSimpleLogger("./data/mcb.log");

// const T = new Twit({
//     consumer_key: testConfig.accessToken,
//     consumer_secret: testConfig.accessSecret,
//     access_token: testConfig.apiKey,
//     access_token_secret: testConfig.apiSecret
// })

figlet.text(
  "TSDB",
  {
    font: "Small Keyboard",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  },
  function (err, data) {
    if (err) {
      log.warn("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(data);
  }
);

log.info("Made by summer.#6649 | Please wait for all services to start...");
log.info("Starting bot...");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
});

const statcord = new Statcord.Client({
  client,
  key: config.statcord.apiKey,
  postCpuStatistics:
    true /* Whether to post memory statistics or not, defaults to true */,
  postMemStatistics:
    true /* Whether to post memory statistics or not, defaults to true */,
  postNetworkStatistics:
    true /* Whether to post memory statistics or not, defaults to true */,
});

ready(client, statcord);
onMessageCreate(client, statcord);

client.login(config.discord.token);

statcord.on("post", (status: any) => {
  // status = false if the post was successful
  // status = "Error message" or status = Error if there was an error
  console.log("something");
  if (!status) log.debug("Successful post");
  else log.warn(status);
});
