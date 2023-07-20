
var Discord = require('discord.js');
var commands = require("./Modules/index.js");
require('dotenv').config();
var activities = require('./Modules/activities.js');
var pointSystem = require('./Modules/pointSystem.js');
var { JSDOM } = require( "jsdom" );
var { window } = new JSDOM( "" );
var jQuery = require('jquery')(window);
var { document } = (new JSDOM('')).window;

global.document = document;
global.$ = jQuery;

console.log('Creating Discord Client');

global.bot = new Discord.Client();

bot.login(process.env.BOT_TOKEN);

//bot.on('debug', console.log);

bot.on('ready', function () {
    console.log('Connected as ' + bot.user.username);
    bot.user.setStatus(process.env.BOT_STATUS);
    activities.setActivity(bot);
    updateByTime();
});

bot.on('disconnect', function(errMsg, code) {
    console.log('▬▬▬▬▬ Bot Disconnected from Discord with code', code, 'for reason:', errMsg);
    bot.connect();
});

bot.on('message', function (message) {
    commands.commands(message);
    //pointSystem.addPoints(message.author.id, "Chatting in Discord");
});

function updateByTime() {
    setInterval(function () {
        activities.setActivity(bot);
    }, process.env.UPDATE_TIME);
}