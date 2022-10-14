
import Discord from 'discord.js';
import commands from "./Modules/index.js";
import env from "./env.cjs";
import activity from './Modules/activity.js';
global.env = env;

console.log('Creating Discord Client');

global.bot = new Discord.Client();

bot.login(env.discord.bot_token);

bot.on('debug', console.log);

bot.on('ready', function () {
    console.log('Connected as ' + bot.user.username);
    bot.user.setStatus(env.discord.bot_status);
    bot.user.setActivity(activity(env.discord.website_base_link));
    
});

bot.on('disconnect', function(errMsg, code) {
    console.log('▬▬▬▬▬ Bot Disconnected from Discord with code', code, 'for reason:', errMsg);
    bot.connect();
});

bot.on('message', function (message) {
    commands(env.discord.prefix, message);
});