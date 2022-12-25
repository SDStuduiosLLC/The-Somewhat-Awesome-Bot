import { Message, Client } from "discord.js";

module.exports = {
    name: "yourCommandName",
    description: "Command description goes here",
    minArgs: 0,
    maxArgs: 0,
    category: 'Command category',
    async execute (msg: Message, args: Array<string>, client: Client) {
        console.log('Command run!')
    }
};