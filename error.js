exports.reportError = function(error, errorCode = null, errorDescription = null, host = null) {
    if (error) {
        console.log(error);
        var errorGuild = bot.guilds.find(guild => guild.id === '938558244924829756')
        if(!errorGuild) {
            return;
        }
        var errChannel = errorGuild.channels.find(channel => channel.id === '952332413344825404'); // #crash_logs in Nox's Server
        if (!errChannel) {
            return;
        }
        errCode = "500";
        errMessage = "Unknown error";
        if(error.responseJSON) {
            errCode = error.responseJSON.status + ' - ' + error.responseJSON.error;
            errMessage = error.responseJSON.message;
        } else if (error.msg) {
            if(errorCode) {
                errCode = errorCode;
            }
            errMessage = error.message;
        } else if (error.msg) {
            if(errorCode) {
                errCode = errorCode;
            }
            errMessage = error.message;
        }
        
        sendRequest(errChannel, errCode, errMessage);
    }
}

function sendRequest (errChannel, errCode, errMessage) {
    errChannel.send({
        embed: {
            color: 16711680,
            author: {
                name: bot.user.username,
                icon_url: bot.user.avatarURL
            },
            title: 'Error - Code: ' + errCode,
            description: 'Error Message: ' + errMessage,
            timestamp: new Date(),
            footer: {
                icon_url: bot.user.avatarURL,
                text: bot.user.username
            }
        }

    });
}