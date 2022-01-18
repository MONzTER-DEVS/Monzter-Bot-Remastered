const config = require('../config.json')
const axios = require('axios')
const discord = require('discord.js')
const {CommandOptionType, SlashCommand} = require('slash-create');

module.exports = class Meme extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'meme',
            description: 'Generate yourself a fresh meme.',
            guildIDs: config.guildId,
            deferEphemeral: true,
            defaultPermission: true
        });

        this.filename = __filename;
    }

    async run(ctx) {
        const memePage = ["indiandankmemes", "dankinindia"];
        const randomMeme = memePage[Math.floor(Math.random() * memePage.length)];
        const response = await axios.get(`${config.memeApi}${randomMeme}`);
        const title = response.data.title;
        const likes = response.data.ups;
        const auth = response.data.author;
        const url = response.data.postLink;
        const img = response.data.url;

        const embed = new discord.MessageEmbed()
            .setAuthor(`${title}`, `${ctx.user.avatarURL}`, `${url}`)
            .setColor('RANDOM')
            .setTimestamp()
            .addField(`-> Upvotes`, `_${likes}_`, false)
            .addField(`-> Creator`, `_${auth}_`, false)
            .setFooter(`Requested by ${ctx.user.username}`)
            .setImage(`${img}`);

        try {
            return ({embeds: [embed]})
        } catch (e) {
            return `${e}`
        }
    }
}