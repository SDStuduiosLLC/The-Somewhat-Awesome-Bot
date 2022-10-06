import {Client, Collection} from "discord.js";
import {Client as SClient} from "statcord.js";
import fs from'fs';
import path from 'path';
import {createSimpleLogger} from "simple-node-logger";
import {QuickDB} from "quick.db";
import {webhookReporter} from "../utilities";

const log = createSimpleLogger("./data/mcb.log");
log.setLevel('debug');
const db = new QuickDB();
const sysInternals = db.table("sysInt");

export default (client: Client, statcord: SClient): void => {
    const commands = new Collection();
    const commandDir: string = `${process.cwd()}/build/src/commands/`;
    // const commandFiles = fs.readdirSync(commandDir).filter(file => file.endsWith('.js'));

    fs.readdirSync(commandDir).forEach(file => {
        if (file.startsWith('temp')) return;
        if (file.endsWith('map')) return;

        file = file.replace(/\..+$/, '');
        file = file.toLowerCase();

        const cmd = require(`${commandDir}${file}`);

        if (!cmd.data) {

        } else {
            commands.set(cmd.data.name, cmd);
        }
    })

    client.on('interactionCreate', async (ctx) => {
        if (ctx.isChatInputCommand()) {
            const { commandName } = ctx;
            // @ts-ignore
            const command1: any = commands.get(ctx.commandName)
            if (!command1) return log.debug('AAAAAAAAAAAAAAAAAAAA COMMAND NOT FOUND');

            try {
                await command1.execute(ctx, client);
                return statcord.postCommand(command1, ctx.user.id);
            } catch (e) {
                log.error(e);
                await ctx.reply({ content: 'Something broke. Probably as the dev who is hosting this IS USING VERY F**KING MUCH ALPHA SOFTWARE. Go annoy them about it.' })
            }
        } else if (ctx.isContextMenuCommand()) {
            log.info('Context menu logic to be added!')
        } else if (ctx.isSelectMenu()) {
            log.info('Select menu logic to be added!')
        } else if (ctx.isButton()) {
            log.info('Button logic to be added!')
        } else return;
    })

    client.on('messageCreate', async (msg) => {
        log.info('Message handling not implimented. Fkn do it!')
    })

    client.on('error', async (e) => {
        await webhookReporter('error', `**Bot Error**\n\n${e.name}\n\n${e.message}`)
    })
}