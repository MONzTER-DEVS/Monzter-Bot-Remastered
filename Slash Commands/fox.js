const config = require('../config.json')
const axios = require('axios')
const discord = require('discord.js')
const {CommandOptionType, SlashCommand} = require('slash-create');

module.exports = class Fox extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'fox',
            description: 'Sends you a cute fox picture from the internet.',
            guildIDs: config.guildId,
            defaultPermission: true,
            deferEphemeral: true
        });

        this.filename = __filename;
    }

    async run(ctx) {
        const response = await axios.get(config.foxApiUrl);
        let fox = response.data.image;

        if (!fox.endsWith('.mp4')) {
            const embed = new discord.MessageEmbed()
                .setTitle(':fox:')
                .setImage(`${fox}`)
                .setColor('RED')
                .setTimestamp()

            return ({embeds: [embed]})

        } else {
            return;
        }
        ;
    };
};