import Eris from "eris";

export default {
  name: "estragon",
  description: "estragon",
  exampleUsage: "/estragon",
  devOnly: false,
  options: [],
  execute: async (interaction: Eris.CommandInteraction) => {
    interaction.createMessage("https://i.imgur.com/nemqLaP.png");
  },
};
