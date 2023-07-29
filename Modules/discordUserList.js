exports.module = function(bot) {
    update(bot);
    bot.on('userUpdate', (oldUser, newUser) => {
        if (oldUser.username !== newUser.username) {
            updateUser(oldUser.id, newUser.username)
        } 
    });
}

function updateUser(id, username) {
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

function update(bot) {
    var membersList = {};
    bot.guilds.forEach(function(guild) {
        guild.members.forEach(function(member) {
            if(!membersList[member.id]) {
                membersList[member.id] = member.username
            }
        });
    })
    $.ajax({
        url: process.env.WEBSITE_API_LINK + "discord/update",
        type: "POST",
        data: {
            website_token: process.env.WEBSITE_TOKEN,
            users: membersList,
        }
    });
}