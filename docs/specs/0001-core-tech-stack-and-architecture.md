# 0001. Core tech stack and architecture for digital subscriptions marketplace

**Date**: 2026-10-23
**Status**: Accepted

## Summary

This decision defines the foundation and technology choices for building a digital subscriptions marketplace in Bangladesh. We select Next.js with TypeScript running on Node.js, backed by PostgreSQL and Prisma ORM for relational data storage. Customer authentication uses Better Auth with session cookies, and the user interface adopts the Hermes design system featuring electric cobalt blue on deep midnight canvas. This setup guarantees type safety, fast page loads, reliable local payment processing, and high end agency visual polish.

## Context

The goal is to build a modern, high converting online store for digital subscriptions, artificial intelligence tools, OTT streaming profiles, and software license keys in Bangladesh. The existing benchmark site in this space relies on legacy PHP with jQuery, which lacks modern type safety, fast client transitions, and automated inventory reservation. 

Multiple constraints shape this decision:
1. Operational runtime rules mandate a strict Node.js policy for running, serving, and building the application, without non Node runtimes.
2. The user experience requires a high end aesthetic based on the Hermes brand palette, specifically electric cobalt blue (#0000F2) on a deep midnight canvas (#060814) with translucent cobalt cards (#1E293B) and editorial typography.
3. Digital goods sales require strict inventory integrity. When a customer purchases a product key or a shared streaming screen, the system must prevent race conditions and double selling through atomic database transactions.
4. Local payment settlement in Bangladesh must support mobile wallets like bKash, Nagad, and Rocket, along with local and international debit or credit cards.
5. Invoices must be generated reliably as downloadable PDF documents on standard paper sizes.

Failing to decide these foundational layers up front risks architectural drift, mismatched tooling, payment callback security gaps, and inconsistent styling across screens.

## Requirements

**User stories**:
- As a customer, I want to browse digital subscriptions with instantaneous filtering and responsive layouts so that I can easily discover tools and pricing tiers.
- As a customer, I want a shopping cart that preserves items across page reloads and device restarts so that I can complete checkout smoothly.
- As a customer, I want to pay securely using local payment options including bKash, Nagad, Rocket, or credit cards through a verified gateway and receive instant order receipts.
- As a customer, I want access to my purchased license keys and shared profile credentials directly in my personal order dashboard immediately after payment.
- As an administrator, I want an inventory tracking system that automatically dispenses license keys from stock pools and queues shared account credentials for staff provisioning.

**Acceptance criteria**:
- **AC-1**: Product catalog renders with server side generation and dynamic caching, supporting multi column grid views (2, 3, or 4 columns) stored in local preferences.
- **AC-2**: Shopping cart state synchronizes immediately in client memory and local storage via Zustand, persisting items across page navigations and sessions.
- **AC-3**: Authentication supports customer sign up, sign in, session persistence with secure HTTP cookies, and role based access control (customer and administrator) via Better Auth.
- **AC-4**: PostgreSQL database enforces strict relational constraints, foreign keys, and atomic inventory reservation transactions using Prisma ORM.
- **AC-5**: Checkout initiates a verified payment session through the SSLCommerz gateway, redirecting customers and handling validation IPN callbacks with cryptographic signature checks.
- **AC-6**: Successful payment triggers hybrid fulfillment: instant automated assignment of pre loaded license keys for software products, and creation of an administrative provisioning task for shared streaming profiles.
- **AC-7**: System generates a standardized downloadable PDF invoice upon order completion with exact line items, prices in Bangladeshi Taka (৳), transaction identifiers, and business license information.
- **AC-8**: User interface strictly adheres to the Hermes visual design system, applying Electric Cobalt Blue (#0000F2) accents, Deep Midnight (#060814) background, and high contrast typography.

## Options considered

### Option 1: Next.js with TypeScript on Node.js, PostgreSQL with Prisma ORM, Better Auth, and SSLCommerz (Recommended)

A full stack TypeScript monolith utilizing Next.js App Router for server components, server actions, and API routes. Data persistence relies on PostgreSQL managed through Prisma ORM. Customer authentication is handled by Better Auth with Prisma adapter, while client state lives in a lightweight Zustand store. Payment processing runs through SSLCommerz aggregator to consolidate bKash, Nagad, Rocket, cards, and bank transfers in one integration.

**Pros**:
- Single language and shared types across frontend and backend, preventing interface mismatch.
- React Server Components minimize client bundle size and provide fast search engine indexing for product pages.
- Native compliance with the project strict Node.js runtime directive.
- Robust ACID compliance in PostgreSQL ensures zero stock overselling during flash promotions.
- Built in session cookie security, CSRF protection, and email password flows with Better Auth.

**Cons**:
- Requires managing Node.js hosting and a PostgreSQL instance.
- Node.js PDF generation adds a small memory footprint during concurrent invoice generation.

### Option 2: Remix (React Router v7) with Node.js, Drizzle ORM, and Direct bKash plus Nagad APIs

A full stack React application powered by Remix / React Router v7 on Node.js, utilizing Drizzle ORM for database access and individual direct merchant APIs for bKash and Nagad alongside a separate card gateway.

**Pros**:
- Lightweight runtime with fine grained HTTP cache control and straightforward nested routing.
- Drizzle ORM provides near zero abstraction overhead over raw SQL queries.
- Direct merchant APIs avoid gateway aggregator commission fees.

**Cons**:
- Maintaining separate direct integrations for bKash, Nagad, Rocket, and card acquiring increases ongoing maintenance and webhook reconciliation complexity.
- Drizzle requires more boilerplate for relational nesting compared to Prisma.
- Fewer turnkey authentication ecosystems than Better Auth in Next.js.

### Option 3: Monolithic PHP with Laravel, Blade templates, and MySQL (Legacy Target Stack)

Replicating the original reverse engineered website architecture with PHP 8.x, Laravel framework, Blade templates, and jQuery.

**Pros**:
- Direct parity with the reference site folder structure and asset conventions.
- Built in Laravel authentication and queue processing.

**Cons**:
- Violates the workspace directive that strictly requires Node.js execution for the project.
- Lacks modern interactive client component capabilities without adding extra hybrid libraries.
- Slower client side navigations compared to React server components and prefetching.

## Decision

**Chosen option**: Option 1: Next.js with TypeScript on Node.js, PostgreSQL with Prisma ORM, Better Auth, and SSLCommerz.

We will build the subscriptions marketplace as a unified full stack Next.js application on Node.js with PostgreSQL and the Hermes design system.

**Implementation skills**: `context7-docs`, `high-end-visual-design`, `minimalist-ui`, `gpt-taste`, `frontend-design`.

## Rationale

Option 1 provides the highest reliability, velocity, and design flexibility while strictly honoring the project workspace rules. Next.js App Router allows us to render SEO critical product pages server side with extreme speed, while maintaining smooth, app like transitions for cart drawers and checkout steps.

PostgreSQL with Prisma ORM delivers rock solid ACID transactions, which are essential for digital stores where inventory slots (such as ChatGPT slots, Windows keys, or YouTube family invites) must never be assigned to two buyers at once. Better Auth provides modern TypeScript native authentication without external SaaS vendor lock in, storing sessions directly in our PostgreSQL database with secure cookies. Consolidating payments through the SSLCommerz aggregator simplifies local compliance and provides instant coverage for all Bangladeshi mobile financial services and debit or credit cards through a single robust webhook lifecycle.

## Proposed stack

| Layer | Choice | Reason |
|---|---|---|
| Runtime | Node.js 20+ / 22 LTS | Fulfills strict workspace policy and runs the full stack with native performance |
| Language | TypeScript | End to end type safety between database models, server actions, and UI components |
| Framework | Next.js 15+ (App Router, React 19) | Server components for SEO, server actions for mutations, and fast client routing |
| Primary Database | PostgreSQL 16+ | ACID compliance, JSONB support for credential payloads, and strict relational integrity |
| Database ORM | Prisma ORM | Automated migrations, type safe queries, and declarative schema models |
| Authentication | Better Auth with Prisma adapter | Self hosted TypeScript auth with session cookies, email and password, and role checks |
| Client State & Cart | Zustand with persistence | Offline shopping cart saved to browser local storage, syncing to checkout |
| UI & Styling | Tailwind CSS with Shadcn UI | Utility first styling with Radix UI accessible primitives and zero runtime overhead |
| Design Theme | Hermes Brand System | Electric Cobalt Blue (#0000F2), Deep Midnight (#060814), and high contrast white text |
| Payment Gateway | SSLCommerz Aggregator | Single integration for bKash, Nagad, Rocket, card processing, and IPN verification |
| Invoice Generation | React PDF (@react-pdf/renderer) | Server rendered, pixel perfect A4 invoices with zero browser compatibility quirks |
| Validation | Zod | Runtime validation for API requests, checkout forms, and environment configurations |

## Build plan

The build plan follows an end to end tracer bullet approach, standing up a thin working slice through the database, authentication, catalog, cart, checkout, and invoice pipeline, then expanding each capability:

1. Initialize Next.js project with TypeScript, Tailwind CSS, Shadcn UI base, and Hermes design tokens, satisfies **AC-8**.
2. Configure PostgreSQL connection and create initial Prisma schema (User, Session, Product, Variant, LicenseKey, Order, OrderItem), satisfies **AC-4**.
3. Integrate Better Auth with Prisma adapter, implementing customer registration, login, and protected route handlers, satisfies **AC-3**.
4. Build product catalog queries and UI, including category navigation, search filtering, and multi column grid switcher (2, 3, 4 columns), satisfies **AC-1**.
5. Implement client side shopping cart with Zustand, supporting item add, quantity adjustment, removal, and persistent local storage, satisfies **AC-2**.
6. Develop checkout page with customer contact collection, international phone formatting, and delivery email address fields, satisfies **AC-5**.
7. Create SSLCommerz payment gateway service, handling session initialization, customer redirect, and secure IPN webhook validation, satisfies **AC-5**.
8. Implement hybrid order fulfillment service, automatically locking and dispensing available license keys, and creating manual review records for shared account items, satisfies **AC-6**.
9. Build invoice generation endpoint using React PDF, returning downloadable A4 order receipts with order codes and business tax license details, satisfies **AC-7**.
10. Implement customer dashboard at `/customer/orders` displaying active subscriptions, license keys, login instructions, and invoice download links, satisfies **AC-3**, **AC-6**.

## Consequences

**Positive**:
- Single unified codebase in TypeScript with full type safety across database, server, and client.
- Fast page loads and strong SEO optimization for organic search engine rankings in Bangladesh.
- Full compliance with the mandatory Node.js execution policy.
- Zero external SaaS dependency for authentication; all user credentials and sessions stay in project database.
- Scalable inventory system capable of handling both automated software keys and managed shared accounts.

**Negative / tradeoffs**:
- Requires running and maintaining a PostgreSQL database service.
- Server side PDF generation consumes slightly more server memory per concurrent request than purely static HTML pages.
- SSLCommerz gateway charges a standard per transaction aggregator fee compared to direct merchant accounts.

**Neutral**:
- Team and developers must follow Prisma migration workflows (`npx prisma migrate dev`) when altering schema.
- Environment variables must be securely configured for database connection strings and gateway store credentials.

## Follow-up

- [ ] Obtain live SSLCommerz store credentials (`STORE_ID` and `STORE_PASSWD`) or sandbox credentials for local integration testing.
- [ ] Set up PostgreSQL database instance locally or on a managed cloud container.
- [ ] Populate product catalog seed data with core digital subscription categories (AI tools, OTT streaming, Office suites, Operating systems).
- [ ] Add rate limiting on authentication and payment webhook endpoints using Upstash Redis or memory cache.

## References

**Project sources**:
- Workspace directives: Strict Node.js execution policy (Rule 1).
- Workspace brand palette: Hermes launch edition theme (Electric Cobalt Blue `#0000F2`, Deep Midnight `#060814`).
- Reverse engineering findings: `SUBSCRIPTIONSBD_REVERSE_ENGINEERING_REPORT.md` in workspace root.

**Practices & standards**:
- OWASP Session Management and Secure Cookie Guidelines.
- Payment Gateway IPN (Instant Payment Notification) cryptographic validation patterns.
- ACID database transaction isolation for e commerce stock inventory reservation.

**Links**:
- Next.js Documentation: https://nextjs.org/docs
- Prisma ORM Quickstart: https://www.prisma.io/docs/getting-started/quickstart
- Better Auth Documentation: https://better-auth.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Shadcn UI: https://ui.shadcn.com
- SSLCommerz Developer Documentation: https://developer.sslcommerz.com
