/* Requirements */
const request = require('request');
const { Client, Intents } = require('discord.js');
const config = require('./config');

let lastMessageTime = '';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

function notifyBot(msg) {
  if (config.debug) {
    client.channels.cache.find((ch) => ch.name === config.debugChannelName).send(msg);
  } else {
    client.channels.cache.find((ch) => ch.name === config.channelName).send(msg);
  }
}

function buildMessage(msg, time) {
  const date = new Date(time);
  const parsedHour = `${date.getHours()}:${date.getMinutes()}`;
  return `⚠️ ***Nouvelle alerte détectée*** ⚠️ \n__Type d'alerte__: ${msg}\n__Heure__: ${parsedHour}`;
}

function checkNewMessage(data) {
  if (data.data[0].time === lastMessageTime) return;

  notifyBot(buildMessage('activité suspecte', data.data[0].time));
  lastMessageTime = data.data[0].time;
}

// requête toutes les x secondes
async function scrape(init) {
  await request(
    {
      url: config.url,
    },
    (error, res, body) => {
      if (res.statusCode === 200) {
        try {
          const data = JSON.parse(body);
          if (init) lastMessageTime = data.data[0].time;
          else checkNewMessage(data);
        } catch (e) {
          console.log('Error parsing JSON!');
        }
      } else {
        console.log('Status:', res.statusCode);
        console.log('Message:', res.body);
      }
    },
  );
}

(async () => {
  console.log('Lancement du bot ...');
  try {
    await client.login(config.botToken);
    console.log('Connecté à l\'API Discord.\n');
  } catch (e) {
    console.error(`Impossible de se connecter à l'API Discord: ${e}`);
    process.exit(1);
  }

  await scrape(true);
  console.log('\nInitialisation terminée.'
        + `\nRecherche d'éventuelles alertes toutes les ${config.frequency}s en cours ...`);

  setInterval(async () => {
    if (config.debug) console.log('Nouvelle requête commencée.');
    await scrape(false);
    if (config.debug) console.log('Requête terminée.');
  }, config.frequency * 1000);
})();
