const request = require('request');
const data = require('./APIroutes');

const url = "https://" + data.APIlogin + ":" + data.APIpassword + "@" + data.messageRoute;

request(
    {
        url : url
    },
    function (error, response, body) {
        console.log(body);
    }
);