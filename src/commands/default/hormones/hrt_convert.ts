import Eris from "eris";
import CommandOptionType from "../../../utils/Slash";
import Colors from "../../../utils/Colors";

export default {
  name: "hrt-convert",
  description: "Converts unit of hormone into another",
  exampleUsage: "/hrt-convert estradiol 55 pg/mL",
  options: [
    {
      type: CommandOptionType.SUB_COMMAND,
      name: "estradiol",
      description: "Converts unit of estradiol into another",
      options: [
        {
          type: CommandOptionType.INTEGER,
          name: "amounts",
          description: "Amounts of Estradiol",
          required: true,
        },
        {
          type: CommandOptionType.STRING,
          name: "units",
          description: "Unit to convert",
          choices: [
            {
              name: "pmol/L",
              value: "pmol/L",
            },
            {
              name: "pg/mL",
              value: "pg/mL",
            },
          ],
          required: true,
        },
      ],
    },
    {
      type: CommandOptionType.SUB_COMMAND,
      name: "progesterone",
      description: "Converts unit of progesterone into another",
      options: [
        {
          type: CommandOptionType.INTEGER,
          name: "amounts",
          description: "Amounts of Progestrone",
          required: true,
        },
        {
          type: CommandOptionType.STRING,
          name: "units",
          description: "Unit to convert",
          choices: [
            {
              name: "nmol/L",
              value: "nmol/L",
            },
            {
              name: "ng/dL",
              value: "ng/dL",
            },
          ],
          required: true,
        },
      ],
    },
    {
      type: CommandOptionType.SUB_COMMAND,
      name: "prolactin",
      description: "Converts unit of prolactin into another",
      options: [
        {
          type: CommandOptionType.INTEGER,
          name: "amounts",
          description: "Amounts of Prolactin",
          required: true,
        },
        {
          type: CommandOptionType.STRING,
          name: "units",
          description: "Unit to convert",
          choices: [
            {
              name: "mIU/L",
              value: "mIU/L",
            },
            {
              name: "ng/mL",
              value: "ng/mL",
            },
          ],
          required: true,
        },
      ],
    },
    {
      type: CommandOptionType.SUB_COMMAND,
      name: "testosterone",
      description: "Converts unit of testosterone into another",
      options: [
        {
          type: CommandOptionType.INTEGER,
          name: "amounts",
          description: "Amounts of Testosterone",
          required: true,
        },
        {
          type: CommandOptionType.STRING,
          name: "units",
          description: "Unit to convert",
          choices: [
            {
              name: "nmol/L",
              value: "nmol/L",
            },
            {
              name: "ng/dL",
              value: "ng/dL",
            },
          ],
          required: true,
        },
      ],
    },
  ],
  execute: async (interaction: Eris.CommandInteraction) => {
    if (interaction.data.options) {
      // @ts-ignore
      const hormoneValue = interaction.data.options[0].options[0].value;
      // @ts-ignore
      const unit = interaction.data.options[0].options[1].value;

      // @ts-ignore
      const hormone = interaction.data.options[0].name;
      let hormoneFinal, embed;
      switch (hormone) {
        // Estradiol
        case "estradiol": {
          if (unit === "pmol/L") {
            hormoneFinal = hormoneValue * 0.272;
            embed = [
              {
                author: {
                  name: "Estradiol Level Conversions",
                },
                fields: [
                  {
                    name: "pmoL/L",
                    value: String(hormoneValue),
                  },
                  {
                    name: "pg/mL",
                    value: String(hormoneFinal),
                  },
                ],
                color: Colors.Pink,
              },
            ];
          }
          if (unit === "pg/mL") {
            hormoneFinal = hormoneValue * 3.67;
            embed = [
              {
                author: {
                  name: "Estradiol Level Conversions",
                },
                fields: [
                  {
                    name: "pmoL/L",
                    value: String(hormoneFinal),
                  },
                  {
                    name: "pg/mL",
                    value: String(hormoneValue),
                  },
                ],
                color: Colors.Pink,
              },
            ];
          }
          interaction.createMessage({
            embeds: embed,
          });
        }

        // Progestrone
        case "progesterone": {
          if (unit === "nmol/L") {
            hormoneFinal = hormoneValue * 0.314;
            embed = [
              {
                author: {
                  name: "Progestrone Level Conversions",
                },
                fields: [
                  {
                    name: "nmol/L",
                    value: String(hormoneValue),
                  },
                  {
                    name: "ng/dL",
                    value: String(hormoneFinal),
                  },
                ],
                color: Colors.Pink,
              },
            ];
            interaction.createMessage({
              embeds: embed,
            });
          }
          if (unit === "ng/dL") {
            hormoneFinal = hormoneValue * 3.18;
            embed = [
              {
                author: {
                  name: "Progestrone Level Conversions",
                },
                fields: [
                  {
                    name: "nmol/L",
                    value: String(hormoneFinal),
                  },
                  {
                    name: "ng/dL",
                    value: String(hormoneValue),
                  },
                ],
                color: Colors.Pink,
              },
            ];
            interaction.createMessage({
              embeds: embed,
            });
          }
        }

        // Prolactin
        case "prolactin": {
          if (unit === "mIU/L") {
            hormoneFinal = hormoneValue * 0.047;
            embed = [
              {
                author: {
                  name: "Prolactin Level Conversions",
                },
                fields: [
                  {
                    name: "mIU/L",
                    value: String(hormoneValue),
                  },
                  {
                    name: "ng/mL",
                    value: String(hormoneFinal),
                  },
                ],
                color: Colors.Pink,
              },
            ];
            interaction.createMessage({
              embeds: embed,
            });
          }
          if (unit === "ng/mL") {
            hormoneFinal = hormoneValue * 21.2;
            embed = [
              {
                author: {
                  name: "Prolactin Level Conversions",
                },
                fields: [
                  {
                    name: "mIU/L",
                    value: String(hormoneFinal),
                  },
                  {
                    name: "ng/mL",
                    value: String(hormoneValue),
                  },
                ],
                color: Colors.Pink,
              },
            ];
            interaction.createMessage({
              embeds: embed,
            });
          }
        }

        // Testosterone
        case "testosterone": {
          if (unit === "nmol/L") {
            hormoneFinal = hormoneValue * 28.8;
            embed = [
              {
                author: {
                  name: "Testosterone Level Conversions",
                },
                fields: [
                  {
                    name: "nmol/L",
                    value: String(hormoneValue),
                  },
                  {
                    name: "ng/dL",
                    value: String(hormoneFinal),
                  },
                ],
                color: Colors.Pink,
              },
            ];
            interaction.createMessage({
              embeds: embed,
            });
          }
          if (unit === "ng/dL") {
            hormoneFinal = hormoneValue * 3.47;
            embed = [
              {
                author: {
                  name: "Testosterone Level Conversions",
                },
                fields: [
                  {
                    name: "nmol/L",
                    value: String(hormoneFinal),
                  },
                  {
                    name: "ng/dL",
                    value: String(hormoneValue),
                  },
                ],
                color: Colors.Pink,
              },
            ];
            interaction.createMessage({
              embeds: embed,
            });
          }
        }
        default:
          break;
      }
    }
  },
};
