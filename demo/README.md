# Northgrid — DashChat demo dashboard

This is a standalone Next.js demo application consuming `@dashchat/sdk` from the sibling [`../sdk`](../sdk) package through its `file:../sdk` dependency.

**Northgrid** is a fictional revenue-operations dashboard. It exists to show DashChat doing real product work — navigating, reading, mutating, approving, and exporting — across normal screens instead of a detached chat widget. Typed commands, manual clicks, and live voice all run through the same application handlers.

The demo owns all application-specific concerns:

- Northgrid data and state.
- Route mappings and navigation.
- Customer, order, and invoice handlers.
- Approval, settings, profile, notification, filter, and export actions.
- End-user voice and typed-command UI.
- Gemini API route wiring and environment variables.

The SDK owns capability validation, missing-field collection, confirmation state, tool schemas, execution, and Gemini/Live adapters.

## Routes

- `/`
- `/login`
- `/signup`
- `/console`
- `/console/overview`
- `/console/analytics`
- `/console/customers`
- `/console/orders`
- `/console/invoices`
- `/console/settings`
- `/console/profile`

## Run it

```bash
npm install
cp .env.example .env.local   # then set DASHCHAT_GEMINI_API_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), then press `Space` to talk to the dashboard.
