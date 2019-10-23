exports.commands = function (message, prefix) {
    if(message.content.split(' ')[0].includes(prefix + 'twitchuserinfo') && message.content.split(' ')[1]) {
        $.ajax({
            headers: {
                'Client-ID': twitchInit.options.identity.ClientID,
                'Authorization': twitchInit.options.identity.password
            },
            url: 'https://api.twitch.tv/helix/users?login=' + message.content.split(' ')[1],
            success: function (user) {
                var userData = [];
                if(user.data[0]) {
                    user.data[0].display_name ? userData.push({
                        name: 'Username',
                        value: user.data[0].display_name,
                        inline: true
                    }) : '';

                    user.data[0].id ? userData.push({
                        name: 'ID',
                        value: user.data[0].id,
                        inline: true
                    }) : '';

                    user.data[0].description ? userData.push({
                        name: 'Description',
                        value: user.data[0].description,
                        inline: false
                    }) : '';

                    user.data[0].broadcaster_type ? userData.push({
                        name: 'Type',
                        value: user.data[0].broadcaster_type.charAt(0).toUpperCase() + user.data[0].broadcaster_type.slice(1),
                        inline: true
                    }) : '';

                    user.data[0].view_count ? userData.push({
                        name: 'View Count',
                        value: user.data[0].view_count,
                        inline: true
                    }) : '';

                    message.channel.send({
                        embed: {
                            color: embedColor.twitch,
                            author: {
                                name: bot.user.username + ' - Twitch User Information',
                                icon_url: bot.user.avatarURL
                            },
                            timestamp: new Date(),
                            fields: userData,
                            thumbnail: {
                                url: user.data[0].profile_image_url
                            },
                            footer: {
                                icon_url: message.author.avatarURL,
                                text: message.author.tag
                            }
                        }
                    });
                } else {
                    $.ajax({
                        headers: {
                            'Client-ID': twitchInit.options.identity.ClientID,
                            'Authorization': twitchInit.options.identity.password
                        },
                        url: 'https://api.twitch.tv/helix/users?id=' + message.content.split(' ')[1],
                        success: function (user) {
                            var userData = [];
                            if (user.data[0]) {
                                user.data[0].display_name ? userData.push({
                                    name: 'Username',
                                    value: user.data[0].display_name,
                                    inline: true
                                }) : '';

                                user.data[0].id ? userData.push({
                                    name: 'ID',
                                    value: user.data[0].id,
                                    inline: true
                                }) : '';

                                user.data[0].description ? userData.push({
                                    name: 'Description',
                                    value: user.data[0].description,
                                    inline: false
                                }) : '';

                                user.data[0].broadcaster_type ? userData.push({
                                    name: 'Type',
                                    value: user.data[0].broadcaster_type.charAt(0).toUpperCase() + user.data[0].broadcaster_type.slice(1),
                                    inline: true
                                }) : '';

                                user.data[0].view_count ? userData.push({
                                    name: 'View Count',
                                    value: user.data[0].view_count,
                                    inline: true
                                }) : '';

                                message.channel.send({
                                    embed: {
                                        color: embedColor.twitch,
                                        author: {
                                            name: bot.user.username + ' - Twitch User Information',
                                            icon_url: bot.user.avatarURL
                                        },
                                        timestamp: new Date(),
                                        fields: userData,
                                        thumbnail: {
                                            url: user.data[0].profile_image_url
                                        },
                                        footer: {
                                            icon_url: message.author.avatarURL,
                                            text: message.author.tag
                                        }
                                    }
                                });
                            } else {
                                message.channel.send({
                                    embed: {
                                        color: embedColor.error,
                                        author: {
                                            name: bot.user.username,
                                            icon_url: bot.user.avatarURL
                                        },
                                        title: 'Error - Invalid user',
                                        description: 'User does not exists',
                                        timestamp: new Date(),
                                        footer: {
                                            icon_url: message.author.avatarURL,
                                            text: message.author.tag
                                        }
                                    }
                                });
                            }
                        },

                        error: function() {

                        }
                    });
                }





                if (message && message.deletable) {
                    message.delete();
                }
            },
            error: function (error) {
                message.channel.send({
                    embed: {
                        color: embedColor.error,
                        author: {
                            name: bot.user.username,
                            icon_url: bot.user.avatarURL
                        },
                        title: 'Error ' + error.responseJSON.status + ' - ' + error.responseJSON.error,
                        description: '' + error.responseJSON.message,
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
        });
    }


}
