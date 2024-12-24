import requestHandler from './requestHandler.js';

export default function setActivity (client) {
    var url = process.env.WEBSITE_API_LINK + "noxbot/activity?key=" + process.env.WEBSITE_TOKEN;
    requestHandler(url, "GET", dataHandler, null, null, client)
};

function dataHandler(result) {
    const keys = Object.keys(result);
    const randIndex = Math.floor(Math.random() * keys.length);
    const randKey = keys[randIndex];
    discordBot.user.setActivity(process.env.PREFIX + result[randKey]);
}