import {Channel, Client, GuildBasedChannel, TextChannel} from "discord.js";
import {createSimpleLogger} from "simple-node-logger";
import { Commands } from "../Commands";
import { config } from '../../data/config'

const log = createSimpleLogger('./data/mcb.log');

export default (client: Client): void => {
    client.on('ready', async () => {
        console.log(config)

        if (!client.user || !client.application) {
            return;
        }

        log.info('Setting slash commands...');
        await client.application.commands.set(Commands, '811971536780132413');
        log.info('Slash commands successfully set');

        log.info(`${client.user.tag} connected to Discord Gateway successfully`);

        const guild = client.guilds.cache.get(config.discord.serverId);
        console.log(config.discord.serverId)
        // @ts-ignore
        const logChannel = guild?.channels.cache.get(config.discord.logChannel) as TextChannel;
        await logChannel?.send({ content: 'beans on toast' })
    })
}