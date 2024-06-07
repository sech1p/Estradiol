import dotenv from "dotenv";
import path from "node:path";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const Token = process.env.TOKEN || "";
const BotOwnerID = process.env.BOT_OWNER_ID || "";

export default {
  Token,
  BotOwnerID,
};
