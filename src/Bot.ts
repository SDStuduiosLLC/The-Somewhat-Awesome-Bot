import { Client } from "discord.js";
import { createSimpleLogger } from "simple-node-logger";
import * as dotenv from 'dotenv';
import ready from './listeners/ready';
import interactionCreate from "./listeners/interactionCreate";

dotenv.config();
const log = createSimpleLogger('./data/mcb.log');

log.info('Starting bot...');

const client = new Client({
    intents: []
});

ready(client);
interactionCreate(client)

client.login(process.env.BOT_TOKEN);
