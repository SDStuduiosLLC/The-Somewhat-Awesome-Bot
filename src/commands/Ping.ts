import { Message, Client } from "discord.js";

module.exports = {
  name: "ping",
  description: "Relays info about the connection to Discord",
  async execute(msg: Message, args: any, client: Client) {
    const content = `API Latency is ${Math.round(client.ws.ping)}ms`;

    msg.reply({ content: content });
  },
};
