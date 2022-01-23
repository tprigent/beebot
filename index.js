/* Requirements */
const request = require('request');
const constants = require('./APIroutes');
const { Client, Intents } = require('discord.js');
const config = require('./discordConfig.json');

let debug = true;

var lastMessageTime = '';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

/* SigFox API */
const url = 'https://' + constants.APIlogin + ':' + constants.APIpassword + '@' + constants.messageRoute;

function hex_to_ascii(str1){
    const hex  = str1.toString();
    let str = '';
    for (let n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

function notifyBot(debug, msg){
    client.on('ready', () => {
        if(debug){
            client.channels.cache.find(ch => ch.name === 'alertes-debug').send(msg);
        } else {
            client.channels.cache.find(ch => ch.name === 'alertes').send(msg);
        }
    });
}

function checkNewMessage(data){
    if(data.data[0].time === lastMessageTime) return;
    else {
        notifyBot(debug, buildMessage('Activité suspecte autour de la ruche', data.data[0].time))
    }
}

function buildMessage(msg, time){
    const date = new Date(time);
    const parsedDate = date.getDay() + '/' + date.getMonth()+1 + '/' + date.getFullYear()
    const parsedHour = date.getHours() + ':' + date.getMinutes();
    return '⚠️ **Nouvelle alerte détectée** ⚠️ \nType d\'alerte: ' + msg + '\nDate: ' + parsedDate + '\nHeure: ' + parsedHour;
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
        await client.login(config.BOT_TOKEN);
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