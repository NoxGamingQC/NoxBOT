const Discord = require('discord.js');
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
global.$ = jQuery = require('jquery')(window);
const env = require("./env.js");


var waitingForReaction = [];

global.authorName = 'NoxGamingQC#0001';
global.website = 'https://rebrand.ly/noxgamingqc';
global.discordServerLink = 'https://discord.gg/6DGc24x';
global.server = {};
global.discordToken = env.discord.bot_token;

//global.TwitchClient = new tmi.client(twitchInit.options);
const talkedRecently = new Set();

global.lastError = null;


console.log('Creating Discord Client');
global.bot = new Discord.Client();


bot.login(discordToken);

bot.on('debug', console.log);

bot.on('ready', function () {
    console.log("Bot Launched...");
    bot.user.setStatus(env.discord.bot_status);
    bot.user.setActivity('Back online.');
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
    if(message == "n!ping") {
        message.channel.send("pong");
    }
});