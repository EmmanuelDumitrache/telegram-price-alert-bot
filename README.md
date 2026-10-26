# Telegram Price Alert Bot

A Telegram bot that periodically checks crypto prices, fetches live market data via the CoinGecko API, checks against user target prices stored in a database, and sends a Telegram alert once a target is reached.

## Features & Commands

The bot uses Telegram long-polling to listen for commands and scans prices every 60 seconds.

- `/start` — Welcome message and bot introduction.
- `/set <COIN> <PRICE>` — Sets a price alert (e.g. `/set BTC 80000`). Supported coins: `BTC`, `ETH`, `SOL`.
- `/targets` — Lists all your currently active price targets.
- `/clear <COIN>` — Removes a saved target (e.g. `/clear SOL`).
- `/help` — Lists available commands and usage info.

---

## Project Structure & Files

- **`package.json`**
  - Project config / dependencies. Built with TypeScript and Node.js.
  - Key libraries: `node-telegram-bot-api`, `better-sqlite3`, `dotenv`, and `tsx` for running TypeScript directly.

- **`src/index.ts`**
  - Entry point. Loads environment variables and starts the scheduler.

- **`src/bot.ts`**
  - Initializes the Telegram bot instance (long-polling) and formats outgoing alert messages.

- **`src/dispatcher.ts`**
  - Parses incoming user messages, validates coin inputs and prices, and routes commands (`/start`, `/set`, `/targets`, `/clear`, `/help`).

- **`src/prices.ts`**
  - Fetches live USD prices for supported coins using the CoinGecko API.

- **`src/pairs.ts`**
  - Defines supported pairs (`BTC`, `ETH`, `SOL`) and maps them to CoinGecko IDs.

- **`src/alertEngine.ts`**
  - Queries active targets, fetches current market prices, compares them against targets, sends Telegram alerts, and marks triggered targets so users aren't spammed.

- **`src/scheduler.ts`**
  - Runs the price check routine every 60 seconds. Includes an `isChecking` flag so overlapping checks don't pile up if an API call takes longer.

- **`src/database.ts` & `src/storage.ts`**
  - SQLite selected for basic storage; persistent, structured, constraints, transactions.
  - Manages the `targets` table (`chat_id`, `coin`, `target_price`, `alerted`) and CRUD helper functions using `better-sqlite3`.

---

## Setup & Running Locally

### 1. Prerequisites
- Node.js (v18+)
- A Telegram Bot Token (from [@BotFather](https://t.me/BotFather))
- A CoinGecko API Key (free demo key)

### 2. Install dependencies
```bash
npm install
```

### 3. Environment variables
Copy `.env.example` to `.env` and fill in your keys:
```bash
cp .env.example .env
```

```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
COINGECKO_API_KEY=your_coingecko_api_key_here
```

### 4. Run the bot
To run in development mode with auto-reload:
```bash
npm run dev
```

To run normally:
```bash
npm start
```
