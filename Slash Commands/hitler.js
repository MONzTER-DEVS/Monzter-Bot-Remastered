const axios = require("axios");
const {
    SlashCommand,
    CommandContext,
    CommandOptionType
} = require("slash-create");
const discord = require("discord.js");
const config = require("../config.json");
const Canvas = require("canvacord").Canvacord;

module.exports = class Hitler extends SlashCommand{
    constructor(creator) {
        super(creator, {
            name:"hitler",
            description: "Generate a hitler meme on someone.",
            guildIDs: config.guildId,
            defaultPermission: true,
            deferEphemeral: false,
            options: [
                {
                    name: "user",
                    description: 'The user you want to generate a meme of.',
                    type: CommandOptionType.USER,
                    required: false
                }
            ]
        });
    }

    async run(ctx){
        const user = await ctx.users.get(`${ctx.options.user}`) ?? ctx.user;
        const img = user.dynamicAvatarURL('png');
        const attachment = await Canvas.hitler(img);
        await ctx.defer();

        const embed = new discord.MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('Hope you like it!');

        await ctx.send({
            embeds: [embed],
            file: {
                name: "hitler.png",
                file: attachment
            }
        });
    }
}