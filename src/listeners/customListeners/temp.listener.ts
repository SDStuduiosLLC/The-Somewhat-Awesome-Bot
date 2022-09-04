import {Client, Message} from "discord.js";

export default (client: Client): void => {
    client.on('messageReactionAdd', async (msg) => {
        console.log('Reaction added')
        console.log('Now check out the docs! https://tsab-docs.summerdev.tk')
    })
}