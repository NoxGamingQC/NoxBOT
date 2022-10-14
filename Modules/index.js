import inviteModule from "./invite.js";

export default (prefix, message) => {
    inviteModule(prefix, message);

    if(message == prefix + "ping") {
        message.channel.send("pong");
    }
};