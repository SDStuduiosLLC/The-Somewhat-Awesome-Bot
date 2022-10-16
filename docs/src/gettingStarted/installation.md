# Installing

## Deployment Locations
Now before doing anything, we need to decide where we want to keep this bot hosted.

!> **REPLIT AND GLITCH ARE NOT VIABLE**. 

They have set time limits and in general are a pain the backside to setup.

-----
## Requirements

We recommend a VPS (with at least 1GB of RAM), or at the very least, a computer you can keep running 24/7. 

We do recommend a VPS more for the fact it is always running, and you don't have as much to worry about, like for example, your computer blue screening.

Once you have a storage location selected, you need to stick to it, as once you start, if you change, you will have to start all over again, and that's a pain.

---

For this I am presuming you have NVM, Node, Yarn installed. You will need these.

I would also recommend Nodemon if your testing/developing locally as it means you don't need to keep stopping and starting every time.

**THESE ARE NOT PREINSTALLED ON FRESH LINUX OR WINDOWS MACHINES. YOU MUST INSTALL THEM YOURSELF**

-------------
## Install The Bot Locally

### Clone the Repo
```bash
git clone https://github.com/summerisadev/The-Somewhat-Awesome-Bot
```

### Install Packages
```bash
yarn install && yarn add -D typescript ts-node @types/node
```

---