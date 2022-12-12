import {REST} from '@discordjs/rest';
import {config} from "../../../data/config";
import {Client,SlashCommandBuilder,Routes} from "discord.js";
import {createSimpleLogger} from "simple-node-logger";
import {QuickDB} from "quick.db";

const rest = new REST({ version: '10' }).setToken(config.discord.token);
import { debug,error,log } from '../../lib/tsabLogger';
const db = new QuickDB();
const sysInternals = db.table("sysInt");

log('Starting deletion...')
const commands: never[] = []

rest.put(Routes.applicationGuildCommands(config.discord.clientId, config.discord.serverId), {body: commands})
    .then((data:any) => debug(`Successfully deleted all commands.`))
    .catch(error)