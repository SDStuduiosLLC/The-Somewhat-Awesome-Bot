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
      "OTk4NjU5Nzg1NjM5NTk2MTEy.G3yA_m.HdnsFuJAH4ifqJjdjVu9CVfwSXtckhbJiGEpoE",
    botPrefix: ">",
    serverId: "964238274581393418",
    logChannel: "1005191616048418917",
    staffRole: "964239782202994698",
    shardCount: 1, //make sure to use only a plain number, doing "1" will just crash it. also "auto" doesnt work for some reason
  },
  twitter: {
    apiKey: "",
    apiSecret: "",
    bearerToken: "",
    // These are USER keys. Not app keys, also the Twitter code is very buggy rn so don't rely on it
    accessKey: "",
    accessSecret: "",
  },
  mongo: {
    connectionUri:
      "mongodb+srv://mbbadmin:4DSb4t0hedQi003s@cluster0.6igergz.mongodb.net/db?retryWrites=true&w=majority",
  },
};
