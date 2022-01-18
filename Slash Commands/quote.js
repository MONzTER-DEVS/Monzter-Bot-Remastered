const config = require('../config.json')
const axios = require('axios')
const discord = require('discord.js')
const {CommandOptionType, SlashCommand} = require('slash-create');

module.exports = class Quote extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'quote',
            description: 'Generate a random Quote.',
            guildIDs: config.guildId,
            deferEphemeral: true,
            defaultPermission: true
        });

        this.filename = __filename;
    }

    async run(ctx) {
        const response = await axios.get(`${config.quoteApi}`);
        const {
            content,
            author
        } = response.data;
        const embed = new discord.MessageEmbed()
            .setTitle(`**${author}** Once said...`)
            .setDescription(`_"${content}"_`)
            .setColor('RANDOM')
            .setFooter(`Requested by ${ctx.user.username}`)
            .setTimestamp();

        try {
            return ({embeds: [embed]});
        } catch (e) {
            console.log(e);
            return 'There was a _problem_ while executing that Command!';
        }
    }
}