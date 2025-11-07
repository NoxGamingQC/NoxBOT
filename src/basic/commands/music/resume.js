import { Events } from 'discord.js';
import manager from './manager.js';

export default function resume(client, commands) {
  commands.push({
    name: 'resume',
    description: 'Resume playback',
  });

  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName !== 'resume') return;

    try {
      const ok = await manager.resume(interaction.guildId);
      return interaction.reply({ content: ok ? 'Resumed.' : 'Nothing to resume.', ephemeral: true });
    } catch (err) {
      console.error('resume', err);
      return interaction.reply({ content: 'Error while resuming.', ephemeral: true });
    }
  });
}
