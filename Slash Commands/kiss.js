const axios = require("axios");
const {
    SlashCommand,
    CommandContext,
    CommandOptionType
} = require("slash-create");
const discord = require("discord.js");
const config = require("../config.json");
const Canvas = require("canvacord").Canvacord;

module.exports = class Kiss extends SlashCommand{
    constructor(creator) {
        super(creator, {
            name:"kiss",
            description: "Kiss someone you love :flushed:",
            guildIDs: config.guildId,
            defaultPermission: true,
            deferEphemeral: false,
            options: [
                {
                    name: "user",
                    description: 'The user you want to kiss.',
                    type: CommandOptionType.USER,
                    required: true
                }
            ]
        });
    }

    async run(ctx){
        const author = ctx.user;
        const user = await ctx.users.get(ctx.options.user);
        const attachment = await Canvas.kiss(`${author.dynamicAvatarURL('png')}`, `${user.dynamicAvatarURL('png')}`);
        await ctx.defer();

        const embed = new discord.MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('Hope you like it!');

        await ctx.send({
            embeds: [embed],
            file: {
                name: "kiss.png",
                file: attachment
            }
        });
    }
}