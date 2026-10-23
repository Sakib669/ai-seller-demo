# Subscriptions BD Marketplace

A full stack digital subscriptions and software license marketplace built with Next.js 15, Prisma ORM, SQLite, Better Auth, and SSLCommerz payment gateway integration. Styled with the Forest and Mint theme and typography pairing Outfit, Plus Jakarta Sans, and JetBrains Mono.

## Features

- Dynamic catalog with real time search, category filters, and layout switcher
- Multi tier product pricing with instant billing recalculation
- Conditional customer credential collection for managed accounts
- Real time shopping cart drawer backed by Zustand local persistence
- Automated checkout pipeline with SSLCommerz gateway integration
- Instant PDF and printable HTML invoice rendering with QR verification
- Customer order portal with secure order token verification
- Responsive editorial blog system with technical buying guides
- Multilingual font pairing supporting English and Bengali scripts

## Tech Stack

- Framework: Next.js 15 with React 19 and App Router
- Styling: Tailwind CSS with Forest and Mint palette
- Typography: Outfit for headings, Plus Jakarta Sans for body, JetBrains Mono for prices and codes
- Database: SQLite powered by Prisma ORM
- State Management: Zustand with localStorage persistence
- Authentication: Better Auth with SQLite adapter
- Payments: SSLCommerz sandbox and live payment gateway handler
- Icons: Lucide React

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Sakib669/ai-seller-demo.git
cd ai-seller-demo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set your configuration values:

```env
DATABASE_URL="file:./dev.db"
BETTER_AUTH_SECRET="your-secret-token"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

SSLCOMMERZ_STORE_ID="testbox"
SSLCOMMERZ_STORE_PASSWORD="qwerty"
SSLCOMMERZ_IS_LIVE="false"
```

### 4. Initialize Database

Run Prisma migrations and populate the seed catalog:

```bash
npx prisma db push
npm run seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the marketplace.

## Project Structure

```text
├── prisma/
│   ├── schema.prisma          # Database schema definitions
│   └── seed.ts                # Catalog and blog seed dataset
├── src/
│   ├── app/                   # Next.js App Router pages and API routes
│   │   ├── api/checkout/      # Order creation and payment initiation
│   │   ├── api/orders/        # Invoice rendering endpoint
│   │   ├── api/payment/       # SSLCommerz IPN callback handler
│   │   ├── blogs/             # Editorial blog routes
│   │   ├── checkout/          # Checkout page
│   │   ├── customer/          # Customer order history
│   │   ├── order/             # Order confirmation details
│   │   ├── product/           # Product detail page
│   │   └── shop/              # Catalog browsing and filter page
│   ├── components/            # Reusable UI components
│   │   ├── cart/              # Cart drawer and controls
│   │   ├── catalog/           # Product card and purchase box
│   │   └── layout/            # Header, footer, ticker, contact
│   ├── lib/                   # Database client, auth, and utilities
│   └── store/                 # Zustand shopping cart state
└── docs/                      # Architectural specifications
```

## License

MIT
