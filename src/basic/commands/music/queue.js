import { Events } from 'discord.js';
import manager from './manager.js';

export default function queueCmd(client, commands) {
  commands.push({
    name: 'queue',
    description: 'Show current queue',
  });

  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName !== 'queue') return;

    try {
      const songs = manager.getQueue(interaction.guildId);
      if (!songs || songs.length === 0) return interaction.reply({ content: 'Queue is empty.', ephemeral: true });

      const text = songs.map((s, i) => `${i + 1}. ${s.title} (requested by ${s.requester})`).slice(0, 25).join('\n');
      return interaction.reply({ content: `**Queue:**\n${text}`, ephemeral: true });
    } catch (err) {
      console.error('queue', err);
      return interaction.reply({ content: 'Error while fetching queue.', ephemeral: true });
    }
  });
}
