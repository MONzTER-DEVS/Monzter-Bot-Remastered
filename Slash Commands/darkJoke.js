const config = require('../config.json');
const axios = require('axios');
const discord = require('discord.js');
const {CommandOptionType, SlashCommand} = require('slash-create');

module.exports = class DarkJoke extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'darkjoke',
            description: 'Generate a dark joke.',
            deferEphemeral: true,
            defaultPermission: true,
            guildIDs: config.guildId
        });

        this.filename = __filename;
    }

    async run(ctx) {
        const response = await axios.get(`${config.jokeApi}Dark`);
        const setup = response.data.setup;
        const delivery = response.data.delivery;

        if (ctx.user.id === '554301512227094528') {
            const embed = new discord.MessageEmbed()
                .setDescription(`${setup}\n${delivery}`)
                .setTimestamp()
                .setColor('RANDOM')

            await ctx.send({embeds: [embed]})
        } else {
            return 'This command is not available to Peasants.';
        }
    }
}