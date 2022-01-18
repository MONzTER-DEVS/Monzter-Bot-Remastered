const axios = require("axios");
const {
    SlashCommand,
    CommandContext,
    CommandOptionType
} = require("slash-create");
const discord = require("discord.js");
const config = require("../config.json");
const Canvas = require("canvacord").Canvacord;
const {client} = require("..");
const path = require("path");
const fs = require("fs");

module.exports = class PhComment extends SlashCommand{
    constructor(creator) {
        super(creator, {
            name: "phcomment",
            description: "Send a pornhub comment.",
            guildIDs: config.guildId,
            deferEphemeral: false,
            defaultPermission: true,
            options: [
                {
                    name: "text",
                    description: "The text you want to generate.",
                    required: true,
                    type: CommandOptionType.STRING
                }
            ]
        });

        this.filename = __filename;
    }

    async run(ctx){
        const author = ctx.user;
        const img = author.dynamicAvatarURL('png');
        const attachment = await Canvas.phub({username: author.username, image: img, message: `${ctx.options.text}`});
        await ctx.defer();

        const embed = new discord.MessageEmbed()
            .setTitle('Hope you like it!')
            .setTimestamp()
            .setColor('RANDOM');

        await ctx.send({
            embeds: [embed],
            file: {
                name: "pornhub.png",
                file: attachment
            }
        });
    }
}