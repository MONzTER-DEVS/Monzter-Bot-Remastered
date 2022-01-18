const config = require('../config.json')
const axios = require('axios')
const {discord, MessageButton, MessageActionRow, MessageEmbed} = require('discord.js')
const {CommandOptionType, SlashCommand} = require('slash-create');

module.exports = class Games extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'games',
            description: 'Get to know about our games and Current Projects!.',
            deferEphemeral: true,
            defaultPermission: true,
            guildIDs: config.guildId
        });

        this.filename = __filename;
    }

    async run(ctx) {
        const games = "**MonZter Games**\n> - Photon\n> - Beat 'n Boom\n> - Dodge The Block\n> - Click Ball\n\n"
        const projects = "**Our Projects**\nBlackOut, BeatWorkout and Our own game developers website.\n" + "Stay Tuned!"
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(`${games}\n${projects}`)
            .setFooter(`Requested by ${ctx.user.username}`)
            .setTimestamp()
            .setTitle('Our Games and Projects!')
            .setThumbnail(`${ctx.user.avatarURL}`)

        const mainButtons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Photon')
                    .setStyle('LINK')
                    .setURL("https://monzter-games.itch.io/photon")
            )

            .addComponents(
                new MessageButton()
                    .setLabel('Beat \'n Boom')
                    .setStyle('LINK')
                    .setURL("https://monzter-games.itch.io/beat-n-boom")

            )

            .addComponents(
                new MessageButton()
                    .setLabel('Dodge The Block')
                    .setStyle('LINK')
                    .setURL("https://monzter-games.itch.io/dodge-the-block")
            )
            .addComponents(
                new MessageButton()
                    .setLabel('Click Ball')
                    .setStyle('LINK')
                    .setURL("https://monzter-games.itch.io/click-ball")
            )
        try{
            return({embeds: [embed], components: [mainButtons]})
        } catch(e){
            return `There was an error executing the Command!`;
        }
    }
}