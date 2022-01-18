const config = require('../config.json')
const axios = require('axios')
const discord = require('discord.js')
const {CommandOptionType, SlashCommand} = require('slash-create');

module.exports = class Dog extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: "dog",
            description: "Sends you a random dog picture from the internet.",
            guildIDs: config.guildId,
            defaultPermission: true,
            deferEphemeral: true
        });

        this.filename = __filename;
    }

    async run(ctx) {

        const response = await axios.get(`${config.dogApiUrl}`);
        const dog = response.data.message;

        return {
            embeds: [
                new discord.MessageEmbed()
                    .setColor('GREEN')
                    .setTimestamp()
                    .setDescription(':dog:')
                    .setImage(dog)
            ]
        };
    };
}