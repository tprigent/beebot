// SigFox config
const sigfoxParams = {
  apiEndpoint: 'api.sigfox.com/v2/',
  apiLogin: 'xyz',
  apiPassword: 'xyz',
  devices: [
    {
      name: 'your device name',
      id: 'XXXXXX',
      location: 'Somewhere, 🇪🇺',
    },
  ],
};

const discordParams = {
  botToken: 'xyz',
  alertChannelID: 'xyz',
  debugAlertChannelID: 'xyz',
};

// Bot config
const frequency = 5;
const debug = true;

module.exports = {
  sigfoxParams,
  discordParams,
  frequency,
  debug,
};
