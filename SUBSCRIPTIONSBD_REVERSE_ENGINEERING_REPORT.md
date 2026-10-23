# Comprehensive Reverse Engineering & Architectural Analysis
## Target: `https://subscriptionsbd.net/` (Subscriptions BD)

**Date of Investigation:** October 2026  
**Methodology:** Passive Runtime Observation, Client-side DOM & AST Analysis, Network Signature Fingerprinting, JavaScript Deobfuscation & Dependency Mapping.

---

## Executive Summary

**Subscriptions BD** (`subscriptionsbd.net`) is one of Bangladesh's leading e-commerce platforms specializing in digital subscriptions, software licenses, AI service memberships, and OTT streaming accounts.

The website is powered by a **monolithic PHP / Laravel** backend with server-rendered Blade templates, accelerated by **Bootstrap 5**, **jQuery**, and specialized client libraries for AJAX cart manipulation, client-side PDF invoice generation, and anti-tampering / anti-DevTools protections. The entire infrastructure sits behind **Cloudflare CDN & Turnstile Bot Management** with SSL encryption.

---

## 1. Architectural & Technology Stack Matrix

| Layer | Technology / Library | Version / Details | Purpose |
| :--- | :--- | :--- | :--- |
| **Backend Framework** | **PHP / Laravel** | Laravel 10.x / 11.x | Core web MVC, session state, routing, Blade templates |
| **Server / Proxy** | **Cloudflare** | Turnstile + Edge WAF | DDoS mitigation, bot challenge, edge caching, SSL/TLS |
| **Frontend Foundation** | **Bootstrap** | 5.x (`bootstrap.bundle.min.js`) | Responsive layout grid, modals, offcanvas drawers |
| **DOM / Scripting** | **jQuery** | `v3.7.1` (`jquery.min.js`) | DOM manipulation, AJAX cart operations |
| **Animation & Carousels** | **Swiper.js**, **AOS**, **CounterUp** | Swiper 9/10, AOS 2.x, Waypoints | Hero banner slides, category swipers, scroll animations |
| **Form & Input Enhancement** | **intl-tel-input** | `v25.2.0` | International phone input, dial code, flag picker |
| **GeoIP Lookup Service** | **ipinfo.io** API | Token: `feb49731857e47` | Auto-detects visitor country (falls back to `bd`) |
| **Notifications & Dialogs**| **SweetAlert2** | `sweetalert2.all.min.js` | Toast alerts (`swalAlert`) for cart/action feedback |
| **Document Generation** | **html2pdf.js** | `v0.9.2` (html2canvas + jsPDF) | Client-side dynamic PDF invoice generation |
| **Client Protection** | Custom `protection.min.js` | Proprietary script | Blocks DevTools, Right-Click, Copying, Key shortcuts |
| **Analytics & Telemetry** | Google Analytics 4, GTM, Meta Pixel, MS Clarity | GTM-MK5GL7FM, G-T5PRGYD3L0, Pixel 363732688077111 | Traffic attribution, user behavior recording, conversions |

---

## 2. Authentication & Session Architecture

### 2.1 Auth Library & Mechanism
- **Engine:** Built-in **Laravel Session Authentication** (`Illuminate\Auth`, likely using standard Laravel Breeze or Custom Auth Controllers).
- **Session State:** State is preserved using encrypted HTTP cookies:
  - `laravel_session`: Server-side session identifier, marked `HttpOnly`, `SameSite=Lax`, and `Secure`.
  - `XSRF-TOKEN`: Standard encrypted Laravel CSRF cookie (JSON payload containing `iv`, `value`, `mac`, `tag`).
- **CSRF Token:** Embedded in the page via `<meta name="csrf-token" content="...">` and injected into all AJAX POST requests (`_token`).

### 2.2 Auth Endpoints & Pages
1. **Login Page (`/login`):**
   - **Method:** `GET` / `POST` to `/login`
   - **Fields:**
     - `identity` or `email`: Customer email or phone number
     - `password`: User password
     - `remember`: "Remember Me" checkbox
     - `_token`: CSRF protection token
   - **Features:** Password reset redirection (`/forgot-password`), session remember token.
2. **Registration Page (`/signup`):**
   - **Method:** `GET` / `POST` to `/signup` or `/register`
   - **Fields:**
     - Full Name
     - Email Address
     - Phone Number (formatted via `intl-tel-input` into E.164 standard)
     - Password & Confirm Password
     - Country code hidden input (`#country-code`)
3. **Customer Portal (`/customer/orders`):**
   - Requires active user session.
   - Displays historical orders, purchased software license keys, shared account login credentials, validity status, and renewal prompts.

---

## 3. Site Pages & Routing Structure

### 3.1 Public Navigation & Content Pages
| Route | Page Name | Description / Functional Role |
| :--- | :--- | :--- |
| `/` | **Home Page** | Hero carousel, Category links, Best Sellers, New Uploads, FAQs, Testimonials, Recent Blog Posts. |
| `/shop` | **Shop / Catalog** | Complete digital inventory with multi-column layout switcher (`2`, `3`, `4` cols), sorting, and search filter. |
| `/product/{slug}` | **Product Details** | Product tier selector, duration/screen options, instant "Add to Cart", pricing calculations. |
| `/cart/index` | **Cart View** | Detailed cart overview with quantity adjustment, item removal, coupon input, subtotal breakdown. |
| `/checkout` | **Checkout** | Customer billing details, delivery email input, payment gateway selection, order placement. |
| `/customer/orders` | **Customer Orders** | Post-purchase portal showing delivered subscription credentials, activation keys, and order states. |
| `/review` | **Customer Reviews** | Aggregated testimonials from Trustpilot, Facebook Page, and Facebook Group. |
| `/blogs` | **Blog Index** | Digital tool tutorials, comparison guides (e.g. ChatGPT vs Gemini, CapCut guide). |
| `/blogs-details/{slug}` | **Single Blog** | Detailed instructional articles and SEO content. |
| `/about` | **About Us** | Company history, mission, and background. |
| `/contact-us` | **Contact Page** | Support form, business address, WhatsApp hotline, direct links. |
| `/privacy-policy` | **Privacy Policy** | Legal disclaimer, user data handling, cookie declaration. |
| `/return-refund-policy`| **Return & Refund** | Warranty policies, replacement timelines for streaming/AI accounts. |
| `/terms-condition` | **Terms of Service** | Purchase conditions, account usage policies, intellectual property declarations. |

### 3.2 Product Category Taxonomies
- `?category=ai-grammer-and-writing-products` (ChatGPT, Claude, Grok, Jenni AI, Quillbot, etc.)
- `?category=video-streaming` / `?category_id=16` (Netflix, Prime Video, HBO Max, Crunchyroll, etc.)
- `?category=audio-streaming` (Spotify, YouTube Premium, Apple Music)
- `?category=educational-tools` / `?category_id=3` (Coursera, Duolingo, Datacamp, Brilliant)
- `?category=utilities` / `?category_id=15` (GitHub Copilot, CapCut, Microsoft Power BI, Terabox)
- `?category=apple-products` (iCloud Family, Apple TV+)
- `?category=key` (Windows 10/11 Pro, Office 365, Project, Visio product keys)
- `?category=vpn` (ExpressVPN, NordVPN, Surfshark)

---

## 4. Button Functionalities & Client-Side Scripts

### 4.1 AJAX Shopping Cart (`/frontend/assets/js/_cart.js`)
The application implements an offcanvas shopping cart (`#viewCart`) and dedicated cart page backed by jQuery AJAX:

1. **Quantity Increment / Decrement:**
   - **Selector:** `$(document).on('click', '.cart-update .minus, .cart-update .plus')`
   - **Logic:**
     - Computes `currentQuantity` (clamped to minimum `1`).
     - Dispatches asynchronous HTTP POST to `/cart/update`:
       ```javascript
       $.ajax({
           url: '/cart/update',
           type: 'POST',
           data: {
               cart_id: cartId,
               quantity: currentQuantity,
               _token: $('meta[name="csrf-token"]').attr('content')
           },
           success: function (response) { ... }
       });
       ```
     - Updates `.total-price`, `.cart-total-price`, and `.cart-total-quantity` in real-time.
2. **Item Removal:**
   - **Selector:** `$(document).on('click', '.remove-item')`
   - **Action:** POST to `/cart/delete` with `cart_id` and `_token`.
   - **DOM Update:** Removes container element `.view-cart-item-container:has(.remove-item[data-id="..."])`.

### 4.2 Interactive Layout & UI Controls (`custom.js` & `style-two.js`)
1. **Shop Grid Column Switcher:**
   - **Functionality:** Toggles grid columns between 2, 3, or 4 columns.
   - **Persistence:** Stored in browser `localStorage`:
     ```javascript
     localStorage.setItem("shop-grid-layout", cls);
     ```
2. **Search Box Expand / Collapse:**
   - Click on `.search-icon` animates `.search-box-2`, hiding the brand logo and cart icon for mobile usability.
3. **Offer Ticker:**
   - Top banner auto-cycles through promotional messages every 4000ms, paused on pointer hover (`pointerenter` / `pointerleave`).
4. **Copy Email to Clipboard:**
   - Clicking `.sh__mail` copies the official contact email to clipboard via `navigator.clipboard.writeText(...)` with feedback animation.
5. **Interactive Floating Contact Menu (`message-btn.js`):**
   - Floating action button at bottom-right expands to show direct **WhatsApp** (`https://web.whatsapp.com/send?phone=8801622633671`) and **Facebook Messenger** (`m.me/web.subscriptionsbd`) triggers.

### 4.3 Invoice PDF Generator (`_developer.js`)
- **Trigger:** Click on `#printInvoice`
- **Library:** `html2pdf.js`
- **Configuration:**
  ```javascript
  html2pdf()
      .from(document.getElementById("invoice-content"))
      .set({
          margin: 10,
          filename: "invoice-" + order_code + ".pdf",
          html2canvas: { scale: 4 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
      })
      .save();
  ```

### 4.4 Phone Internationalization (`_developer.js`)
- **Library:** `intl-tel-input` v25.2.0
- **Target:** `#phone-international`
- **Country Detection:** GeoIP lookup via `https://ipinfo.io/json?token=feb49731857e47` with automatic fallback to Bangladesh (`bd`).
- **Form Submission Hook:** Intercepts `submit` to serialize the full E.164 phone number and stores country dial code in `#country-code`.

---

## 5. Payment Method Libraries & Checkout Integration

### 5.1 Supported Payment Gateways
Subscriptions BD supports Bangladesh's dominant digital transaction ecosystem:
1. **bKash (Direct / Merchant API):**
   - Supports automated bKash Tokenized Checkout or Merchant QR / Push Payment.
   - Allows instant order verification for local customers.
2. **Nagad (Online Payment Gateway):**
   - Supports Nagad Merchant Payment integration.
3. **Rocket (Dutch-Bangla Bank MFS):**
   - Direct payment via Rocket wallet.
4. **SSLCommerz (Aggregator Platform):**
   - Integrated as the primary card and multi-channel banking gateway.
   - Enables payments via:
     - Local & International Debit/Credit Cards (Visa, MasterCard, American Express).
     - Internet Banking (City Bank, Islami Bank, BRAC Bank, etc.).
     - Secondary mobile wallets (Upay, Tap, etc.).

### 5.2 Checkout Workflow Architecture
```
[User Adds Product] 
       │
       ▼
[Offcanvas Cart / /cart/index] 
       │
       ▼
[Checkout Route: /checkout]
   ├── Enter Customer Name & Email
   ├── Internationalized Phone Field (intl-tel-input)
   ├── Subscription Delivery Email (Target Account Info)
   └── Payment Method Selection Radio (bKash, Nagad, Rocket, SSLCommerz)
       │
       ▼
[Order Placement: POST /checkout/store or /order/create]
   ├── Generates Unique Order Code
   └── Redirects to Payment Gateway URL (bKash / SSLCommerz)
       │
       ▼
[Payment Callback Verification: /payment/callback]
   ├── Server-to-server IPN / Webhook verification
   ├── Updates Order Status to "Paid" / "Processing"
   └── Displays Invoice Page with #printInvoice button (html2pdf.js)
```

---

## 6. Client-Side Anti-Tampering & Security Protections

The platform deploys custom client-side defense scripts (`/protection.min.js`):
1. **Context Menu Suppression:**
   - Intercepts `contextmenu` event and executes `e.preventDefault()` to disable right-click inspect menus.
2. **Keyboard Shortcut Blocking:**
   - Blocks `F12` (DevTools shortcut).
   - Blocks `Ctrl + Shift + I` and `Ctrl + Shift + J` (DevTools Console / Elements).
   - Blocks `Ctrl + U` (View Source).
3. **Viewport Dimension Delta DevTools Detection:**
   - Compares `window.outerWidth - window.innerWidth` and `window.outerHeight - window.innerHeight`.
   - If difference exceeds `200px` (indicating DevTools panel docked to side/bottom), it fetches `/devtools-blocked.html` and overwrites `document.documentElement.innerHTML`.
4. **Text Selection & Image Drag Prevention:**
   - Injects global CSS styles:
     ```css
     body {
         -webkit-user-select: none;
         user-select: none;
     }
     img {
         -webkit-user-drag: none;
         user-drag: none;
     }
     ```
5. **Edge Security:**
   - Cloudflare Turnstile Challenge (`challenges.cloudflare.com`) activated on high-frequency and sensitive routes (`/login`, `/signup`, `/checkout`) to defeat automated scrapers and bots.

---

## 7. Business Identification & Extracted Entity Information

- **Company Name:** Subscriptions BD
- **Operating Slogan:** *"Biggest shop for Digital products in Bangladesh"*
- **Established:** Active since 2019 / 2021
- **Government Trade License:**
  - **COCC Trade Licence No:** `2201010800020367`
  - **DBID (Digital Business ID):** `453105002`
- **Headquarters Address:** Holding: Tomsombridge, Adarsha Sadar, Comilla-3500, Bangladesh
- **Contact Channels:**
  - **WhatsApp (Support):** `+880 1622-633671`
  - **Email:** `info@subscriptionsbd.com`
  - **Facebook Fan Page:** `https://facebook.com/web.subscriptionsbd` (Official Verified Page)
  - **Instagram:** `https://instagram.com/subscriptionsbd/`
  - **LinkedIn:** `https://linkedin.com/company/subscriptionsbd/`
- **Reputation Metrics:** 240+ Verified Reviews on Trustpilot (Rated "Excellent").

---

## 8. Sample Extracted Product Catalog & Pricing (BDT ৳)

| Product Name | Category | Pricing Tier (BDT) | Availability |
| :--- | :--- | :--- | :--- |
| **ChatGPT Plus Subscription** | AI & Productivity | 2,799.00 ৳ | In Stock |
| **Grok AI Subscription (Super Grok)**| AI & Productivity | 2,299.00 ৳ | In Stock |
| **Google AI Pro / Ultra \| Gemini** | AI & Productivity | 2,999.00 ৳ – 3,500.00 ৳ | In Stock |
| **Claude AI Personal Subscription** | AI & Productivity | 2,799.00 ৳ | Out of Stock |
| **Lovable Pro Plan (12 Months)** | AI & Productivity | 5,350.00 ৳ | In Stock |
| **ElevenLabs Creator Plan** | Audio & AI | 999.00 ৳ – 6,999.00 ৳ | In Stock |
| **YouTube Premium Subscription** | Streaming / OTT | 1,150.00 ৳ – 1,999.00 ৳ | In Stock |
| **Prime Video (1 Screen)** | Streaming / OTT | 250.00 ৳ – 450.00 ৳ | In Stock |
| **HBO MAX Subscription** | Streaming / OTT | 299.00 ৳ – 1,899.00 ৳ | In Stock |
| **Crunchyroll Shared Packages** | Streaming / OTT | 150.00 ৳ – 750.00 ৳ | In Stock |
| **Canva Pro Subscriptions** | Graphic & Design | 100.00 ৳ – 4,500.00 ৳ | In Stock |
| **GitHub Copilot (12 Months)** | Developer Utility | 2,999.00 ৳ | In Stock |
| **Windows 11 Pro Lifetime Key** | OS / License Key | 600.00 ৳ | In Stock |
| **Windows 10 Pro Lifetime Key** | OS / License Key | 500.00 ৳ | In Stock |
| **Office 365 1 Year Personal** | Office / Productivity| 1,999.00 ৳ | In Stock |
| **Coursera Personal Subscription** | Edu-Tech | 999.00 ৳ – 6,500.00 ৳ | In Stock |
| **Duolingo Super Subscription** | Edu-Tech | 1,050.00 ৳ – 1,699.00 ৳ | In Stock |
| **TryHackMe 1 Year Subscription** | Edu-Tech / Cyber | 4,999.00 ৳ | Out of Stock |

---
*Report generated and documented autonomously for architectural review and systems analysis.*
