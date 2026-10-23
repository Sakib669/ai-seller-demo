# Project Scope

**Workflow**: Prototype

## At a glance

| Feature | Status | Spec | Approach |
|---|---|---|---|
| Core digital subscriptions marketplace | built | [0001](../specs/0001-core-tech-stack-and-architecture.md) | Tracer Bullet |

---

## Core digital subscriptions marketplace

**Intent**: Deliver a high performance digital subscriptions marketplace built with Next.js, TypeScript, SQLite, Better Auth, and SSLCommerz, styled in the Hermes electric cobalt palette.

**Done when**: Customers can register, log in, browse subscriptions, add items to cart, checkout with SSLCommerz, and receive their digital license keys or credentials with downloadable PDF receipts.

- [x] Decide the stack (spec): [0001](../specs/0001-core-tech-stack-and-architecture.md)
- [x] Build it: /develop core digital subscriptions marketplace
  - [x] Milestone 1: Initialize Next.js 15 project with TypeScript, Tailwind CSS, and Hermes electric cobalt palette (satisfies AC 8)
  - [x] Milestone 2: Configure SQLite database and Prisma schema with Better Auth customer authentication models (satisfies AC 3, AC 4)
  - [x] Milestone 3: Implement product catalog with category filters and multi column layout switcher (satisfies AC 1)
  - [x] Milestone 4: Build persistent Zustand shopping cart and checkout form with phone validation (satisfies AC 2, AC 5)
  - [x] Milestone 5: Implement SSLCommerz payment integration, automated license key fulfillment, and downloadable printable invoices (satisfies AC 5, AC 6, AC 7)
- [ ] Verify it: /check verify core digital subscriptions marketplace
- [ ] Test it: /test core digital subscriptions marketplace
