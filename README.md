# CommitVault — Frontend Dashboard

A conceptual banking interface that connects directly to a `Node.js / MySQL` backend — built to showcase advanced SQL concepts: views, stored procedures, triggers, and transactional integrity.

![React](https://img.shields.io/badge/React-Vite-20232A?style=flat-square&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React.js |
| Bundler | Vite |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| HTTP Client | Axios |

---

## Features & SQL Concepts

| SQL Concept | Implementation |
|---|---|
| **`VIEW`** | Portfolio balances are aggregated server-side — secure, pre-computed, never exposed as raw table data. |
| **`STORED PROCEDURE`** | Fund transfers invoke `CALL transfer_funds()` on the backend — atomic, reusable logic with built-in validation. |
| **`TRANSACTION`** | Every debit-credit pair is wrapped in a transaction block, guaranteeing full commit or full rollback — no partial states. |
| **`AFTER INSERT TRIGGER`** | The transaction ledger reflects live trigger writes — the UI updates in real time without manual refresh logic. |
| **`JOIN`** | Transaction history is assembled via multi-table joins, pulling user, account, and ledger data into a single normalized response. |
| **Dynamic Context** | A global profile switcher simulates multi-tenant data fetching — each user context re-queries filtered account records. |

---

## Getting Started

**Prerequisites:** Node.js installed. The [CommitVault Backend](https://github.com/pallavithegod/CommitVault-Backend) must be running on port `5000`.

```bash
# 1. Clone and install
git clone <repo-url>
npm install

# 2. Start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

---