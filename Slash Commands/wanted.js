const axios = require("axios");
const {
    SlashCommand,
    CommandContext,
    CommandOptionType
} = require("slash-create");
const discord = require("discord.js");
const config = require("../config.json");
const Canvas = require("canvacord").Canvacord;

module.exports = class Wanted extends SlashCommand{
    constructor(creator) {
        super(creator, {
            name:"wanted",
            description: "Generate a Wanted poster.",
            guildIDs: config.guildId,
            defaultPermission: true,
            deferEphemeral: false,
            options: [
                {
                    name: "user",
                    description: 'The user you want to generate the wanted poster of.',
                    type: CommandOptionType.USER,
                    required: false
                }
            ]
        });
    }

    async run(ctx){
        const user = await ctx.users.get(`${ctx.options.user}`) ?? ctx.user;
        const img = user.dynamicAvatarURL('png');
        const attachment = await Canvas.wanted(img);
        await ctx.defer();

        const embed = new discord.MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('Hope you like it!');

        await ctx.send({
            embeds: [embed],
            file: {
                name: "wanted.png",
                file: attachment
            }
        });
    }
}