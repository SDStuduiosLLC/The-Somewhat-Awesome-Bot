import { config } from "../data/config";
import { createSimpleLogger } from "simple-node-logger";
import { Client, Collection } from "discord.js";
import * as fs from "fs";
import * as path from "path";
import { QuickDB } from "quick.db";
import { dir } from "console";

const log = createSimpleLogger("./data/mcb.log");
const db = new QuickDB();

export function checkForInfo() {
  if (!config.discord.serverId) {
    log.error("No server specified, exit to prevent further errors...");
    process.exit();
  } else if (!config.discord.logChannel) {
    log.error("No log channel, exit to prevent further errors...");
    process.exit();
  } else if (!config.discord.staffRole) {
    log.error("No staff role, exit to prevent further errors...");
    process.exit();
  } else {
    log.debug("All checks passed, starting bot..");
  }
}

export function linkCommands() {}
