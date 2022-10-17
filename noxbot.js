
const Discord = require('discord.js');
const commands = require("./Modules/index.js");
require('dotenv').config();
const activities = require('./Modules/activities.js');
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const jQuery = require('jquery')(window);
const { document } = (new JSDOM('')).window;
global.document = document;
global.jQuery = jQuery;
global.$ = jQuery;

console.log('Creating Discord Client');

global.bot = new Discord.Client();
global.currentActivity = "";

console.log(process.env.BOT_TOKEN);
bot.login(process.env.BOT_TOKEN);

bot.on('debug', console.log);

bot.on('ready', function () {
    console.log('Connected as ' + bot.user.username);
    bot.user.setStatus(env.bot_status);
    //bot.user.setActivity(activities.getActivity(env.discord.website_base_link));
    activities.getActivity(env.website_base_link);
    console.log(currentActivity);
    bot.user.setActivity(currentActivity);
    
});

bot.on('disconnect', function(errMsg, code) {
    console.log('▬▬▬▬▬ Bot Disconnected from Discord with code', code, 'for reason:', errMsg);
    bot.connect();
});

bot.on('message', function (message) {
    commands.commands(env.prefix, message);
});