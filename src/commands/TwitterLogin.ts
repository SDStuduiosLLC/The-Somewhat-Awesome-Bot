import { BaseApplicationCommandData, Client, EmbedBuilder } from "discord.js";
import { Command } from "../Command";
// @ts-ignore
import { config } from '../../data/config'

export const Ping: Command = {
    name: "twitterlogin",
    description: "(For MBB lol) Authenticates you for Twitter stream",
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
            .setTitle('Twitter Authentication')

        await ctx.followUp({
            ephemeral: true,
            embeds: []
        })
    }
};