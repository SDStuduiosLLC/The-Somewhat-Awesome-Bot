import { Client } from "discord.js";
import {createSimpleLogger} from "simple-node-logger";
import { Commands } from "../Commands";

const log = createSimpleLogger('./data/mcb.log');

export default (client: Client): void => {
    client.on('ready', async () => {
        if (!client.user || !client.application) {
            return;
        }

        log.info('Setting slash commands...');
        await client.application.commands.set(Commands, '811971536780132413');
        log.info('Slash commands successfully set');

        log.info(`${client.user.tag} connected to Discord Gateway successfully`);
    })
}