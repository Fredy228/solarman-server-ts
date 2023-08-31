const TelegramBot = require("node-telegram-bot-api");
import { MessageDto, QuizDto } from "./client.dto";

const token =
  process.env.NODE_ENV === "development"
    ? process.env.TELEGRAM_TOKEN_DEV
    : process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const chatId =
  process.env.NODE_ENV === "development"
    ? process.env.TELEGRAM_CHAT_ID_DEV
    : process.env.TELEGRAM_CHAT_ID;

export class ClientService {
  async sendSmsTelegram({
    name,
    phone,
    email,
    currentGood,
  }: MessageDto): Promise<void> {
    let message = `Ім'я: ${name}; \nНомер телефону: ${phone}; \n`;

    if (email) message += `Email: ${email}; \n`;

    if (currentGood) message += `Заявка стосовно: ${currentGood}`;

    await bot.sendMessage(chatId, message);
  }

  async sendQuizTelegram(value: QuizDto): Promise<void> {
    let message = `Ім'я: ${value.name}; \nНомер телефону: ${value.phone}; \n`;

    message += `Quiz: \n 1)${value.forWhat} \n 2)${value.problem} \n 3)${value.power} \n 4)${value.country}`;

    if (value.whichCountry) message += `: ${value.whichCountry}`;

    await bot.sendMessage(chatId, message);
  }
}
