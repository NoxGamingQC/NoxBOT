exports.loadChangeEvent = function(bot) {
    if(process.env.WEBSITE_API_LINK && process.env.WEBSITE_TOKEN && process.env.ENVIRONEMENT == 'production') {
        bot.on('userUpdate', (oldUser, newUser) => {
            if (oldUser.username !== newUser.username) {
                updateUser(oldUser.id, newUser.username, newUser.avatarURL)
            } 
        });
    }
}

exports.updateUser = function(id, username, avatarURL) {
    if(process.env.WEBSITE_API_LINK && process.env.WEBSITE_TOKEN && process.env.ENVIRONEMENT == 'production') {
        var user = {};
        user[id] = {
            id: id,
            username: username,
            avatar_url: avatarURL
        }
        $.ajax({
            url: process.env.WEBSITE_API_LINK + "discord/update",
            type: "POST",
            data: {
                website_token: process.env.WEBSITE_TOKEN,
                users: user,
            }
        });
    }
}