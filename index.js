const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ]
    });

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    console.log(message.content);
    const mess = message.content.toLowerCase();
    if (mess.startsWith('hello') || mess.startsWith('hi')) {
        message.reply(`${mess.toLocaleUpperCase()} from Bot`);
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand() || interaction.commandName !== 'delete') return;
    const channel = interaction.channel;
    if (!channel) return;
    const getMessages = await channel.messages.fetch({ limit: 100 });
    const botMessages = getMessages.filter(message => message.author.bot)
    if (botMessages.length > 0)
        await channel.bulkDelete(botMessages);
    await channel.bulkDelete(getMessages);
    await interaction.reply('Deleted all messages.');
});

client.on('interactionCreate', (interaction) => {
    if (interaction.commandName === 'ping')
        interaction.reply('You are a pong !!');
}
)


client.login(TOKEN);