exports.listener = function () {
    if (!config.development) {
        var updateInterval = (20 * (60 * 1000 ));
        setInterval(function () {
            dbConnection.query('SELECT * FROM public.twitch_live', function (error, result, fields) {
                if (error) {
                    reportError.reportError(error, '500', 'An error occured when I tryied to check the twitch live table in the database. (./Modules/Twitch/event_listeners.js)');
                    return;
                }
                result.rows.forEach(function (twitchLive) {
                    $.ajax({
                        headers: {
                            'Client-ID': twitchInit.options.identity.ClientID,
                            'Authorization': twitchInit.options.identity.password
                        },
                        url: 'https://api.twitch.tv/helix/streams?user_id=' + twitchLive.UserID,
                        success: function (stream) {
                            if (stream.data[0] && stream.data[0].type === 'live' && twitchLive.isLive === false) {
                                $.ajax({
                                    headers: {
                                        'Client-ID': twitchInit.options.identity.ClientID,
                                        'Authorization': twitchInit.options.identity.password
                                    },
                                    url: 'https://api.twitch.tv/helix/games?id=' + stream.data[0].game_id,
                                    success: function (game) {
                                        $.ajax({
                                            headers: {
                                                'Client-ID': twitchInit.options.identity.ClientID,
                                                'Authorization': twitchInit.options.identity.password
                                            },
                                            url: 'https://api.twitch.tv/helix/users?id=' + stream.data[0].user_id,
                                            success: function (user) {
                                                var liveChannel = bot.guilds.find(guild => guild.id === twitchLive.ServerID).channels.find(channel => channel.id === twitchLive.ChannelID);
                                                if(liveChannel) {
                                                    liveChannel.send('Hey guys, ' + stream.data[0].user_name + ' is now live on Twitch ! Go check it out! https://www.twitch.tv/' + stream.data[0].user_name.toLowerCase() + '', {
                                                        embed: {
                                                            color: '6570404',
                                                            author: {
                                                                name: stream.data[0].user_name + ' is now live on Twitch!',
                                                                icon_url: user.data[0].profile_image_url
                                                            },
                                                            title: stream.data[0].title,
                                                            fields: [{
                                                                name: 'Game',
                                                                value: game.data[0] ? game.data[0].name : 'N/A',
                                                                inline: true
                                                            },
                                                            {
                                                                name: 'Viewers',
                                                                value: stream.data[0].viewer_count,
                                                                inline: true
                                                            }],
                                                            url: 'https://twitch.tv/' + stream.data[0].user_name.toLowerCase(),
                                                            timestamp: new Date(),
                                                            thumbnail: {
                                                                url: user.data[0].profile_image_url
                                                            },
                                                            image: {
                                                                url: stream.data[0].thumbnail_url.replace('{width}', 320).replace('{height}', 180)
                                                            }
                                                        }
                                                    });
                                                } else {
                                                    reportError.reportError(error, '404', 'Cannot find Guild or room. Server ID = ' + twitchLive.ServerID + ' Channel ID = twitchLive.ChannelID');
                                                }
                                            },
                                            error(error) {
                                                reportError.reportError(error);
                                                console.log(error)
                                            }
                                        });
                                    },
                                    error (error) {
                                        reportError.reportError(error);
                                        console.log(error)
                                    }
                                });
                                dbConnection.query('UPDATE public.twitch_live SET "isLive"=\'true\' WHERE "ID"=\'' + twitchLive.ID + '\'', function(error, result) {
                                    if (error) {
                                        reportError.reportError(error, '500', 'An error occured when I tryied to update a user live on twitch | _Twitch Live is active_. (./Modules/Twitch/event_listeners.js)');
                                    }
                                });
                            } else {
                                if ((!stream.data[0] || stream.data[0].type !== 'live') && twitchLive.isLive === 'true') {
                                    dbConnection.query('UPDATE public.twitch_live SET "isLive"=\'false\' WHERE "ID"=\'' + twitchLive.ID + '\'', function(error, result) {
                                        if (error) {
                                            reportError.reportError(error, '500', 'An error occured when I tryied to update a user that completed his live on twitch | _Twitch Live is inactive_. (./Modules/Twitch/event_listeners.js)');
                                        }
                                    });
                                }
                            }
                        },
                        error: function (error) {
                            reportError.reportError(error);
                            console.log(error)
                        }
                    });
                });
            });
        }, updateInterval)
    }
}
