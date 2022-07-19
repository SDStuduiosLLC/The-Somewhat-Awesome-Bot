"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const simple_node_logger_1 = require("simple-node-logger");
const dotenv = tslib_1.__importStar(require("dotenv"));
const ready_1 = tslib_1.__importDefault(require("./listeners/ready"));
const interactionCreate_1 = tslib_1.__importDefault(require("./listeners/interactionCreate"));
dotenv.config();
const log = (0, simple_node_logger_1.createSimpleLogger)('./data/mcb.log');
log.info('Starting bot...');
const client = new discord_js_1.Client({
    intents: []
});
(0, ready_1.default)(client);
(0, interactionCreate_1.default)(client);
client.login(process.env.BOT_TOKEN);
//# sourceMappingURL=Bot.js.map