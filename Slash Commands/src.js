const config = require('../config.json')
const discord = require('discord.js')
const {CommandOptionType, SlashCommand} = require('slash-create');

module.exports = class Src extends SlashCommand{
    constructor(creator) {
        super(creator, {
            name: 'src',
            description: 'Get the Source Code of the Bot.',
            deferEphemeral: true,
            defaultPermission: true,
            guildIDs: config.guildId
        });

        this.filename = __filename;
    }

    async run(ctx){
        const embed = new discord.MessageEmbed()
            .setDescription('[Click me to get my Source Code.](https://github.com/MONzTER-DEVS/Monzter-Bot-Recoded)')
            .setTimestamp()
            .setColor('RANDOM')

        try{
            return ({embeds: [embed]})
        } catch(e){
            return `There was an error while executing the Command!`
        }
    }
}