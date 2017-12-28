const Discord = require('discord.js');
const config = require('./config.json');
const modules = require('./commands.json');
const bot = new Discord.Client({autoReconnect:true});
const prefix = config.prefix;

bot.on('ready', function () {
    console.log("Bot Launched...");
    if(config.development) {
        bot.user.setStatus('dnd'); // Status can be 'OnLine', 'idle', 'invisible', or 'dnd'
        bot.user.setGame(prefix + 'commands | In development...');
    } else {
        bot.user.setStatus('Online');
        bot.user.setGame(prefix+'commands');
    }
});

bot.login(config.token);

if(modules.welcome_join) {
    bot.on('guildMemberAdd', function(member) {
        const channel = member.guild.channels.find('name', config.room.welcome_page_name);
        if (!channel) {
            return;
        }
        channel.send(`${member}, welcome in **${member.guild.name}** :wink:`);
    });
}

if(modules.welcome_leave) {
    bot.on('guildMemberRemove', function(member) {
        const channel = member.guild.channels.find('name', config.room.welcome_page_name);
        if (!channel) {
            return;
        }
        channel.send(`**${member}** just left us. Bye bye **${member}** :sob:`);
    });
}

bot.on('message', function(message) {
    if (message.content === prefix + 'ping') {
        if(modules.ping) {
            message.channel.send(`${bot.user} average ping: ${bot.ping}ms`);
        } else {
            message.reply(`This command is not available for the moment`);
        }
    }

    if (message.content === prefix + 'invite') {
        if(modules.invite) {
            var server = message.guild;
            if(server) {
                var channel = server.channels.find('name', config.room.invite_room);
                if(channel) {
                    channel.createInvite([options => {
                        maxAge: 86400
                    }]).then(function(link) {
                        message.reply(`There is an invite link to the channel: ${link}`);
                    });
                } else {
                    message.reply(`Server room #${config.room.invite_room} not found`);
                }
            } else {
                message.reply(`Please use this command in a server`);
            }
        } else {
            message.reply(`This command is not available for the moment`);
        }
    }
});

bot.on('message', function(message) {
    var content = message.content;
    var parts = content.split(" ");
    var commandName = parts[0];

    if(commandName === prefix+'avatar') {
        if(modules.avatar) {
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
        }  else {
            message.reply(`This command is not available for the moment`);
        }
    }
});

bot.on('message', function(message) {
    if (message.content === prefix + 'commands') {
        if(modules.commands) {
            message.author.send(`
            ${message.author}, Theres is the list of command you can use!
                **${prefix}commands:** Get ${bot.user} commands
                **${prefix}avatar <mentionned user>:** Show your avatar
                **${prefix}invite:** Create a 24h link to the server
                **${prefix}lmgtfy <search terms>:** Send you a LMGTFY link
                **${prefix}ping:** Show the bot ping
                **${prefix}rank list:** List of all joinable roles
                **${prefix}rank join <role>:** Make you join a role
                **${prefix}rank leave <role>:** Make you leave a role
                `);
        }  else {
            message.reply(`This command is not available for the moment`);
        }
    }
});

//Roles Commands
bot.on('message', function (message) {
    Object.keys(config.assignable_roles).forEach(function(assignableRole) {
        if (message.content === prefix + 'rank join ' + assignableRole) {
            if(modules.rank.join) {
                message.guild.roles.forEach(function (role) {
                    if(role.name == config.assignable_roles[assignableRole]) {
                        message.member.addRole(role.id);
                        message.react("☑");
                    }
                });
            } else {
                message.reply(`This command is not available for the moment`);
            }
        }
        if (message.content === prefix + 'rank leave ' + assignableRole) {
            if (modules.rank.leave) {
                message.guild.roles.forEach(function (role) {
                    if (role.name == config.assignable_roles[assignableRole]) {
                        message.member.removeRole(role.id);
                        message.react("☑");
                    }
                });
            } else {
                message.reply(`This command is not available for the moment`);
            }
        }
    });
});

bot.on('message', function (message) {
    if (message.content === prefix + 'rank list') {
        if (modules.rank.leave) {
            var rankList = [];
            Object.keys(config.assignable_roles).forEach(function (assignableRole) {
                rankList.push('+'+assignableRole);
            });
            var content = rankList.join('\n');
            message.reply('There is a list of joinable roles:\n```diff\n'+content+'```');
        } else {
            message.reply(`This command is not available for the moment`);
        }
    }
});

bot.on('message', function (message) {
    var parts = message.content.split(" ");
    if (parts[0] === prefix + 'lmgtfy') {
        if (modules.lmgtfy) {
            parts.forEach(function(word, key) {
                if(key == 1) {
                    content = word;
                }
                if(key > 1) {
                    content += '+'+word;
                }
            });
            message.reply('Here is a link: http://lmgtfy.com/?q=' + content);
        } else {
            message.reply(`This command is not available for the moment`);
        }
    }
});
