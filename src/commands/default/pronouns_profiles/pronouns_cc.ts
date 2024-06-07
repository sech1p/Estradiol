import Eris from "eris";
import CommandOptionType from "../../../utils/Slash";
import axios from "axios";
import Colors from "../../../utils/Colors";

export default {
    name: "pronouns-cc-profile",
    description: "Display profile from pronouns.cc",
    exampleUsage: "/pronouns-cc-profile sech1p",
    options: [
        {
            type: CommandOptionType.STRING,
            name: "user",
            description: "The user you want to search",
            required: true,
        },
    ],
    execute: async (interaction: Eris.CommandInteraction) => {
        // @ts-ignore
        const username = interaction.data.options[0].value;
        axios
            .get(`https://pronouns.cc/api/v1/users/${username}`)
            .then((response) => {
                let names: string = "";
                let pronouns: string = "";
                let flags: string = "";

                response.data.names.forEach((name: any) => names += `${name.value} [Status: ${name.status}]
`);
                response.data.pronouns.forEach((pronoun: any) => pronouns += `${pronoun.pronouns} [Status: ${pronoun.status}]
`);
                response.data.flags.forEach((flag: any) => flags += `${flag.name} (${flag.description})
`);
                interaction.createMessage({
                    embeds: [
                        {
                            author: {
                                name: `${response.data.name} (${response.data.display_name})`,
                                icon_url: response.data.avatar
                                    ? `https://cdn.pronouns.cc/users/${response.data.id}/${response.data.avatar}.webp`
                                    : "https://cdn.discordapp.com/embed/avatars/0.png",
                            },
                            description: `Profile of ${response.data.name}:`,
                            fields: [
                                {
                                    name: "Names",
                                    value: names,
                                },
                                {
                                    name: "Pronouns",
                                    value: pronouns,
                                },
                                {
                                    name: "Bio",
                                    value: response.data.bio ?? "No bio has been provided.",
                                },
                                {
                                    name: "Flags",
                                    value: flags,
                                },
                            ],
                            color: Colors.RANDOM[Math.floor(Math.random() * 100)],
                        },
                    ],
                });
            })
            .catch(() => {
                return interaction.createMessage({
                    embeds: [
                        {
                            author: {
                                name: "X An error has occured!"
                            },
                            description: "Failed to fetch from API or user does not exists",
                            color: Colors.Red,
                        },
                    ],
                });
            });
    }
}