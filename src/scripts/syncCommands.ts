import {REST} from '@discordjs/rest';
import {config} from "../../data/config";
import {Client,SlashCommandBuilder,Routes} from "discord.js";
import {createSimpleLogger} from "simple-node-logger";
import {QuickDB} from "quick.db";
import fs from "fs";

const rest = new REST({ version: '10' }).setToken(config.discord.token);
const log = createSimpleLogger("./data/mcb.log");
log.setLevel('debug');
const db = new QuickDB();
const sysInternals = db.table("sysInt");

const commands: Array<any> = [];
const commandDir: string = `${process.cwd()}/build/src/commands/`;

// new SlashCommandBuilder().setName('ping').setDescription("Replies with system latency"),
fs.readdirSync(commandDir).forEach(file => {
    if (file.startsWith('temp')) return;
    if (file.endsWith('map')) return;

    file = file.replace(/\..+$/, '');
    file = file.toLowerCase();

    const cmd = require(`${commandDir}${file}`);
    if (cmd.data) {
        commands.push(cmd.data.toJSON());
        console.log(cmd)
        log.info(`Imported Slash Command: ${file}`);
    }
})

console.log('Syncing commands..')

rest.put(Routes.applicationGuildCommands(config.discord.clientId, config.discord.serverId), {body: commands})
    .then((data:any) => log.debug(`Successfully registered ${data.length} application commands.`))
    .catch(log.error)

