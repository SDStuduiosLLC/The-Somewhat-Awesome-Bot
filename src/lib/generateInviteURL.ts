import { config } from '../../data/config';
console.log(`Your Invite URL is: https://discord.com/api/oauth2/authorize?client_id=${config.discord.clientId}&permissions=607448176&scope=bot%20applications.commands\nThese are only the CORE permissions TSAB requires. If something isn't working with new commands - try granting the permissions that the command says it requires. A command should NEVER need admin.`)


//607448176