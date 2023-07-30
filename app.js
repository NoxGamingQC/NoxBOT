var Discord = require('discord.js');
var modules = require("./Modules/index.js");
require('dotenv').config();
var activities = require('./Modules/activities.js');
var pointSystem = require('./Modules/pointSystem.js');
var discordUserList = require('./Modules/discordUserList.js');
var discordServerList = require('./Modules/discordServerList.js');
var { JSDOM } = require( "jsdom" );
var { window } = new JSDOM( "" );
var jQuery = require('jquery')(window);
var { document } = (new JSDOM('')).window;

global.document = document;
global.$ = jQuery;

console.log('Creating Discord Client');
global.discordBot = new Discord.Client();
discordBot.login(process.env.BOT_TOKEN);

discordBot.on('ready', function () {
    console.log('Connected to Discord as ' + discordBot.user.username);
    discordBot.user.setStatus(process.env.BOT_STATUS);
    activities.setActivity(discordBot);
    updateByTime();
    discordUserList.loadChangeEvent(discordBot);
});

discordBot.on('disconnect', function(errMsg, code) {
    console.log('▬▬▬▬▬ Bot Disconnected from Discord with code', code, 'for reason:', errMsg);
    discordBot.connect();
});

discordBot.on('message', function (message) {
    discordUserList.updateUser(message.author.id, message.author.username, message.author.avatarURL)
    if(message.guild) {
        discordServerList.getServerConfig(message.guild, message, handleMessage);
        discordServerList.updateServer(message.guild.id, message.guild.name, message.guild.iconURL)
    } else {
        modules.loadAllModules(message, process.env.PREFIX);
    }
});

function handleMessage(message, result) {
    if(pointSystem.isActive()) {
        if(result.can_receive_points) {
            var comment = "Chatting in a Discord server: " + message.guild.name + ' (' + message.guild.id + ')';
            pointSystem.addPoints(message.author.id, comment);
        }
    }
    modules.loadAllModules(message, result.prefix);
}

function updateByTime() {
    setInterval(function () {
        activities.setActivity(discordBot);
    }, process.env.UPDATE_TIME);
}