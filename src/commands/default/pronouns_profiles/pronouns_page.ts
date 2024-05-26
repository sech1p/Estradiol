import Eris from "eris";
import CommandOptionType from "../../../utils/Slash";
import axios from "axios";
import Colors from "../../../utils/Colors";

export default {
    name: "pronouns-profile",
    description: "Display profile from pronouns.page",
    exampleUsage: "/pronouns-profile sech1p",
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
            .get(`https://en.pronouns.page/api/profile/get/${username}?version=2`)
            .then((response) => {
                if (response.data.profiles.en.names === undefined) {
                    return interaction.createMessage({
                        embeds: [
                            {
                                author: {
                                    name: "X An error has occured!"
                                },
                                description: "Failed to fetch information from API or user does not exists",
                                color: Colors.Red,
                            },
                        ],
                    });
                }
                let names: string = "";
                let pronouns: string = "";
                let flags: string = "";

                response.data.profiles.en.names.forEach((name: any) => names += `[${name.opinion}] ${name.value}
`);
                response.data.profiles.en.pronouns.forEach((pronoun: any) => pronouns += `[${pronoun.opinion}] ${pronoun.value}
`);
                response.data.profiles.en.flags.forEach((flag: any) => flags += `${flag}
`);
                interaction.createMessage({
                    embeds: [
                        {
                            author: {
                                name: `${response.data.bannedReason === null ? "" : "**[BANNED]**"} ${response.data.username}`,
                                icon_url: response.data.avatar,
                            },
                            description: `Profile of ${response.data.username}:`,
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
                                    name: "Description",
                                    value: response.data.profiles.en.description,
                                },
                                {
                                    name: "Age",
                                    value: response.data.profiles.en.age ?? "Not provided",
                                },
                                {
                                    name: "Flags",
                                    value: flags,
                                },
                            ]
                        },
                    ],
                });
            });
    }
}