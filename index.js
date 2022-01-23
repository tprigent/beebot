/* Requirements */
const request = require('request');
const config = require('./config');
const { Client, Intents } = require('discord.js');

let debug = true;

var lastMessageTime = '';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

/* SigFox API */
const url = 'https://' + config.APIlogin + ':' + config.APIpassword + '@' + config.messageRoute;


function notifyBot(debug, msg){
    if(debug){
        client.channels.cache.find(ch => ch.name === config.channelName).send(msg);
    } else {
        client.channels.cache.find(ch => ch.name === config.debugChannelName).send(msg);
    }
}

function checkNewMessage(data){
    if(data.data[0].time === lastMessageTime) return;
    else {
        notifyBot(debug, buildMessage('activité suspecte', data.data[0].time))
        lastMessageTime = data.data[0].time;
    }
}

function buildMessage(msg, time){
    const date = new Date(time);
    const parsedDate = date.getDay() + '/' + date.getMonth()+1 + '/' + date.getFullYear()
    const parsedHour = date.getHours() + ':' + date.getMinutes();
    return '⚠️ ***Nouvelle alerte détectée*** ⚠️ \n__Type d\'alerte__: ' + msg + '\n__Date__: ' + parsedDate + '\n__Heure__: ' + parsedHour;
}

// requête toutes les x secondes
async function scrape(init) {
    await request(
        {
            url : url
        },
        function (error, res, body) {
            if (res.statusCode === 200) {
                try {
                    const data = JSON.parse(body);
                    if(init) lastMessageTime = data.data[0].time;
                    else checkNewMessage(data);
                } catch (e) {
                    console.log('Error parsing JSON!');
                }
            } else {
                console.log('Status:', res.statusCode);
            }
        });
}

(async () => {

    console.log('Lancement du bot ...');
    try {
        await client.login(config.botToken);
        console.log('Connecté à l\'API Discord.\n')
    } catch (e) {
        console.error('Impossible de se connecter à l\'API Discord: ' + e);
        process.exit(1);
    }

    await scrape(true);
    console.log('\nInitialisation terminée.' +
        '\nRecherche d\'éventuelles alertes toutes les ' + config.frequency + 's en cours ...');

    setInterval(async () => {
        if (debug) console.log('Nouvelle requête commencée.');
        await scrape(false);
        if (debug) console.log('Requête terminée.');
    }, config.frequency * 1000);
})();