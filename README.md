# Wow Stunning - Modern Commerce Frontend

## Overview
This is a high-fidelity, production-ready **Headless Commerce Frontend** for the "Wow Stunning" brand. It implements the UI/UX requirements for a modern women's fashion store, including:

- **Tech Stack:** React 18, TypeScript, Tailwind CSS.
- **Features:**
  - Responsive Mobile-First Design.
  - Product Catalog with Category Filtering.
  - Dynamic Currency Conversion (USD, EUR, GBP, INR, NZD).
  - Slide-out Cart & Checkout Logic.
  - Simulated "Luxe" Fashion aesthetic.

## Note on WordPress Request
While the original request asked for a PHP/WordPress ZIP file, this codebase represents the **Client-Side** portion of a modern Headless WordPress architecture. 

To achieve the full backend functionality described (WooCommerce, Admin Panel, Database):

1. **Deploy WordPress:** Install WordPress on your host (LAMP/LEMP).
2. **Install WooCommerce:** Set up products, taxes, and shipping as per your requirements.
3. **Connect API:** You would modify `constants.ts` and `services/shopService.ts` in this project to fetch data from the WooCommerce REST API (using WPGraphQL or standard REST endpoints) instead of the local mock data.

## Installation & Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Locally:**
   ```bash
   npm start
   ```

3. **Build for Production:**
   ```bash
   npm run build
   ```

## Key Configuration Files
- `constants.ts`: Contains the mock product database (simulating the CSV import) and currency rates.
- `types.ts`: Defines the data models.
- `context/ShopContext.tsx`: Handles cart logic and global state.

## Security Note
This frontend is safe to deploy to any static host (Netlify, Vercel, S3). It contains no secret keys. When connecting to a real backend, ensure Stripe/Razorpay public keys are stored in environment variables (`process.env.REACT_APP_STRIPE_KEY`).

## Admin Credentials (for your future backend)
As requested, if you set up a WordPress backend separately:
- **User:** WStunning
- **Pass:** JustWow#82
- **Action:** Change immediately upon creation and enable 2FA.
