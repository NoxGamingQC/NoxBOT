var jsdom = require('jsdom');
const Discord = require('discord.js');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
const commands = require("./Modules/index.js");
global.document = document;
global.$ = jQuery = require('jquery')(window);
global.env = require("./env.js");

console.log('Creating Discord Client');

global.bot = new Discord.Client();

bot.login(env.discord.bot_token);

bot.on('debug', console.log);

bot.on('ready', function () {
    console.log('Connected as ' + bot.user.username);
    bot.user.setStatus(env.discord.bot_status);
    bot.user.setActivity(bot.user.username + ' is back online.');
});

bot.on('disconnect', function(errMsg, code) {
    console.log('▬▬▬▬▬ Bot Disconnected from Discord with code', code, 'for reason:', errMsg);
    bot.connect();
});

bot.on('message', function (message) {
    commands.index(env.discord.prefix, message);
});