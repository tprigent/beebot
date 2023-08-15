const { sigfoxParams, discordParams, debug } = require('./config');

function processUserInput(message) {
  if (message.author.bot) return;

  if (message.content.toLowerCase() === '!test') {
    message.channel.send('Le bot est fonctionnel !');
  }

  if (message.content.toLowerCase() === '!help') {
    message.channel.send('**Commandes :**'
            + '\n- `!stats` affiche les statistiques d\'alertes sur les 7 derniers jours'
            + '\n- `!help` affiche les commandes d\'aide'
            + '\n- `!test` teste la connectivité du bot');
  }
}

function publishAlert(client, message) {

  console.log(message);
  // channel
  const channelID = debug ? discordParams.debugAlertChannelID : discordParams.alertChannelID;
  const channel = client.channels.cache.get(channelID);

  // retrieving device info using ID
  const device = sigfoxParams.devices.find((d) => d.id === message.device.id);

  // building date
  const date = new Date(message.time);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth()+1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const parsedHour = `${day}/${month}/${year} ${hour}:${minutes}`;

  const msg = '⚠️ ***Nouvelle alerte détectée*** ⚠️'
        + '\n__Type d\'alerte__: activité suspecte'
        + `\n__Capteur__: ${device.name}`
        + `\n__Date__: ${parsedHour}`
        + `\n__Lieu__: ${device.location}`;

  channel.send(msg);
}

module.exports = {
  processUserInput,
  publishAlert,
};
