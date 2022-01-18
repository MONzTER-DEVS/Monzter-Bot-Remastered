const axios = require("axios");
const {
    SlashCommand,
    CommandContext,
    CommandOptionType
} = require("slash-create");
const discord = require("discord.js");
const config = require("../config.json");
const Canvas = require("canvacord").Canvacord;
const {client} = require("../index");

module.exports = class Slap extends SlashCommand{
    constructor(creator) {
        super(creator, {
            name: "slap",
            description: "Slap someone using this command.",
            defaultPermission: true,
            deferEphemeral: false,
            guildIDs: config.guildId,
            options: [
                {
                    name: "user",
                    description: "The user you want to slap.",
                    required: true,
                    type: CommandOptionType.USER
                }
            ]
        });
        this.filename = __filename;
    }

    async run(ctx){
        const author = ctx.user;
        const userToSlap = await ctx.users.get(`${ctx.options.user}`)
        const attachment = await Canvas.slap(`${author.dynamicAvatarURL('png')}`, `${userToSlap.dynamicAvatarURL('png')}`)
        await ctx.defer();

        const embed = new discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle('Hope you like it!')
            .setTimestamp();

        await ctx.send({
            embeds: [embed],
            file: {
                name: "slap.png",
                file: attachment
            }
        });
    }
}