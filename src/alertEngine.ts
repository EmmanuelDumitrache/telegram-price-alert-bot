
import { getPrice } from "./prices";
import {
    getAllTargets,
    markTargetAlerted
} from "./storage";
import { sendPriceAlert } from "./bot";

export async function checkPriceTargets() {
    const savedTargets = getAllTargets();

    for (const target of savedTargets) {
        // Skip targets that have already triggered an alert.
        if (target.alerted === 1) {
            continue;
        }

        try {
            const price = await getPrice(target.coin);

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

                // Only mark it after Telegram accepts the message.
                markTargetAlerted(
                    target.chat_id,
                    target.coin
                );

                console.log("Alert sent and saved.");
            } else {
                console.log("Target not reached.");
            }
        } catch (error) {
            console.error(
                `Failed to check ${target.coin}:`,
                error
            );
        }
    }
}
