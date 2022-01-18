const config = require('../config.json')
const axios = require('axios')
const discord = require('discord.js')
const {CommandOptionType, SlashCommand} = require('slash-create');

module.exports = class Help extends SlashCommand{
    constructor(creator) {
        super(creator, {
            name: 'help',
            description: 'The help Command for the bot.',
            defaultPermission: true,
            deferEphemeral: true
        })

        this.filename = __filename;
    }

    async run(ctx){

        const embed = new discord.MessageEmbed()
            .setTitle('Bot\'s help command')
            .addField('-> **Slash Commands**', '> - /8ball\n> - /avatar\n> - /dog\n> - /fox\n> - /games\n> - /help (current command)\n> - /ip\n> - /joke\n> - /meme\n> - /ping\n> - /quote\n> /temperature\n> - /urban\n> - /src', false)
            .setTimestamp()
            .setColor('RANDOM')
            .setFooter(`Requested by ${ctx.user.username}`)

        try{
            return ({embeds: [embed]});
        } catch(e){
            return `There was an Error executing the Command!`
        }
    }
}