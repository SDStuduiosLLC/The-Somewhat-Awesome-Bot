import {Message, Client, Guild} from "discord.js";

module.exports = {
    name: 'plugin',
    description: 'Developmental plugin.',
    minArgs: 2,
    maxArgs: 3,
    commandPattern: 'distribroles < roleid > [ excludeBots? ] [ excludedRoleID ]',
    hasPermissions: ['MANAGE_ROLES'],
    async execute(msg: Message, args: Array<string>, client: Client) {
        const guild                     = client.guilds.cache.get(msg.guild!.id) as Guild;  // Fetches the guild for later use
        const roleToApply               = guild.roles.cache.get(args[0]);                   // Fetches role from guild cache
        let   excludeBots               = args[1];                                          // Just an id for the exclude bots toggle
        const excludedRoles             = guild.roles.cache.get(args[2]);                   // Fetches role to exclude from guild cache
        let   userArray: Array<string>  = []                                                // Array of user ID's to add the role to
        let   msgId                     = ""                                                // ID of the init response message

        msg.reply('Started role application... This is a resource intensive process, so may take a while. Contact Summer if bot goes offline.').then(m => {
            msgId = m.id;
        });

        if (excludeBots !== "true") {
            excludeBots = "false";
        }

        if (!roleToApply || roleToApply === undefined) {
            return msg.reply('Sorry. No role found with that ID.')
        }

        msg.channel.messages.fetch(msgId).then(msg => {
            msg.edit({ content: 'Starting role filter service...' })
        })

        if (args[2]) {
            if (!excludedRoles || excludedRoles === undefined) {
                return msg.reply('Sorry. No role found with that ID.')
            }

            guild.members.fetch().then(ms => {
                ms.forEach(m => {
                    if (m.roles.cache.has(args[2])) return;
                    if (excludeBots === "true") {
                        if (m.user.bot) return;
                    }

                    userArray.push(m.user.username);
                })
            })
        }


        // The actual bloody logic
        // guild.members.fetch().then(ms => {
        //     ms.forEach(m => {
        //         m.roles.add(roleToApply);
        //         return console.log(m.user.username);
        //     })
        // })
        console.log(userArray)
    }
}