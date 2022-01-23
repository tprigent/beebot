# Beebot
Bot that sends SigFox messages to a Discord server.

In particular, it allows beehive owner to be alerted if suspicious activity is detected.

<img width="413" alt="Capture d’écran 2022-01-23 à 23 09 33" src="https://user-images.githubusercontent.com/14911193/150699887-fe423189-55a3-49c5-b84b-314fd9d557f8.png">


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
1. Create a file called `beebot.service` in a safe folder
```editorconfig
#!/usr/bin/env node

[Unit]
Description=Beebot

[Service]
ExecStart=/path/to/your/beebot/folder/index.js
Restart=always
User=nobody
# Note Debian/Ubuntu uses 'nogroup', RHEL/Fedora uses 'nobody'
Group=nogroup
Environment=PATH=/usr/bin:/usr/local/bin
Environment=NODE_ENV=production
WorkingDirectory=/path/to/your/beebot/folder

[Install]
WantedBy=multi-user.target
```
2. Copy it in the folder `/etc/systemd/system/`
3. Enable it at system startup
```bash
systemctl enable beebot.service
```
4. Start it !
```bash
systemctl start beebot.service
```

## References
This bot was inspired by the [Insanotedur project](https://github.com/truelossless/insanotedur), 
a bot that alerts students of new grades on their digital portal.
