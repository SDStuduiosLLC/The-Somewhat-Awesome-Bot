import { config } from "../data/config";
import { createSimpleLogger } from "simple-node-logger";
import { QuickDB } from "quick.db";

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

export function checkForOwner(authorId: string) {
  if (!config.discord.botOwners.includes(authorId)) {
    return true;
  } else {
    return false;
  }
}

export async function disclaimerCheck(db: QuickDB, table: any) {
  if (!await table.get('registered') || await table.get('registered') === null || await table.get("registered") === false) {
    log.info("-----");
    log.warn("DISCLAIMER: SummerDev Studios & WhizBangPop! do not take responsibility for any loopholes or exploits in commands or internal systems.")
    log.warn("Any known vulnerabilities in the code we ship will be fixed ASAP, but any code you create, modify and/or delete, is your responsibility.")
    log.warn("This bot is NOT made to serve multiple guilds, it's only designed to serve 1 guild, so if you use the bot in multiple, things will at some point break.")
    log.info("-----");
    log.debug('Disclaimer displayed, registering bot in DB')

    await table.set('registered', true);
  }
}
