"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ping = void 0;
exports.Ping = {
    name: "ping",
    description: "Pings the backend server & database",
    type: 1,
    run: async (client, ctx) => {
        const content = `API Latency is ${Math.round(client.ws.ping)}ms\n\n${ctx.commandId}`;
        await ctx.followUp({
            ephemeral: true,
            content
        });
    }
};
//# sourceMappingURL=Ping.js.map