exports.commands = function (bot, config, message) {
    const prefix = config.prefix;
    if (message.content === prefix + 'warframe codes') {
        var codeList = '';
        message.channel.send({
            embed: {
                color: '9846215',
                author: {
                    name: message.author.username,
                    icon_url: message.author.avatarURL
                },
                title: 'Warframe promo codes',
                description: 'You can redeem these Warframe promo codes on the in game market or on the website under the section promo codes',
                fields: [{
                    name: "These are some Warframe Partner Glyphs code",
                    value: "- ADMIRALBAHROO\n- BIKEMAN\n- BRICKY\n- HOMIINVOCADO\n- IFLYNN\n- KINGGOTTHALION\n- MCIK\n- MOGAMU\n- N00BLSHOWTEK\n- ORIGINALWICKEDFUN\n- SKILLUP\n- SP00NERISM\n- SUMMIT1G\n- TACTICALPOTATO\n- TVSBOH"
                },
                {
                    name: "Free Heat Sword and a weapon slot",
                    value: "- FREESWORD"
                }],
                timestamp: new Date(),
                footer: {
                    icon_url: bot.user.avatarURL,
                    text: "Code can be used only once by account"
                }
            }
        });
        if (message.deletable) {
            message.delete();
        }
    }
}
