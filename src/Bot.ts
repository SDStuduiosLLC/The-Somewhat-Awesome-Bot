import { Client, GatewayIntentBits, Partials } from "discord.js";
import { createSimpleLogger } from "simple-node-logger";
import * as dotenv from 'dotenv';
import ready from './listeners/ready';
import interactionCreate from "./listeners/interactionCreate";
import { config } from '../data/config'
// @ts-ignore
import Twit from "twit";

dotenv.config();
const log = createSimpleLogger('./data/mcb.log');

// const T = new Twit({
//     consumer_key: testConfig.accessToken,
//     consumer_secret: testConfig.accessSecret,
//     access_token: testConfig.apiKey,
//     access_token_secret: testConfig.apiSecret
// })

log.info('Starting bot...');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMembers]
});

ready(client);
interactionCreate(client);

// client.login(config.discord.token);
