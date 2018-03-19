const Discord = require('discord.js');
const opus = require('opusscript');
const auth = require('./auth.json');
const config = require('./config.json');
const serversCommands = require('./Servers/index.js');
//const music = require('./Modules/music.js');

const bot = new Discord.Client({autoReconnect:true});
const prefix = config.prefix;

bot.on('ready', function () {
    console.log("Bot Launched...");
    if(config.development) {
        //bot.user.setAvatar('./img/avatar/NoxButtBeta.png'); //Uncomment to change bot avatar in devlopement
        bot.user.setStatus('dnd');
        bot.user.setActivity(prefix + 'commands | Testing 1..2..3', { 'url': 'https://www.twitch.tv/noxracing', 'type':'STREAMING'});
    } else {
        //bot.user.setAvatar('./img/avatar/NoxButt.png'); //Uncomment to change bot avatar in production
        bot.user.setStatus('Online');
        bot.user.setActivity(prefix + 'commands');
    }
});

bot.login(auth.token);

serversCommands.serversModules(bot, config);

bot.on('message', function (message) {
    serversCommands.serversCommands(bot, config, message);
    //music.commands(bot, auth, config, opus, message);
});
