import { Events, MessageFlags } from 'discord.js';
import { createAudioPlayer } from '@discordjs/voice';
import youtubeSearchAPI from 'youtube-search-api';
import  fs from 'fs';
import ytdl from 'ytdl-core';



export default function play (client, commands) {
    commands.push({
        name: 'play',
        description: 'Play some music',
    });

    client.on(Events.InteractionCreate, async interaction  => {
        if (interaction.commandName === 'play') {
            await interaction.deferReply({epohemeral: true});
            try {
                var audioPlayer = createAudioPlayer()
                if(global.connection) {
                    global.connection.subscribe(audioPlayer);
                    console.log(interaction);
                    var args = /*interaction.content.split(' ').slice(1)*/
                    audioPlayer.play(ytdl(args.join(" ")))
                    interaction.editReply({ content: `Song: ` + args.join(" ") + ` , is currently playing`, flags: MessageFlags.Ephemeral});
                } else {
                    interaction.editReply({ content: `I can't find you. Please use /init first.`, flags: MessageFlags.Ephemeral});
                }
            } catch (error) {
                console.log(error);
                interaction.editReply({ content: `An error occured when trying to play a song.`, flags: MessageFlags.Ephemeral});
            }
        }
    });
}



/*
const { createreadstream } = require('fs');
const { join } = require('path');
const { createaudioresource, streamtype, createaudioplayer, joinvoicechannel } = require('@discordjs/voice');

exports.command = function(message, streamOptions) {
    if (message.content.includes(process.env.PREFIX + 'play')) {
        var search = message.content.split(process.env.PREFIX + 'play ')[1];
        var url = '';
        if(!global.connection) {
            init.init(message);
        }
        
        const player = createaudioplayer()
        joinvoicechannel({
            channelid: message.member.voice.channel.id,
            guildid: message.guild.id,
            adaptercreator: message.guild.voiceadaptercreator
        }).subscribe(player)
        if(ytdl.validateURL(search)) {
            url = search;
            if(ytdl.validateURL(url) && search.length > 0) {
                stream = ytdl(url,streamOptions).on('info', (info) => {
                    message.channel.send('🎵 Now playing: `' + info.videoDetails.title + '`');
                });
                
                player.play(stream)
            } else {
                message.reply('Song not found.');
            }
        } else {
            youtubeSearchAPI.GetListByKeyword(search, false, 1, [{type:'video'}])
            .then((response) => {
                message.channel.send('🎵 Now playing: `' + response.items[0].title + '`');
                url = 'https://www.youtube.com/watch?v=' + response.items[0].id;
                if(ytdl.validateURL(url) && search.length > 0) {
                    stream = ytdl(url,streamOptions);
                    player.play(stream)
                } else {
                    message.reply('Song not found.');
                }
            });
        }
    }
};
*/