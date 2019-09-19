const packageInfo = require('./../package-lock.json');
var os = require('os');

exports.commands = function (dbConnection, bot, serverConfig, message, prefix, embedColor, reportError) {
    if (message.content === prefix + 'info') {

        var totalSeconds = (bot.uptime / 1000);
        var hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = Math.floor(totalSeconds % 60);

        message.channel.send({
            embed: {
                color: embedColor.success,
                author: {
                    name: bot.user.username + ' Statistics',
                    icon_url: bot.user.avatarURL
                },
                title: '',
                description: '',
                thumbnail: {
                    url: bot.user.avatarURL
                },
                fields: [{
                    name: "Uptime",
                    value: '' + hours +' hours, ' + minutes + ' minutes and ' + seconds + ' seconds.'
                },
                {
                    name: "Version",
                        value: '• ' + os.type() + ' ' + os.release() + ' ' + os.arch() + '\n' +
                        '• discord.js ' + packageInfo.dependencies["discord.js"].version + '\n' +
                        '• Node.js ' + global.process.versions['node']
                },
                {
                    name: "Usage",
                    value: '• ' + bot.guilds.array().length + ' servers'
                },
                {
                    name: "Website",
                    value: 'https://rebrand.ly/noxgamingqc'
                },
                {
                    name: "Discord",
                    value: 'https://discord.gg/KPd4cC4'
                },
                {
                    name: "Developer",
                    value: 'NoxGamingQC#3942 • [Website](https://rebrand.ly/noxgamingqc)'
                }
                ],
                timestamp: new Date(),
                footer: {
                    icon_url: message.author.avatarURL,
                    text: message.author.tag
                }
            }
        });
        if (message && message.deletable) {
            message.delete();
        }
    }
}
