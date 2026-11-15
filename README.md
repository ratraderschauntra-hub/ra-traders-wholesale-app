# RA Traders Wholesale Ordering App

A mobile-friendly wholesale catalog and order-request frontend built with Next.js, React, TypeScript, and Tailwind CSS.

## Included now
- Responsive product catalog with category filters and search
- Add/remove product quantities and a cart saved in the current browser
- Customer/shop and delivery detail form
- Share order request using the device share sheet, or copy it to the clipboard
- Clear demo-data and order-confirmation notices

## Run locally

Requirements: Node.js 18.17 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

For a production build, run `npm run build`, then `npm start`.

## Important before real business use

Catalog items, SKUs, stock, and prices shown in the app are sample data and must be replaced with RA Traders' verified information. Order requests are shared/copied from the browser; this version has no account login, database, online payment, live inventory, or order persistence. A shared request is not an accepted or confirmed order. Add a backend and configure a verified business contact before accepting real orders or customer data.
