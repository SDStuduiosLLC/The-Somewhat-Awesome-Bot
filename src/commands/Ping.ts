import { BaseApplicationCommandData, Client } from "discord.js";
import { Command } from "../Command";

export const Ping: Command = {
    name: "ping",
    description: "Pings the backend server & database",
    type: 1,
    run: async (client: Client, ctx) => {
        const content = `API Latency is ${Math.round(client.ws.ping)}ms\n\n${ctx.commandId}`;

        await ctx.followUp({
            ephemeral: true,
            content
        })
    }
};