const {
    clientToken,
    prefix,
    ApplicationId,
    PublicKey,
    guildId
} = require('./config.json');
const fs = require('fs');
const discord = require('discord.js')
const client = new discord.Client({intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.DIRECT_MESSAGES]});
const {GatewayServer, SlashCreator} = require('slash-create');
const path = require('path');

const creator = new SlashCreator({
    applicationID: ApplicationId,
    publicKey: PublicKey,
    token: clientToken
});


const handleSlashCommands = () => {
    const gateway = new GatewayServer((handler) => {
        client.ws.on('INTERACTION_CREATE', handler)
    });

    creator.withServer(gateway);
    creator.registerCommandsIn(path.join(__dirname, 'Slash Commands/'));
    creator.syncCommandsIn(guildId);
    creator.syncCommandPermissions();
    creator.collectCommandIDs(true);
}

function handleLogs() {
    creator.on('commandRun', (command, _, ctx) => {
        console.log(`${ctx.user.username}#${ctx.user.discriminator} (id: ${ctx.user.id}) just used ${command.commandName}!`);
    });

    creator.on('commandError', (command, error) => {
        console.log(`Unable to run ${command.commandName}! The error is given below. \n Error: ${error}`);
    });
    creator.on('debug', (debug) => console.info(`debug: ${debug}`));
    creator.on('warn', (warn) => console.warn(warn));
    creator.on('synced', () => console.log('Slash Commands Synced!'))
    creator.on('error', (e) => {
        console.log(`Got a command error: ${e.message}`);
        console.trace(e);
    });
}

client.login(clientToken).then(_ => console.log('Successfully logged into the Client!'));
handleLogs();
handleSlashCommands();