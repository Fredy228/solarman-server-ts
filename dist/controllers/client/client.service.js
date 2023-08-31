"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.NODE_ENV === "development"
    ? process.env.TELEGRAM_TOKEN_DEV
    : process.env.TELEGRAM_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const chatId = process.env.NODE_ENV === "development"
    ? process.env.TELEGRAM_CHAT_ID_DEV
    : process.env.TELEGRAM_CHAT_ID;
class ClientService {
    async sendSmsTelegram({ name, phone, email, currentGood, }) {
        let message = `Ім'я: ${name}; \nНомер телефону: ${phone}; \n`;
        if (email)
            message += `Email: ${email}; \n`;
        if (currentGood)
            message += `Заявка стосовно: ${currentGood}`;
        await bot.sendMessage(chatId, message);
    }
    async sendQuizTelegram(value) {
        let message = `Ім'я: ${value.name}; \nНомер телефону: ${value.phone}; \n`;
        message += `Quiz: \n 1)${value.forWhat} \n 2)${value.problem} \n 3)${value.power} \n 4)${value.country}`;
        if (value.whichCountry)
            message += `: ${value.whichCountry}`;
        await bot.sendMessage(chatId, message);
    }
}
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map