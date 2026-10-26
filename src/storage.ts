
import db from "./database";

export function saveTarget(
    chatId: number,
    coin: string,
    targetPrice: number
) {
    const statement = db.prepare(`
        INSERT INTO targets (chat_id, coin, target_price)
        VALUES (?, ?, ?)
        ON CONFLICT(chat_id, coin)
        DO UPDATE SET
            target_price = excluded.target_price,
            alerted = 0
    `);

    statement.run(chatId, coin, targetPrice);
}

export function getTargets(chatId: number) {
    const statement = db.prepare(`
        SELECT coin, target_price
        FROM targets
        WHERE chat_id = ?
    `);

    return statement.all(chatId) as {
        coin: string;
        target_price: number;
    }[];
}

export function deleteTarget(chatId: number, coin: string) {
    const statement = db.prepare(`
        DELETE FROM targets
        WHERE chat_id = ? AND coin = ?
    `);

    return statement.run(chatId, coin);
}

export function getAllTargets() {
    const statement = db.prepare(`
        SELECT chat_id, coin, target_price, alerted
        FROM targets
    `);

    return statement.all() as {
        chat_id: number;
        coin: string;
        target_price: number;
        alerted: number;
    }[];
}

export function markTargetAlerted(chatId: number, coin: string) {
    const statement = db.prepare(`
        UPDATE targets
        SET alerted = 1
        WHERE chat_id = ? AND coin = ?
    `);

    statement.run(chatId, coin);
}

export function resetTargetAlert(chatId: number, coin: string) {
    const statement = db.prepare(`
        UPDATE targets
        SET alerted = 0
        WHERE chat_id = ? AND coin = ?
    `);

    statement.run(chatId, coin);
}
