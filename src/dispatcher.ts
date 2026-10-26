
import { bot, handleStart, handleHelp } from './bot';
import { saveTarget, getTargets, deleteTarget } from './storage';

const validCoins = ['BTC', 'ETH', 'SOL'];

bot.on('message', (msg) => {
    if (!msg.text) return;

    console.log('Received message:', msg.text);

    const parts = msg.text.trim().split(/\s+/);
    const command = parts[0];
    const coin = parts[1];
    const price = parts[2];

    if (command === '/start') {
        handleStart(msg.chat.id);

    } else if (command === '/help') {
        handleHelp(msg.chat.id);

    } else if (command === '/set') {
        const targetPrice = Number(price);

        if (
            !coin ||
            !validCoins.includes(coin) ||
            !price ||
            !Number.isFinite(targetPrice) ||
            targetPrice <= 0 ||
            parts.length !== 3
        ) {
            bot.sendMessage(
                msg.chat.id,
                'Usage: /set BTC 80000\nSupported coins: BTC, ETH, SOL\nPrice must be positive.'
            );
            return;
        }

        saveTarget(msg.chat.id, coin, targetPrice);

        bot.sendMessage(
            msg.chat.id,
            `Target set: ${coin} at $${targetPrice}`
        );

    } else if (command === '/clear') {
        if (!coin || parts.length !== 2) {
            bot.sendMessage(msg.chat.id, 'Usage: /clear SOL');
            return;
        }

        if (!validCoins.includes(coin)) {
            bot.sendMessage(
                msg.chat.id,
                'Unsupported coin. Use BTC, ETH, or SOL.'
            );
            return;
        }

        const result = deleteTarget(msg.chat.id, coin);

        if (result.changes === 0) {
            bot.sendMessage(
                msg.chat.id,
                `No target set for ${coin}.`
            );
            return;
        }

        bot.sendMessage(
            msg.chat.id,
            `Target cleared for ${coin}.`
        );

    } else if (command === '/targets') {
        const savedTargets = getTargets(msg.chat.id);

        if (savedTargets.length === 0) {
            bot.sendMessage(msg.chat.id, 'No active targets.');
            return;
        }

        let message = 'Active price targets:\n';

        for (const target of savedTargets) {
            message += `${target.coin} — $${target.target_price}\n`;
        }

        bot.sendMessage(msg.chat.id, message);

    } else {
        bot.sendMessage(
            msg.chat.id,
            'Unknown command. Try /start, /help, /set, /clear, or /targets.'
        );
    }
});
