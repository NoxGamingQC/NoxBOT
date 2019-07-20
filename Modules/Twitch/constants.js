exports.constants = function (client) {
    isSubscriber = function(user) {
        return user.subscriber;
    }

    isModerator = function(user) {
        return user.mod;
    }

    isBroadcaster = function (user) {
        return user.badges.broadcaster == '1';
    }

    getChatters = function(channel, callback) {
        client.api({
            url: "http://tmi.twitch.tv/group/user/" + channel + "/chatters",
            method: "GET"
        }, function (err, res, body) {
            callback(body);
        });
    }
}
