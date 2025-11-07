import { Events } from 'discord.js';
import manager from './manager.js';

export default function pause(client, commands) {
  commands.push({
    name: 'pause',
    description: 'Pause playback',
  });

  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName !== 'pause') return;

    try {
      const ok = await manager.pause(interaction.guildId);
      return interaction.reply({ content: ok ? 'Paused.' : 'Nothing is playing.', ephemeral: true });
    } catch (err) {
      console.error('pause', err);
      return interaction.reply({ content: 'Error while pausing.', ephemeral: true });
    }
  });
}
