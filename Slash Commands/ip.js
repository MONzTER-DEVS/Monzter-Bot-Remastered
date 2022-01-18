const config = require('../config.json')
const axios = require('axios')
const discord = require('discord.js')
const {CommandOptionType, SlashCommand} = require('slash-create');

module.exports = class Ip extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'ip',
            description: 'Get info on a given IP address',
            deferEphemeral: true,
            guildIDs: config.guildId,
            defaultPermission: true,
            options: [
                {
                    name: 'ip',
                    description: 'Enter the IP address you wanna get info on.',
                    type: CommandOptionType.STRING,
                    required: true
                }
            ]
        });

        this.filename = __filename;
    }

    async run(ctx) {
        const payload = ctx.options.ip;
        const response = await axios.get(`${config.ipApiUrl}/${payload}`);

        if (response.data.status === 'fail') {
            const errorEmbed = new discord.MessageEmbed()
                .setTitle('Error!')
                .setColor('RED')
                .setDescription(`Invalid ip address.`)
                .setTimestamp()
                .setThumbnail(ctx.user.avatarURL.toString());

            return ({embeds: [errorEmbed]})
        } else {
            const {
                country,
                countryCode,
                city,
                lat,
                lon,
                timezone,
                org,
                isp
            } = response.data;

            const embed = new discord.MessageEmbed()
                .setTitle('Successfully fetched the IP\'s data!')
                .addField('-> IP Address', `_${payload}_`, false)
                .addField('-> Organization', `_${org}_`, false)
                .addField('-> Internet Service Provider', `_${isp}_`, false)
                .addField('-> Country', `_${country}_`, false)
                .addField('-> Country Code', `_${countryCode}_`, false)
                .addField('-> City', `_${city}_`, false)
                .addField('-> Latitude', `_${lat}_`, false)
                .addField('-> Longitude', `_${lon}_`, false)
                .addField('-> Timezone', `${timezone}`, false)
                .setTimestamp()
                .setColor('RANDOM')
                .setFooter(`Requested by ${ctx.user.username}`, `${ctx.user.avatarURL}`);

            try {
                return ({embeds: [embed]});
            } catch (e) {
                await ctx.send('There was an error executing the command!');
            }
            ;
        }
        ;
    };
};