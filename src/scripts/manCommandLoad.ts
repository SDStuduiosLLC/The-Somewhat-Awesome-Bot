import {REST} from '@discordjs/rest';
import {config} from "../../data/config";
import {Client,SlashCommandBuilder,Routes} from "discord.js";
import {createSimpleLogger} from "simple-node-logger";
import {QuickDB} from "quick.db";

const rest = new REST({ version: '10' }).setToken(config.discord.token);
const log = createSimpleLogger("./data/mcb.log");
log.setLevel('debug');
const db = new QuickDB();
const sysInternals = db.table("sysInt");

log.info('Manually syncing selected commands...')
const commands = [
    new SlashCommandBuilder().setName('ping').setDescription("Replies with system latency"),
].map(command=>command.toJSON());

rest.put(Routes.applicationGuildCommands(config.discord.clientId, config.discord.serverId), {body: commands})
    .then((data:any) => log.debug(`Successfully registered ${data.length} application commands.`))
    .catch(log.error)