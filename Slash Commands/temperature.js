const config = require('../config.json')
const axios = require('axios')
const discord = require('discord.js')
const {CommandOptionType, SlashCommand} = require('slash-create');

module.exports = class Weather extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'temperature',
            description: 'This command tells the weather of the given location.',
            deferEphemeral: true,
            defaultPermission: true,
            guildIDs: config.guildId,
            options: [
                {
                    name: 'location',
                    description: 'The location you wanna get the weather of.',
                    optional: false,
                    type: CommandOptionType.STRING
                }
            ]
        })

        this.filename = __filename;
    }

    async run(ctx) {
        // const response = await axios.get(`${config.weatherApiBaseUrl}/weather?q=${ctx.options.location}&units=metric&appid=${config.weatherApiKey}`);
        const response = await axios.get(`${config.weatherApiBaseUrl}/?q=${ctx.options.location}&units=metric&appid=${config.weatherApiKey}`);
        const country = response.data.sys.country;
        const state = response.data.name;
        const current_temp = response.data.main.temp;
        const feelsLike = response.data.weather[0].main;

        const embed = new discord.MessageEmbed()
            .setTitle(`Weather for ${state}`)
            .addField('-> Country', `_${country}_`, false)
            .addField('-> State:', `_${state}_`, false)
            .addField('-> Weather Type', `${feelsLike}`, false)
            .addField('-> Temperature:', `_${current_temp}°C_`, false)
            .setColor('RANDOM')
            .setTimestamp()
            .setThumbnail(`${ctx.user.avatarURL}`)
            .setFooter(`Requested by ${ctx.user.username}`);

        try {
            return ({embeds: [embed]});
        } catch (e) {
            return 'There was an error executing that Command!';
        }
    }
}