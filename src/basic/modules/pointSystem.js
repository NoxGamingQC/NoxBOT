import { Events, MessageFlags, EmbedBuilder } from 'discord.js';

export default function pointSystem (client, commands) {
   client.on('messageCreate', async message => {
        let randomNumber= Math.floor(Math.random() * 10);
        if(randomNumber > 7) { //30% chance to get points
            console.log("Sending points data...");
            let response = await fetch(process.env.WEBSITE_API_LINK + '/points/add', {
            method: 'POST',
            headers: {
                'Authorization': process.env.WEBSITE_TOKEN
            },
            body: JSON.stringify({
                website_token: process.env.WEBSITE_TOKEN,
                discord_id: message.author.id,
                guild_id: message.guild.id,
                points: process.env.BASE_POINT,
                mulitplier: process.env.POINT_MULTIPLIER,
                comment: 'Chatting in a Discord server: ' + message.guild.name + ' (' + message.guild.id + ')'
            })
            });
            if (response.status != 200) {
                console.log("Error when trying to send points data: " + response.status);
            } else {
                console.log("Points data sent successfully.");
            }
        }
    });
}