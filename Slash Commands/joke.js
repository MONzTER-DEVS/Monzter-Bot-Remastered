const config = require('../config.json')
const axios = require('axios')
const discord = require('discord.js')
const {CommandOptionType, SlashCommand} = require('slash-create');

module.exports = class Joke extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'joke',
            description: 'Generate yourself a fresh joke.',
            defaultPermission: true,
            deferEphemeral: true,
            guildIDs: config.guildId
        });

        this.filename = __filename;
    }

    async run(ctx) {
        const jokeTypes = ['Pun', 'Programming', 'Any', 'Spooky', 'Christmas'];
        const type = jokeTypes[Math.floor(Math.random() * jokeTypes.length)];
        const response = await axios.get(`${config.jokeApi}${type}`)
        let j;
        let setup;
        let delivery;

        if (response.data.type === 'single') {
            j = response.data.joke;
            console.log(j)

        } else {
            setup = response.data.setup;
            delivery = response.data.delivery;
            console.log(`${setup}\n${delivery}`)
        }

        try {
            const embed = new discord.MessageEmbed()
                .setTimestamp()
                .setTitle('Successfully generated a joke.')
                .setDescription(`${setup}\n${delivery}` ?? `${j}`)
                .setColor('RANDOM')
                .setFooter(`Requested by ${ctx.user.username}`)
                .setThumbnail(`${ctx.user.avatarURL}`);

            return ({embeds: [embed]})
        } catch (e) {
            console.log(e);
            return `There was an error executing the Command!`;
        }
    }
}