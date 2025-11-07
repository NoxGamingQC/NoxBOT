import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, getVoiceConnection, VoiceConnectionStatus, entersState } from '@discordjs/voice';
import ytdl from 'ytdl-core';
import fetch from 'node-fetch';

const guilds = new Map();

function ensure(guildId) {
  if (!guilds.has(guildId)) {
    guilds.set(guildId, {
      songs: [],
      player: createAudioPlayer(),
      connection: null,
      playing: false,
      apiUrl: `${process.env.WEBSITE_API.replace(/\/$/, '')}/noxbot/music/queue/${guildId}`
    });

    // when player becomes idle -> play next
    const g = guilds.get(guildId);
    g.player.on(AudioPlayerStatus.Idle, async () => {
      // small delay to let events settle
      await playNext(guildId).catch(console.error);
    });
  }
  return guilds.get(guildId);
}

async function connect(voiceChannel) {
  const conn = joinVoiceChannel({
    channelId: voiceChannel.id,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    selfDeaf: false,
  });
  try {
    await entersState(conn, VoiceConnectionStatus.Ready, 20000);
  } catch (err) {
    conn.destroy();
    throw err;
  }
  return conn;
}

async function loadQueueFromAPI(guildId) {
  const g = ensure(guildId);
  try {
    const res = await fetch(g.apiUrl, { method: 'GET' });
    if (!res.ok) {
      // no queue stored or API error -> keep local empty
      return;
    }
    const json = await res.json();
    if (Array.isArray(json.songs)) {
      g.songs = json.songs;
    }
  } catch (err) {
    console.error('loadQueueFromAPI', err);
  }
}

async function saveQueueToAPI(guildId) {
  const g = guilds.get(guildId);
  if (!g) return;
  try {
    await fetch(g.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ songs: g.songs }),
    });
  } catch (err) {
    console.error('saveQueueToAPI', err);
  }
}

async function playNext(guildId) {
  const g = guilds.get(guildId);
  if (!g) return;
  const next = g.songs.shift();
  await saveQueueToAPI(guildId);

  if (!next) {
    g.playing = false;
    return;
  }

  try {
    const stream = ytdl(next.url, { filter: 'audioonly', highWaterMark: 1 << 25 });
    const resource = createAudioResource(stream, { inlineVolume: true });
    if (resource.volume) resource.volume.setVolume(1);
    g.player.play(resource);
    g.playing = true;
  } catch (err) {
    console.error('playNext error', err);
    // try next
    return playNext(guildId);
  }
}

export default {
  async initGuild(guildId) {
    ensure(guildId);
    await loadQueueFromAPI(guildId);
  },

  async ensureConnectionFor(voiceChannel) {
    const guildId = voiceChannel.guild.id;
    const g = ensure(guildId);

    if (!g.connection || getVoiceConnection(guildId) == null) {
      g.connection = await connect(voiceChannel);
      g.connection.subscribe(g.player);
    }
    return g;
  },

  async enqueue(voiceChannel, url, title, requesterTag) {
    const guildId = voiceChannel.guild.id;
    const g = await this.ensureConnectionFor(voiceChannel);

    g.songs.push({ url, title, requester: requesterTag });
    await saveQueueToAPI(guildId);

    if (!g.playing) {
      await playNext(guildId);
    }
    return g.songs.length;
  },

  async skip(guildId) {
    const g = guilds.get(guildId);
    if (!g) return false;
    g.player.stop(true);
    return true;
  },

  async pause(guildId) {
    const g = guilds.get(guildId);
    if (!g) return false;
    return g.player.pause();
  },

  async resume(guildId) {
    const g = guilds.get(guildId);
    if (!g) return false;
    return g.player.unpause();
  },

  async stop(guildId) {
    const g = guilds.get(guildId);
    if (!g) return false;
    g.songs = [];
    g.player.stop();
    g.playing = false;
    await saveQueueToAPI(guildId);
    return true;
  },

  async leave(guildId) {
    const g = guilds.get(guildId);
    const conn = getVoiceConnection(guildId);
    if (conn) conn.destroy();
    if (g) {
      g.songs = [];
      g.playing = false;
      g.connection = null;
      await saveQueueToAPI(guildId);
    }
    guilds.delete(guildId);
    return true;
  },

  getQueue(guildId) {
    const g = guilds.get(guildId);
    return g ? g.songs : [];
  }
};
