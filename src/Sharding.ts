import { ShardingManager } from "discord.js";
import { config } from "../data/config";
import { createSimpleLogger } from "simple-node-logger";

const log = createSimpleLogger("./data/mcb.log");
// before build, change to "./build/src/Bot.js". if you forget just change after the fact
const manager = new ShardingManager("./src/Bot.ts", {
  totalShards: config.discord.shardCount,
  token: config.discord.token,
});

if (!config.discord.shardCount) {
  log.error("No shard count, exit to prevent further errors...");
}

manager.on("shardCreate", (s) => log.info(`Launched shard #${s.id}`));

manager.spawn();
