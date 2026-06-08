# Polkadot AI Explorer

A live dashboard for exploring the Polkadot blockchain network, powered by AI analysis.

Built as a portfolio project to demonstrate real-time blockchain data visualization and AI integration.

![Polkadot AI Explorer Screenshot](https://snipboard.io/mUq96H.jpg)

## Features

- **Live Chain Data** – Real-time block number, validators, transactions, and block hash via WebSocket connection to the Polkadot network
- **Transaction Chart** – Visual history of the last 20 blocks with transaction activity
- **DOT Price** – Live DOT/USD price and 24h change via CoinGecko API
- **Network Health** – Connected peers and node sync status
- **AI Summary** – On-demand network analysis powered by Claude (Anthropic)

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Polkadot.js API
- Recharts
- Anthropic Claude API
- CoinGecko API

## Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/polkadot-ai-explorer
cd polkadot-ai-explorer
npm install
npm run dev
```

## AI Feature

The AI summary feature requires an Anthropic API key. You can get one at [console.anthropic.com](https://console.anthropic.com).

Enter your key directly in the app – it will be saved in your browser's local storage.

## Data Sources

- Chain data: Polkadot public RPC (`wss://rpc.polkadot.io`)
- Price data: CoinGecko public API
- AI analysis: Anthropic Claude API (user-provided key)
