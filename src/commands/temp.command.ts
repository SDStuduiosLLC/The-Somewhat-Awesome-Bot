import { Message, Client } from "discord.js";

module.exports = {
    name: "yourCommandName",
    description: "Command description goes here",
    async execute (msg: Message, args: Array<string>, client: Client) {
        console.log('Command run!')
    }
};