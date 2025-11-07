import { Events } from "discord.js";
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  getVoiceConnection,
} from "@discordjs/voice";
import ytdl from "ytdl-core";

// ---- queue per guild
export const queues = new Map();

// ---- simple YouTube search via fetch + regex
async function searchYoutube(query) {
  try {
    const res = await fetch(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`
    );
    const html = await res.text();
    const match = html.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
    if (!match) return null;
    return `https://www.youtube.com/watch?v=${match[1]}`;
  } catch {
    return null;
  }
}

// ---- init queue for guild
function ensureGuildQueue(guildId) {
  if (!queues.has(guildId)) {
    queues.set(guildId, {
      songs: [],
      player: createAudioPlayer(),
      playing: false,
      connection: null,
    });
  }
  return queues.get(guildId);
}

// ---- play next song
function playNext(guildId) {
  const g = queues.get(guildId);
  if (!g || g.songs.length === 0) {
    g.playing = false;
    return;
  }

  const next = g.songs.shift();
  const stream = ytdl(next.url, { filter: "audioonly", highWaterMark: 1 << 25 });
  const resource = createAudioResource(stream);
  g.player.play(resource);
  g.playing = true;

  g.player.once(AudioPlayerStatus.Idle, () => {
    playNext(guildId);
  });
}

// ---- main export
export default function play(client, commands) {
  commands.push({
    name: "play",
    description: "Join your voice channel and play a YouTube URL or search keywords",
    options: [
      {
        name: "query",
        description: "YouTube URL or search keywords",
        type: 3,
        required: true,
      },
    ],
  });

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName !== "play") return;

    const guildId = interaction.guildId;
    const g = ensureGuildQueue(guildId);

    try {
      // DEFER IMMEDIATELY
      await interaction.deferReply({ ephemeral: true });

      const query = interaction.options.getString("query");
      if (!interaction.member.voice?.channel) {
        return await interaction.editReply({
          content: ":face_with_spiral_eyes: You must be in a voice channel first.",
        });
      }

      // Resolve URL
      let url = query;
      if (!ytdl.validateURL(query)) {
        const found = await searchYoutube(query);
        if (!found) return await interaction.editReply({ content: ":mag: No results found." });
        url = found;
      }

      let info;
      try {
        info = await ytdl.getInfo(url);
      } catch {
        return await interaction.editReply({ content: ":x: Failed to get video info." });
      }

      const title = info.videoDetails.title;

      // Connect to voice
      if (!g.connection || getVoiceConnection(guildId) === undefined) {
        g.connection = joinVoiceChannel({
          channelId: interaction.member.voice.channel.id,
          guildId,
          adapterCreator: interaction.member.voice.guild.voiceAdapterCreator,
        });
        g.connection.subscribe(g.player);
      }

      // Enqueue
      g.songs.push({ url, title, requester: interaction.user.tag });
      if (!g.playing) playNext(guildId);

      // Safe reply
      try {
        if (interaction.deferred || interaction.replied) {
          await interaction.followUp({ content: `:notes: Queued **${title}**!`, ephemeral: true });
        } else {
          await interaction.reply({ content: `:notes: Queued **${title}**!`, ephemeral: true });
        }
      } catch {}
    } catch (err) {
      console.error("Play command failed:", err);
      try {
        if (!interaction.replied && !interaction.deferred) {
          await interaction.reply({ content: ":x: Something went wrong.", ephemeral: true });
        } else {
          await interaction.followUp({ content: ":x: Something went wrong.", ephemeral: true });
        }
      } catch {}
    }
  });
}
