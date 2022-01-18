const discord = require('discord.js')
const {CommandOptionType, SlashCommand} = require('slash-create');
const config = require('../config.json')
module.exports = class ping extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'ping',
            guildIDs: config.guildId,
            defaultPermission: true,
            description: 'Replies with the Bot and the API latency. Nothing Special.'
        });

        this.filePath = __filename;
    }

    async run(ctx) {
        await ctx.send(`Pong!`);
    };
};