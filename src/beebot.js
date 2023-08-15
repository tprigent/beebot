const { Client, Intents } = require('discord.js');
const config = require('./config');
const { processUserInput, publishAlert } = require('./discordHelper');
const { checkNewMessages } = require('./sigfoxHelper');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

async function checkAlerts() {
  const newMessages = await checkNewMessages();

  for (let i=0; i<newMessages.length; i++) {
    publishAlert(client, newMessages[i]);
  }
}

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
    setInterval(checkAlerts, 5000);
  });
