const config = require('../config.json')
const axios = require('axios')
const discord = require('discord.js')
const {CommandOptionType, SlashCommand} = require('slash-create');

module.exports = class Ask extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: '8ball',
            description: 'Get your questions answered from the 8ball.',
            deferEphemeral: true,
            defaultPermission: true,
            guildIDs: config.guildId,

            options: [
                {
                    name: 'question',
                    description: 'What do you wanna ask?',
                    type: CommandOptionType.STRING,
                    required: true
                }
            ]
        });

        this.filename = __filename;
    }

    async run(ctx) {
        const answers = ['Yes. Definitely.', 'No. You won\'t', 'No(?)', 'Uhh....y-yeah?', 'I don\'t know.', 'Yes you will definitely'];
        const final = answers[Math.floor(Math.random() * answers.length)];

        const embed = new discord.MessageEmbed()
            .setTitle(`${ctx.user.username} asks...`)
            .setTimestamp()
            .setColor('RANDOM')
            .addField('❓', `_${ctx.options.question}_`, false)
            .addField('🎱', `_${final}_`, false)
            .setThumbnail(`${ctx.user.avatarURL}`)
            .setFooter(`Requested by ${ctx.user.username}`, `${ctx.user.avatarURL}`);

        try {
            return ({embeds: [embed]});
        } catch (e) {
            return 'There was an error while executing the Command!';
        }
    };
}