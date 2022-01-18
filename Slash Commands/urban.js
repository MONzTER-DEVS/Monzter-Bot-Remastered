const config = require('../config.json')
const axios = require('axios')
const discord = require('discord.js')
const {CommandOptionType, SlashCommand} = require('slash-create');

module.exports = class Urban extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'urban',
            description: 'Get the meaning of your query from Urban Dictionary.',
            guildIDs: config.guildId,
            defaultPermission: true,
            deferEphemeral: true,
            options: [
                {
                    name: 'query',
                    description: 'The query you want to search.',
                    required: true,
                    type: CommandOptionType.STRING
                }
            ]

        });

        this.filename = __filename;
    }

    async run(ctx) {
        const urban = require('urban'),
            lookup = urban(`${ctx.options.query}`);

        let define;
        let upvote;
        let downvote;
        let url;
        let auth0r;

        function getResponse() {
            return new Promise((resolve, reject) => {
                lookup.first(function (data) {
                    resolve(data)
                    return [
                        define = data.definition,
                        upvote = data.thumbs_up,
                        downvote = data.thumbs_down,
                        url = data.permalink,
                        auth0r = data.author
                    ]
                })
            })
        }

        let data = await getResponse()

        const embed = new discord.MessageEmbed()
            .setTitle('Urban Lookup')
            .setThumbnail('http://www.userlogos.org/files/logos/WoolfBeng/urban4.png')
            .setTimestamp()
            .addField('-> Query', `${ctx.options.query.charAt(0).toUpperCase() + ctx.options.query.slice(1)}`, false)
            .addField('-> Definition', `${define}`, false)
            .addField('-> Author', `${auth0r}`, false)
            .addField('-> Upvotes', `${upvote}`, false)
            .addField('-> Downvotes', `${downvote}`, false)
            .setFooter(`Requested by ${ctx.user.username}`)
            .setColor('RANDOM');

        return ({embeds: [embed]})
    }
};