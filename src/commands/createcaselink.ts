import { config } from "./../../data/config";
import { Message, Client, TextChannel } from "discord.js";
const modCase = require("../../data/schemas/modCase");

module.exports = {
  name: "createcaselink",
  description: "Create the base template for a ©CaseLink",
  isOwner: true,
  minArgs: 3,
  maxArgs: 3,
  category: 'Moderation',
  async execute(msg: Message, args: Array<String>, client: Client) {
    return msg.reply('This command is not currently in use.')

    if (!args[2])
      return msg.reply(
        `Missing options. Command is: ${config.discord.botPrefix}createcaselink {userID} {actionTaken} {caseNo}`
      );

    const caseLinkChannel = "1008435405709922365" ?? config.discord.logChannel; // make sure too add a channel ID unless you want case links sent to the log channel
    const userID = args[0];
    const actionTaken = args[1];
    const caseNo = args[2];

    if (actionTaken.includes("warn"))
      return msg.reply(
        "Warnings are only to be added to a ban, kick or mute LCase as Dyno or YAGPDB cases."
      );

    modCase.countDocuments(
      { _id: args[2] },
      async function (err: any, count: Number) {
        if (err) {
          return msg.reply(
            "There was an issue when searching the database.\n\n`" + err + "`"
          );
        }

        if (count > 0) {
          return msg.reply(
            "Case already exists. There is a system on the way to remove the case numbers from having to be added manually."
          );
        }

        try {
          const caseChannel = client.channels.cache.get(
            caseLinkChannel
          ) as TextChannel;
          let msgId = "";
          caseChannel
            .send(
              `**<@${userID}> ${actionTaken} Case** - LCase #${caseNo}\n\nDyno Automod Flags:\n> None found or specified.\n\nDiscord Automod Flags:\n> None found or specified.\n\n-----\n\nDyno Cases:\n> None found or specified.\n\nYAGPDB Cases:\n> None found or specified\n\nTSAB Cases:\n> None found or specified.\n\n-----\n\nMod Notes:\n> None found or specified.\n\nModerator(s) Responsable for Case:\n> None found or specified.`
            )
            .then((m) => {
              msgId = m.id;
            });

          const caseDoc = new modCase({
            _id: args[2],
            modId: msg.author.id,
            messageId: msgId,
          });

          await caseDoc.save();
        } catch (e) {
          return msg.reply("Error when saving case. " + e);
        }
      }
    );
  },
};
