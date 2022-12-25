import { Client, GatewayIntentBits } from "discord.js"
import ready from "./listeners/ready"
import { config } from "../../data/config"
import figlet from "figlet"
import Statcord from "statcord.js"
import tempListener from "./listeners/customListeners/temp.listener"
import newCommandHandler from "./listeners/newCommandHandler"
import { debug, log, warn, error } from "../lib/tsabLogger"

figlet.text(
  "TSAB Framework",
  {
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true,
  },
  function (err, data) {
    if (err) {
      warn("Something went wrong...")
      console.dir(err)
      return
    }
    console.log(data)
  }
)

log(
  "Built and Maintained by SDStudios - Please wait for all services to start..."
)
log("Starting bot...")

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
})

const statcord = new Statcord.Client({
  client,
  key: config.statcord.apiKey,
  postCpuStatistics: true,
  postMemStatistics: true,
  postNetworkStatistics: true,
})

ready(client, statcord)
newCommandHandler(client, statcord)

// Custom Listeners
tempListener(client)

try {
  client.login(config.discord.token).then((r) => {
    debug("Discord websocket connected!")
  })
} catch (e) {
  warn("Error when connecting to Discord Gateway", { sendWebhook: true })
}

statcord.on("post", (status: any) => {
  if (!status) {
  } else {
    warn(status, { sendWebhook: true })
  }
})
