
import Eris from "eris";
import CommandOptionType from "../../utils/Slash";
import Colors from "../../utils/Colors";
import Config from "../../Config";

export default {
  name: "eval",
  description: "Evaluates an JavaScript code",
  exampleUsage: "/eval console.log(\"hello world!\");",
  devOnly: true,
  options: [
    {
      type: CommandOptionType.STRING,
      name: "code",
      description: "The code you want to evaluate",
      required: true,
    },
  ],
  execute: async (interaction: Eris.CommandInteraction) => {
    // @ts-ignore
    const code = interaction.data.options[0].value;

    const cleanedResult = async (text: string) => {
      let result = eval(code);
      if ((typeof result == "string") === false) {
        result = require("util").inspect(result, {
          depth: 1,
        });
      }

      result = result
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));

      return result;
    }

    try {
      const evaled = eval(code);
      const cleaned = await cleanedResult(evaled);

      return interaction.createMessage({
        embeds: [
          {
            author: {
              name: "Evaluated code"
            },
            description: `\`\`\`javascript
${cleaned}\`\`\``,
          },
        ],
      });
    } catch (exception: any) {
      return interaction.createMessage({
        embeds: [
          {
            author: {
              name: "❌ Error",
            },
            description: `An error has occured during evaluation code: \`\`\`javascript
${exception.toString()}\`\`\``
          }
        ]
      })
    }
  },
};
