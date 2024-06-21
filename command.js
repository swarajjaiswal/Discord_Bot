const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'delete',
        description: 'deletes all messages',
    },
    {
        name: 'ping',
        description: 'returns a pong',
    },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(Client_Id),
            { body: commands }
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error('Error reloading application (/) commands:', error);
    }
})();
