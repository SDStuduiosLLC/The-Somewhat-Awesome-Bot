import {Message, Client, MessageInteraction, CommandInteraction, SlashCommandBuilder} from "discord.js";

module.exports = {
  // name: "ping",
  // description: "Relays info about the connection to Discord",
  // minArgs: 0,
  // maxArgs: 0,
  // category: 'Utility',
  // slash: true,
  data: new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Replies with the bots latency'),
  async execute(ctx: CommandInteraction, client: Client) {
    const content = `API Latency is ${Math.round(client.ws.ping)}ms`;

    await ctx.reply({ content: content, ephemeral: true });
  },

};
