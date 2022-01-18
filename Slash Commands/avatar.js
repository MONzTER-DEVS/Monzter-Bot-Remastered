const config = require('../config.json')
const axios = require('axios')
const discord = require('discord.js')
const {CommandOptionType, SlashCommand} = require('slash-create');

module.exports = class Avatar extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'avatar',
            description: 'This command displays your avatar or the given user avatar.',
            guildIDs: config.guildId,
            deferEphemeral: true,
            defaultPermission: true,
            options: [
                {
                    name: 'user',
                    description: 'Get the avatar for the given user.',
                    type: CommandOptionType.USER,
                    optional: true,
                }
            ]
        });

        this.filename = __filename;
    }

    async run(ctx) {
        const user = await ctx.users.get(ctx.options.user) ?? ctx.user;

        const embed = new discord.MessageEmbed()
            .setTitle(`Avatar for ${user.username}!`)
            .setImage(user.avatarURL)
            .setFooter(`Requested by ${ctx.user.username}`)
            .setTimestamp()
            .setColor('RANDOM');

        try {
            return ({embeds: [embed]});
        } catch (e) {
            return 'There was an error while executing the command. Please try again.'
        }
    };
};