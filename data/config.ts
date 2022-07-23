export const config = {
    responses: {
        noPermission: "You do not have permission to use this command.",
        genericError: "Something went wrong. Hopefully the developer adds in extra info!",
        botMissingPermissionSEND_MESSAGES: "Missing Permissions! Please grant the bot the `SEND_MESSAGES` permission or reinvite the bot with the correct permissions.",
        botMissingPermissionEMBED_LINKS: "Missing Permissions! Please grant the bot the `EMBED_LINKS` permission or reinvite the bot with the correct permissions",
        botHasAdmin: "Woah! The server admins are treading a dangerous road, I have admin! If my token gets leaked I could cause havoc! Please ask server admins to remove my administrator permissions.\n\nI will also send a message to the log channel if there is one available."
    },
    discord: {
        token: "",
        serverId: "",
        logChannel: "",
        staffRole: ""
    },
    twitter: {
        apiKey: "",
        apiSecret: "",
        bearerToken: ""
    },
    mongo: {
        connectionUri: ""
    }
};