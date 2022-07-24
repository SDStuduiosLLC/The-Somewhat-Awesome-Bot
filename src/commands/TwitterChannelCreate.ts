import { BaseApplicationCommandData, Client, EmbedBuilder } from "discord.js";
import { Command } from "../Command";
import { config } from '../../data/config';
import { QuickDB } from "quick.db";

const db = new QuickDB()

export const TwitterChannelCreate: Command = {
    name: "linktwitterchannel",
    description: "Tells the bot where to send",
    type: 1,
    run: async (client: Client, ctx) => {
        if (ctx.user.id !== "701561771529470074") {
            return await ctx.followUp({
                ephemeral: true,
                content: config.responses.noPermission
            })
        }

        const embed1 = new EmbedBuilder()
            .setColor('NotQuiteBlack')
            .setTitle('Webhook Creation Success')
            .setDescription(`Set the webhook channel to <#${config.discord.logChannel}>! If this is not correct, please check the config.`)
            .setFooter({ text: "MBB Community Bot" })

        await ctx.followUp({
            ephemeral: true,
            embeds: [embed1]
        })
    }
};