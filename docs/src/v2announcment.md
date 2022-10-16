# Command Handler v2 Announcement!

## Pre Release Notice
I am (somewhat) working on an overhauled command handler - which (fingers crossed) will FINALLY add slash command support. No promises though. So don't expect any more new features until then.

We do have October 1st scheduled as Milestone 1 (a.k.a - the first public beta release).

?> You can try out the new handler by cloning the "cmdhandlerv2" branch.

Just keep in mind it probably won't be very stable for the next good while.


---

## v2 Launch?
Well, I think we did it... Maybe.

While the command handler has *technically* been fully implemented, I just don't know how happy I am with it. I guess time will tell. 

And tbh, the fact I sorta had it *before* the 1st of October, it's quite surprising as I had to take a 2/3 week break for personal reasons (which I ***won't*** be getting into), I honestly don't remember writing most of the code I did.

The main thing is for me, I haven't added ANY code for buttons, select menus or anything like that, which sorta defeats the purpose of doing the rewrite as I wanted to take advantage of Discord's new features and make more use out of them.

Sorry if the announcement was a bit depressing, just had a lot to get out.
And don't worry, I'll still be working on v2 and improving it. Keep an eye on the Twitter.

❤️WBP

---


## (Major) Events Timeline
Here you can find major events along the developments of the v2 command handler, along with updates in the Discord server.

### v2 Out? (1.1.0)
Yes I know, it says its 1.1.0, buts it's v1 of v2. If you catch my drift. Added slash commands. That's about it. 

### Development Started (0.1.0)
I've really not done much. Just created a new branch, issue and item on project tracker.

### 0.2.1
Added slash command registration via 2 scripts. `syncCommands` automatically imports all commands with `slash: true` added to the command config and `manLoadCommands` adds commands based off what you define with the builders.
**Using either WILL overwrite all existing commands.** Use `manLoadCommands` caution. Deleting slash commands is a royal pain.