const axios = require("axios");
const {
    SlashCommand,
    CommandContext,
    CommandOptionType
} = require("slash-create");
const discord = require("discord.js");
const config = require("../config.json");
const Canvas = require("canvacord").Canvacord;

module.exports = class OhNo extends SlashCommand{
    constructor(creator) {
        super(creator, {
            name:"ohno",
            description: "Oh no. Cringe.",
            guildIDs: config.guildId,
            defaultPermission: true,
            deferEphemeral: false,
            options: [
                {
                    name: "text",
                    description: 'The text you want to generate a meme of.',
                    type: CommandOptionType.STRING,
                    required: false
                }
            ]
        });
    }

    async run(ctx){
        const user = await ctx.users.get(`${ctx.options.user}`);
        const attachment = await Canvas.ohno(`${ctx.options.text}`);
        await ctx.defer();

        const embed = new discord.MessageEmbed()
            .setColor('RANDOM')
            .setTimestamp()
            .setTitle('Hope you like it!');

        await ctx.send({
            embeds: [embed],
            file: {
                name: "ohno.png",
                file: attachment
            }
        });
    }
}