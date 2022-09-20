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
    if (cmd.slash || cmd.slash === 'both') {
        commands.push(file);
        log.info(`Imported Slash Command: ${file}`);
    }
})

rest.get(Routes.applicationGuildCommands(config.discord.clientId, config.discord.serverId))
    .then((data:any) => {
       const dscCommands: any = []
        for (let i=0;i<commands.length;i++) {
            const cmd = require(`${commandDir}${commands[i]}`)
            dscCommands.push(new SlashCommandBuilder().setName(commands[i]).setDescription(cmd.description))
        }
        // @ts-ignore
        dscCommands.map(command=>command.toJSON())

        rest.put(Routes.applicationGuildCommands(config.discord.clientId, config.discord.serverId), {body: dscCommands})
            .then((data:any) => log.debug(`Successfully registered ${data.length} application commands.`))
            .catch(log.error)
    })
    .catch(log.error)

