import Eris, {
  CommandInteraction,
  Constants,
  Collection
} from "eris";
import Config from "./Config";
import moment from "moment";
import glob from "glob-promise";
import path from "node:path";

const bot = Eris(Config.Token, {
  intents: [
    "all"
  ],
});

const log = (message: string) => {
  console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}]: ${message}`);
};

const logError = (message: string) => {
  console.error(`[${moment().format("DD-MM-YYYY HH:mm:ss")}]: ❌ ${message}`);
};

let commands: any[] = [];
const loadCommands = async (bot: Eris.Client) => {
  log(`⏳ Loading commands...`);
  glob("dist/commands/**/**/*.js").then(
    async (commandFiles: string[]) => {
      for (const commandFile of commandFiles) {
        log(`⏳ Loading command "${commandFile}"...`);
        try {
          const { default: command } = await import(
            path.join(process.cwd(), commandFile)
          );
          commands.push(command);

          bot.createCommand({
            name: command.name,
            description: command.description,
            options: command.options ?? [],
            type: Constants.ApplicationCommandTypes.CHAT_INPUT,
          });
        } catch (exception: any) {
          logError(`Failed to load commands: ${exception}`);
        }
      }
    },
  );
};

bot.on("interactionCreate", async (interaction) => {
  if (interaction instanceof CommandInteraction) {
    if (!commands.some((command) => command.name === interaction.data.name)) {
      return interaction.createMessage("❌ This command does not exist");
    }

    try {
      const command = commands.find(
        (command) => command.name === interaction.data.name,
      );
      if (command) {
        if (command.devOnly) {
          if (interaction.member?.id !== Config.BotOwnerID) {
            await interaction.createMessage({
              content: `❌ An error has occured while executing command
You don't have permission to use this command.`,
            });
            return;
          } else {
            await command.execute(interaction);
          }
        }
        await command.execute(interaction);
      }
    } catch (exception) {
      logError(`Error executing command: ${exception}`);
      interaction.createMessage({
        content: "❌ An error occured while executing command",
      });
    }
  }
});

bot.on("ready", async () => {
  loadCommands(bot);
});

bot.connect();
