const axios = require("axios");
const {
    SlashCommand,
    CommandContext,
    CommandOptionType
} = require("slash-create");
const discord = require("discord.js");
const config = require("../config.json");

module.exports = class ChangeMyMind extends SlashCommand{
    constructor(creator) {
        super(creator, {
            name: "changemymind",
            description: "Display a \"change my mind\" meme with your text.",
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
        const response = await axios.get(`https://nekobot.xyz/api/imagegen?type=changemymind&text=${ctx.options.text}`);
        const image = response.data.message;
        const embed = new discord.MessageEmbed()
            .setImage(`${image}`)
            .setColor('RANDOM')
            .setTimestamp()
        try{
            return({embeds: [embed]});
        } catch(e){
            return `There was an error executing the command.`;
        };
    };
}