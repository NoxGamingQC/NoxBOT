import { Events } from 'discord.js';
import manager from './manager.js';

export default function stop(client, commands) {
  commands.push({
    name: 'stop',
    description: 'Stop playback and clear the queue',
  });

  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName !== 'stop') return;

    try {
      const ok = await manager.stop(interaction.guildId);
      return interaction.reply({ content: ok ? 'Stopped and cleared queue.' : 'Nothing to stop.', ephemeral: true });
    } catch (err) {
      console.error('stop', err);
      return interaction.reply({ content: 'Error while stopping.', ephemeral: true });
    }
  });
}
