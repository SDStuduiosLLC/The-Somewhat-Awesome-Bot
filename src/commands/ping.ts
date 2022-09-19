import { Message, Client } from "discord.js";

module.exports = {
  name: "ping",
  description: "Relays info about the connection to Discord",
  minArgs: 0,
  maxArgs: 0,
  category: 'Utility',
  slash: true,
  async execute(msg: Message, args: any, client: Client) {
    const content = `API Latency is ${Math.round(client.ws.ping)}ms`;

    await msg.reply({ content: content });
  },
};
