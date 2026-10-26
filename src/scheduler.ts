
import { checkPriceTargets } from "./alertEngine";

let isChecking = false;

export function startScheduler() {
    console.log("Price scheduler started.");

    async function runCheck() {
        if (isChecking) {
            console.log("Previous check still running. Skipping.");
            return;
        }

        isChecking = true;

        try {
            console.log("Running price check...");
            await checkPriceTargets();
        } catch (error) {
            console.error("Price check failed:", error);
        } finally {
            isChecking = false;
        }
    }

    void runCheck();

    setInterval(() => {
        void runCheck();
    }, 60_000);
}
