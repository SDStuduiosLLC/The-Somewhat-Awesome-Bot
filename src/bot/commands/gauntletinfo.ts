import {SlashCommandBuilder, CommandInteraction, Client, PermissionFlagsBits, EmbedBuilder} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gauntletinfo')
        .setDescription('Sends an embed to a user asking about the HG')
        .addUserOption(option => option.setName('user').setDescription('User to mention with the embed'))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator | PermissionFlagsBits.ManageGuild),
    async execute(ctx: CommandInteraction, client: Client) {
        const infoEmbed = new EmbedBuilder()
            .setTitle('Gauntlet Participation Info')
            .setDescription(`Hey there person reading this! I think you want to know about the Hive Gauntlet tournament.
                            So here's the rundown.
                            
                            The gauntlet is an invite-only tournament run by MBB and MBB only. There are no set requirements at this time, with no plans to add any. You are just invited if you are.
                            
                            MBB sometimes also asks for new creators on the [Hive Gauntlet Twitter](https://twitter.com/hivegauntlet) after an event - great place to ask!
                            You can also check the [FAQ](https://mbbgamingyt.wixsite.com/gauntlet/faq) for more info.
                            
                            Please don't pester MBB or anyone in DM's about it.`)
            .setColor('#2f3136')

        if (ctx.options.getUser('user')) {
            return await ctx.reply({ embeds: [infoEmbed], content: `<@${ctx.options.getUser('user')?.id}>` })
        } else {
            await ctx.reply({ embeds: [infoEmbed] })
        }


    }
}