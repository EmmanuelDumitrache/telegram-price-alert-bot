
import { getPrice } from "./prices";
import { getAllTargets } from "./storage";
import { sendPriceAlert } from "./bot";

export const pairs = ["BTC", "ETH", "SOL"] as const;

export const coinIds: Record<string, string> = {
    BTC: "bitcoin",
    SOL: "solana",
    ETH: "ethereum"
};

export async function pairLoop() {
    const savedTargets = getAllTargets();

    for (const target of savedTargets) {
        const price = await getPrice(target.coin);

        console.log("Chat:", target.chat_id);
        console.log("Coin:", target.coin);
        console.log("Current price:", price);
        console.log("Target price:", target.target_price);

        if (price <= target.target_price) {
            console.log("Target reached!");

            await sendPriceAlert(
                target.chat_id,
                target.coin,
                price,
                target.target_price
            );
        } else {
            console.log("Target not reached.");
        }
    }
}
