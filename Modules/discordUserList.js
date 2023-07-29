exports.module = function(bot) {
    if(process.env.WEBSITE_API_LINK && process.env.WEBSITE_TOKEN && process.env.ENVIRONEMENT == 'production') {
        bot.on('userUpdate', (oldUser, newUser) => {
            if (oldUser.username !== newUser.username) {
                updateUser(oldUser.id, newUser.username)
            } 
        });
    }
}

exports.updateUser = function(id, username) {
    var user = {};
    user[id] = username;
    $.ajax({
        url: process.env.WEBSITE_API_LINK + "discord/update",
        type: "POST",
        data: {
            website_token: process.env.WEBSITE_TOKEN,
            users: user,
        }
    });
}