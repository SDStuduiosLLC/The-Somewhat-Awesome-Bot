"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simple_node_logger_1 = require("simple-node-logger");
const Commands_1 = require("../Commands");
const log = (0, simple_node_logger_1.createSimpleLogger)('./data/mcb.log');
exports.default = (client) => {
    client.on('ready', async () => {
        if (!client.user || !client.application) {
            return;
        }
        log.info('Setting slash commands...');
        await client.application.commands.set(Commands_1.Commands, '811971536780132413');
        log.info('Slash commands successfully set');
        log.info(`${client.user.tag} connected to Discord Gateway successfully`);
    });
};
//# sourceMappingURL=ready.js.map