/* Requirements */
const request = require('request');
const constants = require('./APIroutes');
const { Client, Intents, Channel } = require('discord.js');
const config = require('./discordConfig.json');

let debug = false;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.login(config.BOT_TOKEN);

/* SigFox API */
const url = 'https://' + constants.APIlogin + ':' + constants.APIpassword + '@' + constants.messageRoute;

request(
    {
        url : url
    },
    function (error, res, body) {
        if (res.statusCode === 200) {
            try {
                const data = JSON.parse(body);

                for(const it of data.data){
                    const date = new Date(it.time);
                    const parsedDate = date.getDay() + '/' + date.getMonth()+1 + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
                    const message = parsedDate + ' - ' + hex_to_ascii(it.data);
                    notifyBot(debug, message);
                }

            } catch (e) {
                console.log('Error parsing JSON!');
            }
        } else {
            console.log('Status:', res.statusCode);
        }

    }
);

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
