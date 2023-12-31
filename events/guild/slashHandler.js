import { EmbedBuilder } from 'discord.js';
import { client } from '../..';

class slashHandler {
    constructor() {
        this.name = 'interactionCreate';
        this.nick = 'Slash';
    }

    /**
     *
     * @param {import("discord.js").CommandInteraction} interaction
     */
    async run(interaction) {
        if (interaction.isChatInputCommand()) {
            const command = client.slashCommands.get(interaction.commandName);
            if (!command) {
                return await interaction.reply({
                    embeds: [new EmbedBuilder().setColor('Red').setTitle('Error 404: Command not found').setDescription("This Command doesn't exit within the Bot's files, please contact the Developer about this Issue.").setTimestamp()],
                });
            }

            if (command.permissions) {
                if (command.permissions.bot && command.permissions.bot.length && !interaction.channel.permissionsFor(interaction.guild.me).has(command.permissions.bot)) {
                    let perms = interaction.channel.permissionsFor(interaction.guild.me).missing(command.permissions.bot);
                    return await interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setColor('Red')
                                .setTitle('Error 403: Bot missing Permission')
                                .setDescription('The Bot is missing the Permissions to run the command:\n' + perms.join(', '))
                                .setTimestamp(),
                        ],
                    });
                }
            }

            command.run(client, interaction);
        }
    }
}

export default new slashHandler();