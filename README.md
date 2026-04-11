# CommitVault - Frontend Dashboard

This is the user interface for **CommitVault**, a conceptual banking application dashboard. It connects directly to a Node.js/MySQL backend to visualize advanced database operations in a clean, modern, and responsive UI.

## 🛠️ Tech Stack
* **Framework:** React.js (via Vite)
* **Styling:** Tailwind CSS
* **Icons:** Lucide React (SVG/Inline implementations)
* **HTTP Client:** Axios

## ✨ Features
* **Dynamic User Context:** Instantly switch between customer profiles via a global dropdown to simulate multi-tenant data fetching.
* **Real-Time Portfolio Tracking:** Displays aggregate balances securely calculated on the server using MySQL Database Views.
* **Smart Transfer Logic:** Dynamic "From Account" selectors that fetch active accounts specific to the currently logged-in user.
* **Secure Fund Transfers:** Interactive form that triggers ACID-compliant Stored Procedures on the backend.
* **Transaction History:** Real-time ledger updates reflecting database triggers and relational data joins.

## 🚀 Getting Started

### Prerequisites
* Node.js installed on your machine.
* The [CommitVault Backend](https://github.com/pallavithegod/CommitVault-Backend) must be running concurrently on port `5000` for the dashboard to fetch real data.

### Setup Instructions
1. Clone this repository to your local machine.
2. Navigate into the project directory and install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your web browser and navigate to the local URL provided by Vite (typically `http://localhost:5173`).

---
*Built for the Engineering DBMS Project presentation.*
