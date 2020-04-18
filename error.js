exports.reportError = function(error, errorCode = null, errorDescription = null, host = null) {
    if (error) {
        console.log(error);
        var errorGuild = bot.guilds.find(guild => guild.id === '605028700182020101')
        if(!errorGuild) {
            return;
        }
        var errChannel = errorGuild.channels.find(channel => channel.id === '605898526362304512'); // #crash_logs in Nox's Server
        if (!errChannel) {
            return;
        }
        if (error.msg) {
            errChannel.send({
                embed: {
                    color: 16711680,
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                    },
                    title: 'Error - Code: ' + error.code,
                    description: 'Error Message: ' + error.msg,
                    timestamp: new Date(),
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: bot.user.username
                    }
                }

            });
        } else if (error.responseText && error.responseJSON) {
            errChannel.send({
                embed: {
                    color: 16711680,
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                    },
                    title: 'Error - Code: ' + error.responseJSON.status + ' - ' + error.responseJSON.error,
                    description: error.responseJSON.message,
                    timestamp: new Date(),
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: bot.user.username
                    }
                }

            });
        } else if (error.message !== null && errorCode === null && errorDescription === null) {
            errChannel.send({
                embed: {
                    color: 16711680,
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                    },
                    title: 'Error - Code: 500',
                    description: 'Error Message: ' + error.message,
                    timestamp: new Date(),
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: bot.user.username
                    }
                }
            });
        } else if (error.message !== null && errorCode !== null && errorDescription === null) {
            errChannel.send({
                embed: {
                    color: 16711680,
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                    },
                    title: 'Error - Code: ' + errorCode,
                    description: 'Error Message: ' + error.message,
                    timestamp: new Date(),
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: bot.user.username
                    }
                }
            });
        } else if (error.message !== null && errorCode !== null && errorDescription !== null) {
            var data = [];
            data.push({
                name: 'Error Message',
                value: error.message
            });

            if (error.request && error.request.connection && error.request.connection._host) {
                data.push({
                    name: 'Host',
                    value: error.request.connection._host
                });
            }

            var code = (error.code ? error.code : errorCode)

            errChannel.send({
                embed: {
                    color: 16711680,
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                    },
                    title: 'Error - Code: ' + code,
                    description: errorDescription,
                    timestamp: new Date(),
                    fields: data,
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: bot.user.username
                    }
                }
            });
        } else if (error.message == null && errorCode !== null && errorCode !== null && errorDescription !== null) {
            errChannel.send({
                embed: {
                    color: 16711680,
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                    },
                    title: 'Error - Code: ' + errorCode,
                    description: 'Error Message: ' + errorDescription,
                    timestamp: new Date(),
                    fields: [{
                        name: 'Description',
                        value: errorDescription
                    }],
                    footer: {
                        icon_url: bot.user.avatarURL,
                        text: bot.user.username
                    }
                }
            });
        }
        errChannel = null;
    }
}