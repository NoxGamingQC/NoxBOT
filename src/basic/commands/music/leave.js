import { Events } from 'discord.js';
import manager from './manager.js';

export default function leave(client, commands) {
  commands.push({
    name: 'leave',
    description: 'Disconnect the bot from the voice channel',
  });

  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName !== 'leave') return;

    try {
      await manager.leave(interaction.guildId);
      return interaction.reply({ content: 'Left voice channel.', ephemeral: true });
    } catch (err) {
      console.error('leave', err);
      return interaction.reply({ content: 'Error while leaving voice channel.', ephemeral: true });
    }
  });
}
