import Eris from "eris";
import CommandOptionType from "../../../utils/Slash";
import glob from "glob-promise";
import path from "node:path";
import Colors from "../../../utils/Colors";

export default {
  name: "help",
  description: "Displays bot help",
  exampleUsage: "/help [ship]",
  options: [
    {
      type: CommandOptionType.STRING,
      name: "command",
      description: "Display help for command",
    },
  ],
  execute: async (interaction: Eris.CommandInteraction) => {
    let commands: any[] = [];
    let commandNames: any[] = [];

    await glob("dist/commands/**/**/*.js").then(
      async (commandFiles: string[]) => {
        for (const commandFile of commandFiles) {
          const { default: command } = await import(
            path.join(process.cwd(), commandFile)
          );
          commands.push(command);
        }
      },
    );
    const command = interaction.data.options?.values().next().value.value;
    if (command) {
      commands.forEach((cmd) => {
        if (cmd.name === command) {
          interaction.createMessage({
            embeds: [
              {
                author: {
                  name: `Command information`,
                },
                description: `**Name**: ${cmd.name}
                                **Description**: ${cmd.description}
                                **Example usage**: ${cmd.exampleUsage}`,
                color:
                  Colors.RANDOM[
                    Math.floor(Math.random() * Colors.RANDOM.length)
                  ],
              },
            ],
          });
        }
      });
    } else {
      commands.forEach((cmd) => commandNames.push(cmd.name));
      interaction.createMessage({
        embeds: [
          {
            author: {
              name: `List of available commands
Type /help \`Command Name\` to view command info`,
            },
            description: commandNames.join(", "),
            color:
              Colors.RANDOM[Math.floor(Math.random() * Colors.RANDOM.length)],
          },
        ],
      });
    }
  },
};
