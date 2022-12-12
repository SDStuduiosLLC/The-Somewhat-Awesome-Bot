import {REST} from '@discordjs/rest';
import {config} from "../../../data/config";
import {Client,SlashCommandBuilder,Routes} from "discord.js";
import {createSimpleLogger} from "simple-node-logger";
import {QuickDB} from "quick.db";

const rest = new REST({ version: '10' }).setToken(config.discord.token);
import { debug,log,error } from '../../lib/tsabLogger';
const db = new QuickDB();
const sysInternals = db.table("sysInt");

log('Manually syncing selected commands...')
const commands = [
    new SlashCommandBuilder().setName('ping').setDescription("Replies with system latency"),
].map(command=>command.toJSON());

rest.put(Routes.applicationGuildCommands(config.discord.clientId, config.discord.serverId), {body: commands})
    .then((data:any) => debug(`Successfully registered ${data.length} application commands.`))
    .catch(error)