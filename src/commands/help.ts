import { Message, Client, EmbedBuilder } from "discord.js";
// @ts-ignore
import { AsciiTable3, AlignmentEnum } from "ascii-table3";


module.exports = {
    name: "help",
    description: "Gives an explanation on what a command does.",
    minArgs: 0,
    maxArgs: 1,
    async execute (msg: Message, args: Array<string>, client: Client) {
        const commandArray: Array<string> = [];
        const commandDir: string = `${process.cwd()}/src/commands/`;

        if (!args[0]) {
            const cmdToImport = require(`${commandDir}${args[0]}`);
            const table = new AsciiTable3('All Commands')
                .setHeading('Name', 'Description', 'Minimum Args', 'Maximum Args', 'Owner Only?')
                .setStyle('unicode-single')

            for (let i=0;i<commandArray.length;i++) {
                const cmdToImport = require(`${commandDir}${commandArray[i]}`);
                console.log()
                table.addRow(`${cmdToImport.name}`, cmdToImport.description, cmdToImport.minArgs, cmdToImport.maxArgs, cmdToImport.isOwner)
            }

            const embed1 = new EmbedBuilder()
                .setDescription(table.toString());

            try {
                return await msg.reply({ embeds: [embed1] })
            } catch (e) {
                return await msg.reply('Error when sending list. Most likely too long.')
            }
        }

        try {
            // cmdToImport = require(`${commandDir}${args[0]}`);
        } catch (e) {
            return await msg.reply("Error when looking up command. Probably doesn't exist.")
        }

        const embed = new EmbedBuilder()
            // .setTitle(`<:command:1013184215224946778> ${cmdToImport.name}
    }
}