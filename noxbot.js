const Discord = require('discord.js');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
global.$ = jQuery = require('jquery')(window);
global.env = require("./env.js");
const commands = require("./Modules/index.js");


var waitingForReaction = [];

global.lastError = null;

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
    lastError = {
        code: code,
        msg: errMsg,
        date: new Date()
    }
    reportError.reportError(lastError, code, ' Bot Disconnected from Discord: ' + errorMsg)

    bot.connect();
});


bot.on('message', function (message) {
    if(message == env.discord.prefix + "ping") {
        message.channel.send("pong");
    }
    commands.index(env.discord.prefix, message);
});