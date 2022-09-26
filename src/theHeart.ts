import { Client, GatewayIntentBits } from "discord.js";
import { createSimpleLogger } from "simple-node-logger";
import ready from "./listeners/ready";
import onMessageCreate from "./listeners/onMessageCreate";
import { config } from "../data/config";
import * as figlet from "figlet";
import Statcord from "statcord.js";
import tempListener from "./listeners/customListeners/temp.listener";
import newCommandHandler from "./listeners/newCommandHandler";

const log = createSimpleLogger("./data/mcb.log");

figlet.text(
  "TSAB",
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
  postCpuStatistics: true,
  postMemStatistics: true,
  postNetworkStatistics: true,
});

ready(client, statcord);
// onMessageCreate(client, statcord);
newCommandHandler(client, statcord);

// Custom Listeners
tempListener(client)

client.login(config.discord.token).then(r => log.debug('Discord websocket connected!'));

statcord.on("post", (status: any) => {
  if (!status) log.debug("Successful post");
  else log.warn(status);
});
