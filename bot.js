const Discord = require('discord.js');
const config = require('./config.json');
const bot = new Discord.Client();
const prefix = config.prefix;

bot.on('ready', function () {
    console.log("Bot Launched...");
    bot.user.setStatus('Online'); // Status can be 'OnLine', 'idle', 'invisible', or 'dnd'
    bot.user.setGame('Watching NoxRacing channel', 'https://www.twitch.tv/noxracing');
});

bot.login(config.token);

bot.on('guildMemberAdd', function(member) {
    const channel = member.guild.channels.find('name', 'everyone_room');
    if (!channel) {
        return;
    }
    channel.send(`${member}, welcome in **${member.guild.name}** :wink:`);
});

bot.on('guildMemberRemove', function(member) {
    const channel = member.guild.channels.find('name', 'everyone_room');
    if (!channel) {
        return;
    }
    channel.send(`**${member}** just left us. Bye bye **${member}** :sob:`);
});

bot.on('message', function(message) {
    if (message.content === prefix + 'ping') {
        message.channel.send(`${bot.user} average ping: ${bot.ping}ms`);
    }
    if (message.content === prefix + 'invite') {
        var server = message.guild;
        if(server) {
            var channel = server.channels.find('name', 'language_setup');
            if(channel) {
                channel.createInvite([options => {
                    maxAge: 86400
                }]).then(function(link) {
                    message.reply(`There is an invite link to the channel: ${link}`);
                });
            } else {
                message.reply(`Server room #language_setup not found`);
            }
        } else {
            message.reply(`Please use this command in a server`);
        }
    }
});

bot.on('message', function(message) {
    var content = message.content;
    var parts = content.split(" ");
    var commandName = parts[0];
    if(commandName === prefix+'avatar') {
        if (!parts[1] || parts[1].indexOf('@') == -1) {
            message.reply('Wrong parameters passed to command: `' + prefix + 'avatar`');
            return;
        }
        var userID = parts[1].replace('@', '').replace('<', '').replace('>', '');
        var userMentionned = null;
        bot.users.forEach(function(user) {
            if(user.id === userID) {
                userMentionned = user;
            };
        });
        if(userMentionned) {
            message.reply(userMentionned.avatarURL);
        } else {
            message.reply('Wrong parameters passed to command: `' + prefix + 'avatar`');
            return;
        }
    }
});

bot.on('message', function(message) {
    if (message.content === prefix + 'commands') {
        message.author.send(`
        ${message.author}, Theres is the list of command you can use!
            **${prefix}commands**: Get ${bot.user} commands
            **${prefix}avatar <mentionned user>:** Show your avatar
            **${prefix}ping:** Show the bot ping
            **${prefix}invite** Create a 24h link to the server
            `);
    }
});
