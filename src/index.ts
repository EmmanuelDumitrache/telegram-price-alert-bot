
import "dotenv/config";
import "./bot";
import "./dispatcher";
import "./database";
import { startScheduler } from "./scheduler";

function startApp() {
    console.log("Starting TG Alerts...");
    startScheduler();
}

startApp();
