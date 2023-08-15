const { Client, Intents } = require('discord.js');
const config = require('./config');
const { processUserInput } = require('./discordHelper');
const { unitMonitor } = require('./sigfoxHelper');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// Bot setup
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  client.user.setActivity('Surveille les ruches');
});

// User interaction management
client.on('message', async (message) => {
  processUserInput(message);
});

// Start bot
client.login(config.discordParams.botToken)
  .then(() => {
    setInterval(unitMonitor, 5000, client);
  });
