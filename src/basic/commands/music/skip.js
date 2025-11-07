import { Events } from 'discord.js';
import manager from './manager.js';

export default function skip(client, commands) {
  commands.push({
    name: 'skip',
    description: 'Skip the current track',
  });

  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isCommand()) return;
    if (interaction.commandName !== 'skip') return;

    try {
      const ok = await manager.skip(interaction.guildId);
      return interaction.reply({ content: ok ? 'Skipped current track.' : 'Nothing to skip.', ephemeral: true });
    } catch (err) {
      console.error('skip', err);
      return interaction.reply({ content: 'Error while skipping.', ephemeral: true });
    }
  });
}
