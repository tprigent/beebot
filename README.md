# Beebot
Bot that sends SigFox messages to a Discord server.

In particular, it allows beehive owner to be alerted if suspicious activity is detected.

<img width="335" alt="Capture d’écran 2023-08-15 à 16 16 25" src="https://github.com/tprigent/beebot/assets/14911193/ed82cd29-069e-4766-89cf-2833a03b701a">



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

To make it run continuously and at server startup, check the following steps:
1. Install PM2 (process manager for npm)
```bash
sudo npm install pm2@latest -g
```
2. Start using PM2 for your service
```bash
pm2 start beebot/beebot.js
```
3. Type the following line to create startup script
```bash
pm2 startup systemd
```
4. Copy-paste the suggested command line to enable PM2 on boot
5. Save the PM2 process list with `pm2 save`
7. Start the PM2 service and replace `usr` by your username
```bash
sudo systemctl start pm2-usr
```
NB: You can manage PM2 with the commands `pm2 list`, `pm2 monit`, `pm2 stop [service-id]`, `pm2 restart [service-id]`...

## References
This bot was inspired by the [Insanotedur project](https://github.com/truelossless/insanotedur), 
a bot that alerts students of new grades on their digital portal.
