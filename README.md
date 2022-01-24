# Beebot
Bot that sends SigFox messages to a Discord server.

In particular, it allows beehive owner to be alerted if suspicious activity is detected.

<img width="335" alt="Capture d’écran 2022-01-23 à 23 48 27" src="https://user-images.githubusercontent.com/14911193/150701198-4bef22cb-230a-498b-a479-0a3b1ff6c390.png">


## Table of Contents
1. [How to use it?](#how-to-use-it)
   1. [Prerequesites](#prerequisites)
   2. [Installation](#installation)
      1. [Discord bot](#creating-the-discord-bot)
      2. [SigFox API](#create-the-sigfox-api-access)
      3. [Install server](#install-the-server)
2. [References](#references)

## How to use it?

### Prerequisites
On your server, make sure that `npm` and `nodejs` are installed:
```bash
sudo apt install nodejs npm
```

### Installation
Copy the `config_sample.js` file under the name `config.js`.

#### Creating the Discord bot
Login at the [Discord developer portal](https://discord.com/developers/applications) and create a new app.
1. In the "bot" section, choose a name and an avatar for your bot.
2. Copy the bot token in the `config.js` file.
3. In the "OAuth2" section, go to URL generator, check `bot` and the permissions you want for your bot.
4. Copy the generated URL and paste it in your browser, you will be able to choose in which server you want to add it.

#### Create the SigFox API access
Login at the [SigFox backend](https://backend.sigfox.com/).
1. Under the "Device type" section, select the group to which your SigFox module is linked.
2. In the left bar menu, choose "API access".
3. Create a new one, and choose the `DEVICE_MANAGER [R]` option.
4. Copy login and password in the `config.js` file.

#### Install the server
Clone the project in an adequate folder, then `cd` in it and run:
```bash
npm install
```
This will install the Node.js server.

To make it run continuously and at server startup, check the following [tutorial](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04)

## References
This bot was inspired by the [Insanotedur project](https://github.com/truelossless/insanotedur), 
a bot that alerts students of new grades on their digital portal.
