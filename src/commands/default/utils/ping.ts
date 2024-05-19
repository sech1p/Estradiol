import Eris from "eris";

export default {
    name: "ping",
    description: "Pong!",
    options: [],
    execute: async (interaction: Eris.CommandInteraction) => {
        interaction.createMessage("Pong!");
    },
};