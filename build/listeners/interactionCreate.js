"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../Commands");
exports.default = (client) => {
    client.on("interactionCreate", async (ctx) => {
        if (ctx.isChatInputCommand() || ctx.isContextMenuCommand()) {
            await handleSlashCommand(client, ctx);
        }
        ;
    });
};
const handleSlashCommand = async (client, ctx) => {
    const slashCommand = Commands_1.Commands.find(c => c.name === ctx.commandName);
    if (!slashCommand) {
        await ctx.followUp({ content: 'Oops! An error occurred\n\nError: `Command not found`' });
        return;
    }
    await ctx.deferReply();
    slashCommand.run(client, ctx);
};
//# sourceMappingURL=interactionCreate.js.map