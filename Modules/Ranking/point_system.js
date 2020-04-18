const { createCanvas, loadImage } = require('canvas');

exports.commands = function (message, prefix) {
    var parts = message.content.split(" ");
    if (parts[0] === prefix + 'rank') {
        const canvas = createCanvas(950, 282);
        const ctx = canvas.getContext('2d')
        dbConnection.query('SELECT * FROM public.discord_users WHERE "ServerID"=\'' + message.guild.id + '\' AND "DiscordID"=\'' + message.author.id + '\'', function (error, discordUser) {
            if (error) {
                reportError.reportError(error, '500', 'An error occured when I tryied to check the discord user table in database to give experience points to a user. (./app.js)');
            }
            if (discordUser.rows[0]) {
                var currentLevel = 0;
                var lastLevelXP = 0;
                for (var level = 0; level < 100; level++) {
                    if (discordUser.rows[0].Experiences >= ((5 * Math.pow(currentLevel, 2) + 50) * currentLevel)) {
                        currentLevel = level;
                    }
                }
                var currentLevelXP = ((5 * Math.pow(currentLevel, 2) + 50) * currentLevel);
                var lastLevelXP = currentLevelXP != 0 ? ((5 * Math.pow((currentLevel - 1), 2) + 50) * (currentLevel - 1)) : 0;

                dbConnection.query('SELECT * FROM public.discord_users WHERE "ServerID"=\'' + message.guild.id + '\'', function (error, serverUsers) {
                    var userRank = null;
                    var serverRank = serverUsers.rows.sort(function (a, b) {
                        return a.Experiences - b.Experiences
                    }).reverse();

                    serverRank.forEach(function(user, key) {
                        if(user.DiscordID == message.author.id) {
                            userRank = key + 1;
                        }
                    });


                    loadImage(message.author.avatarURL).then( function(avatar) {
                        var mainColor = embedColor.success.toString(16);
                        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(mainColor);
                        var red = Math.floor(parseInt(result[1], 16) / 100 * 50);
                        var green = Math.floor(parseInt(result[2], 16) / 100 * 50);
                        var blue = Math.floor(parseInt(result[3], 16) / 100 * 50);

                        ctx.beginPath();
                        ctx.fillStyle = '#' + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)
                        ctx.rect(0, 0, canvas.width, canvas.height);
                        ctx.fill();

                        ctx.beginPath();
                        ctx.fillStyle = 'rgba(0, 0, 0, 0.50)';
                        ctx.rect(10, 10, canvas.width - 20, canvas.height - 20);
                        ctx.fill();

                        ctx.beginPath();
                        ctx.fillStyle = 'grey';
                        ctx.rect(250, 200, 650, 50);
                        ctx.fill();

                        ctx.beginPath();
                        ctx.fillStyle = '#' + mainColor;
                        ctx.rect(250, 200, (650 * ((discordUser.rows[0].Experiences - lastLevelXP) / (currentLevelXP - lastLevelXP))), 50);
                        ctx.fill();

                        ctx.drawImage(avatar, 30, 40, 200, 200);


                        ctx.fillStyle = "white";
                        ctx.font = "30px Comic Sans MS";
                        ctx.fillText("RANK", canvas.width - 400, 100);
                        ctx.font = "60px Comic Sans MS";
                        ctx.fillText("#" + userRank, canvas.width - 310, 100);
                        var currentRankWidth = ctx.measureText('#' + userRank).width

                        ctx.fillStyle = '#' + mainColor;
                        ctx.font = "30px Comic Sans MS";
                        ctx.fillText("LEVEL", canvas.width - 310 + currentRankWidth + 20, 100);
                        var levelWidth = ctx.measureText('LEVEL').width
                        ctx.font = "60px Comic Sans MS";
                        ctx.fillText(currentLevel, canvas.width - 310 + currentRankWidth + 20 + levelWidth, 100);

                        ctx.font = "40px Comic Sans MS";
                        ctx.fillText(message.author.username, canvas.width / 2 - 200, canvas.height / 2 + 30);
                        ctx.fillStyle = "grey";
                        var usernameTextWidth = ctx.measureText(message.author.username).width
                        ctx.font = "25px Comic Sans MS";
                        ctx.fillText('#' + message.author.discriminator, canvas.width / 2 - 200 + usernameTextWidth + 5, canvas.height / 2 + 30);
                        ctx.fillStyle = "white";
                        ctx.fillText((discordUser.rows[0].Experiences - lastLevelXP), canvas.width - 250, canvas.height / 2 + 30);
                        var currentXPWidth = ctx.measureText(discordUser.rows[0].Experiences - lastLevelXP + ' ').width
                        ctx.fillStyle = "grey";
                        ctx.fillText("/ " + (currentLevelXP - lastLevelXP) + " XP", canvas.width - 250 + currentXPWidth, canvas.height / 2 + 30);

                        message.channel.send('', { files: [canvas.toBuffer()] });
                    });
                });
            }
        });

        if (message && message.deletable) {
            message.delete();
        }
    }
}
