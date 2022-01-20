const request = require('request');
const constants = require('./APIroutes');

const url = "https://" + constants.APIlogin + ":" + constants.APIpassword + "@" + constants.messageRoute;

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
                    const parsedDate = date.getDay() + "/" + date.getMonth()+1 + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
                    console.log(parsedDate + " - " + hex_to_ascii(it.data));
                }

            } catch (e) {
                console.log('Error parsing JSON!');
            }
        } else {
            console.log('Status:', res.statusCode);
        }

    }
);

function hex_to_ascii(str1)
{
    var hex  = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}