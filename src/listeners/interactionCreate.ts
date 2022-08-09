// import { Client, Interaction, CommandInteraction } from "discord.js";
// // import {Commands} from "../Commands";

// export default (client: Client): void => {
//   client.on("interactionCreate", async (ctx: Interaction) => {
//     if (ctx.isChatInputCommand() || ctx.isContextMenuCommand()) {
//       await handleSlashCommand(client, ctx);
//     }
//   });
// };

// const handleSlashCommand = async (
//   client: Client,
//   ctx: CommandInteraction
// ): Promise<void> => {
//   const slashCommand = Commands.find((c) => c.name === ctx.commandName);
//   if (!slashCommand) {
//     await ctx.followUp({
//       content: "Oops! An error occurred\n\nError: `Command not found`",
//     });
//     return;
//   }

//   await ctx.deferReply();

//   slashCommand.run(client, ctx);
// };
