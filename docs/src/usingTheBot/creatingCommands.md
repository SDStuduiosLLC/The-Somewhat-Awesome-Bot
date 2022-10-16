# Creating Commands

So, you want to make some of your own commands, huh? Well this is the right article for you!

Now before we start, make sure you have followed the [Getting Started](/gettingStarted/installation) guide and have the bot up and running. 

> You should be able to run `{your prefix here}info` and it should reply with info about the bot, and linked server.

## Creating The Base Command

Creating a command isn't that hard, just the way my command importer works is a bit weird.

All commands are flattened to lowercase, so make sure `name` is also lowercase, it won't work otherwise.

`src/commands/{yourCommandNameHere}.ts` - Command name MUST match the name you give the file!

```typescript
import { Message, Client } from "discord.js";

module.exports = {
    name: "yourCommandName",
    description: "Command description goes here",
    async execute (msg: Message, args: Array<string>, client: Client) {
        console.log('Command run!')
    }
};
```

### Testing the command (itr. 1)

Once you've created the file and added this base code, save it, restart the bot and then run `{your bot prefix}yourCommandName`. It should log to the console `Command run!` (if you didn't change the code).

Now that your command is working, code your command! It's now down to you to make whatever commands you want!

## Command Permissions

So, to save myself (and you!) time, I've built a permission handler and checker into the command importer. Now, due to the way I've designed it, the way you use it is a bit strange.

There are three "modes" of permissions you can use. The order of the list is important, the highest one rules over the others.

- isOwner: true 
- hasPermission: ['ARRAY_OF_DISCORDJS_PERMISSIONS']
- None

!> You CANNOT have both `isOwner` and an array of `hasPermission` in the same command.

Well you can, just `isOwner` will override `hasPermission`. If anyone can run the command, don't add either.

### Note About Bot Owners

The way that bot owners are used is, they have full override over ALL permissions. So even if a bot owner doesn't meet the requirements for `hasPermission`, they will still be able to run the command.

