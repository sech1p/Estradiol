import Eris from "eris";
import Config from "../../../Config";
import CommandOptionType from "../../../utils/Slash";
import Colors from "../../../utils/Colors";

export default {
  name: "ship",
  description: "Ship between two server users",
  exampleUsage: "/ship @First User @Second User",
  options: [
    {
      type: CommandOptionType.USER,
      name: "first_user",
      description: "The user who want ship with another",
      required: true,
    },
    {
      type: CommandOptionType.USER,
      name: "second_user",
      description: "The second user to ship",
      required: true,
    },
  ],
  execute: async (interaction: Eris.CommandInteraction) => {
    let usernames: string[] = [];
    if (interaction.data.resolved) {
      interaction.data.resolved.users?.forEach((user) =>
        usernames.push(user.username),
      );
      if (usernames) {
        interaction.createMessage({
          embeds: [
            {
              author: {
                name: !usernames[1]
                  ? `We ship ${usernames[0]} with itself. Aww!`
                  : `We ship ${usernames[0]} with ${usernames[1]}. Aww!`,
              },
              color: Colors.Pink,
            },
          ],
        });
      }
    }
  },
};
