# Deploying To A Server

Finally! Ready to lift off and launch the bot!
Not quite yet, we need to do a few things first.

## Build & Compile from TypeScript to JS

!> This is not currently recommended as there are signinficant issues with compiling at the moment.
```bash
yarn build
```

## Install PM2
?> This automatically restarts the bot if there are any issues, and also allows for monitoring!
```bash
npm i -g pm2
```


## Launch the bot!
```bash
pm2 start build/src/Bot.js
```

---
## Troubleshooting

If for some reason, the bot doesn't start up or send a message to the log channel you set;

Stop the bot with ```pm2 stop Bot```;

And run the bot normally with ```node build/src/Bot.js``` and try to diagnose the issue.

---

You're done! You can choose to move onto the advanced section, but you're done!