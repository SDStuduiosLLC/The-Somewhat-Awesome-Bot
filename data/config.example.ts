export const config = {
    responses: {
        noPermission: "You do not have permission to use this command.",
        genericError:
            "Something went wrong. Hopefully the developer adds in extra info!",
        botMissingPermissionSEND_MESSAGES:
            "Missing Permissions! Please grant the bot the `SEND_MESSAGES` permission or reinvite the bot with the correct permissions.",
        botMissingPermissionEMBED_LINKS:
            "Missing Permissions! Please grant the bot the `EMBED_LINKS` permission or reinvite the bot with the correct permissions",
        botHasAdmin:
            "Woah! The server admins are treading a dangerous road, I have admin! If my token gets leaked I could cause havoc! Please ask server admins to remove my administrator permissions.\n\nI will also send a message to the log channel if there is one available.",
    },
    discord: {
        token:
            "",
        clientId: "",
        loggingWebhook: "",
        botPrefix: "", /** String of the prefix used to trigger the bot. Pinging the bot is a WIP at the moment. */
        serverId: "",
        logChannel: "",
        staffRole: "",
        botOwners: [""], /** Array of all bot owners. Set index0 as the main owner/server owner, basically the person you want people to contact when it breaks. */
        messageCommandsEnabled: false, /** Toggle for message commands. Set to false by default for what should be obvious reasons. Read the DDev docs if you want more info on why. */
        shardCount: 1, //make sure to use only a plain number, doing "1" will just crash it. also "auto" doesn't work for some reason
    },
    mongo: {
        connectionUri: "",
    },
    statcord: {
        apiKey: "",
    },
    sentryLogging: {
        sentryIngestUri: "",
    },
}