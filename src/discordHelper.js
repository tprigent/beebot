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

function publishAlert(client, deviceID) {
  // channel
  const channelID = debug ? discordParams.debugAlertChannelID : discordParams.alertChannelID;
  const channel = client.channels.cache.get(channelID);

  // retrieving device info using ID
  const device = sigfoxParams.devices.find((d) => d.id === deviceID);

  // const date = new Date(time);
  // const parsedHour = `${date.getHours()}:${date.getMinutes()}`;

  const msg = '⚠️ ***Nouvelle alerte détectée*** ⚠️'
        + '\n__Type d\'alerte__: activité suspecte'
        + `\n__Capteur__: ${device.name}`
        // `\n__Heure__: ${parsedHour}` +
        + `\n__Lieu__: ${device.location}`;

  channel.send(msg);
}

module.exports = {
  processUserInput,
  publishAlert,
};
