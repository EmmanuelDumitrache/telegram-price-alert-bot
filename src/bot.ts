import TelegramBot from "node-telegram-bot-api";

const token = process.env["TELEGRAM_BOT_TOKEN"];

if (!token) {
    throw new Error("Missing TELEGRAM_BOT_TOKEN in .env");
}

export const bot = new TelegramBot(token, {
    polling: true //tells the library to keep checking Telegram for new messages.
});

export function handleStart(chatId: number) {
    bot.sendMessage(chatId, "Welcome to TG Alerts!");
}

export function handleHelp(chatId: number) {
    bot.sendMessage(chatId, "Available commands: /start, /help, /set");
}


export function sendPriceAlert(
    chatId: number,
    coin: string,
    currentPrice: number,
    targetPrice: number
) {
    const message =
        `🔔 ${coin} price target reached!\n\n` +
        `Current price: $${currentPrice}\n` +
        `Your target: $${targetPrice}`;

    return bot.sendMessage(chatId, message);
}
