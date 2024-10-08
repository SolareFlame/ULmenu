require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const deployCommands = [
    new SlashCommandBuilder()
        .setName('new')
        .setDescription('Configure un nouveau ping')
        .toJSON(),

    new SlashCommandBuilder()
        .setName('menu')
        .setDescription('Affiche le menu du jour')
        .addNumberOption(option =>
            option.setName('id')
                .setDescription('ID du restaurant')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('repas')
                .setDescription('Repas du jour')
                .setRequired(true)
                .addChoices(
                    { name: 'midi', value: 'midi' },
                    { name: 'soir', value: 'soir' }
                )
        )
        .toJSON()
];

async function deploy() {
    try {
        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

        console.log('Started refreshing ALL application (/) deployCommands.');

        await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
            body: deployCommands,
        });

        console.log('Successfully reloaded ALL application (/) deployCommands.');
    } catch (error) {
        console.error("Error while deploying global commands: ", error);
    }
}

module.exports = { deploy };

