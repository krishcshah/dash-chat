# DashChat

**A smart way to talk to your dashboards.**

[Live demo](https://dashchat.vercel.app/) · [Why we built it](./ABOUT_PROJECT.md) · [Product notes](./PRODUCT.md)

DashChat is a framework-agnostic TypeScript SDK for adding a natural-language and live-voice layer to real product UIs. Instead of a chatbot bolted onto the side of your app — or a browser agent scraping pixels and guessing where to click — DashChat gives the model an explicit map of your app's routes, typed inputs, handlers, and confirmation policies.

The model interprets intent. DashChat validates the request and enforces policy. **Your application keeps authority over execution.**

## Mission statement

Dashboards are where businesses go if they want answers — but they're also where intent goes to die. People open a metrics page, stare at filters and forms, and either give up or file a ticket for someone who "knows the tool." DashChat exists to close that gap. We believe the fastest query language is the one your users already speak, and that a dashboard should act on a request like *"show me churned accounts over $5k"* as reliably as if the user had clicked through five screens themselves.

Our goal is to make every dashboard conversational **without handing the keys to an unpredictable agent**: typed, permissioned, previewed, and boring in the best possible way.

## Why DashChat (and not a browser agent)

Browser-based agents operate from the outside. They inspect pixels or DOM state, infer the next interaction, and hope the layout hasn't changed — fragile, slow, and risky for anything that touches real data.

DashChat works from **inside the product**. A request like *"Create a customer named Northstar Labs on the Growth plan"* maps to a registered `create-customer` capability with typed fields and a real application handler. If the action is guarded, DashChat renders a preview and requires explicit confirmation in a later user turn before anything runs.

```text
User request (typed or spoken)
        ↓
Gemini understands the intent
        ↓
DashChat matches a registered capability
        ↓
Validate + collect typed inputs
        ↓
Apply direct or confirmation-required policy
        ↓
Run the application-owned handler
```

## Use cases

DashChat shines anywhere a dense UI would benefit from a fast, safe conversational layer:

- **Analytics & BI dashboards** — *"Compare revenue for the last 30 days,"* *"export this report as CSV."* Reads stay instant; exports get a confirmation step.
- **CRM & customer operations** — create, update, find, and delete accounts with typed fields and guarded previews, so nothing destructive happens silently.
- **Billing & invoicing consoles** — draft, update, and send invoices, or pull outstanding balances, without hunting through tabs.
- **Approvals & admin queues** — surface pending requests and approve/reject them with an explicit, non-self-confirmable step.
- **Settings & profile management** — *"Change my timezone to EST"* maps to a typed update handler, not a fragile form robot.
- **Hands-free workflows** — full-duplex live voice for support, ops, and warehouse-style environments where typing isn't practical.

If your product can describe *what it's allowed to do*, DashChat can drive it.

## What's in the box

Two independent projects:

```text
dash-chat/
├── sdk/    # @dashchat/sdk — reusable capability runtime
└── demo/   # Northgrid — a Next.js dashboard product using the SDK
```

### `@dashchat/sdk`

- Serializable capability manifests
- Gemini function declarations (typed tool schemas)
- Input coercion and required-field collection
- Guarded previews and later-turn confirmation
- Runtime handler registration and execution
- Typed Gemini and Live API adapters
- Browser microphone PCM capture and gapless audio playback
- Deterministic local resolution for testing and offline fallback

The SDK imports **no** React, Next.js, or demo code. Authentication, data access, navigation, and mutations stay owned by your host product.

```ts
import { createDashRuntime } from "@dashchat/sdk"

const dashchat = createDashRuntime({
  app: "Northgrid",
  capabilities: [
    {
      id: "create-customer",
      label: "Create customer",
      description: "Create a customer account.",
      kind: "create",
      fields: [
        { name: "name", label: "Company name", type: "string", required: true },
        { name: "email", label: "Primary contact", type: "email", required: true },
        { name: "plan", label: "Plan", type: "enum", options: ["Bench", "Workshop", "Foundry"], required: true },
      ],
      confirmation: "always",
      handler: async ({ input }) => {
        const customer = await customers.create(input)
        return { message: `${customer.name} was created.`, data: customer }
      },
    },
  ],
})
```

### Northgrid demo

**Northgrid** is a complete fictional SaaS dashboard (analytics, customers, orders, invoices, approvals, settings) built with Next.js, showing DashChat embedded across normal product workflows rather than a standalone chat window. It registers **32 capabilities across 9 routes** and shares the *same* application handlers between manual clicks and assistant commands — so voice never becomes a second copy of your business logic.

## Safety model

Confirmation belongs to the **DashChat runtime, not the model**. A guarded tool call creates pending state tied to the exact capability and normalized input. The model cannot approve its own request by returning `confirmed: true`; execution requires a separate user turn that matches the pending action.

Routine reads and navigation stay fast; sensitive writes get a visible preview and explicit consent.

## Built with

TypeScript · Next.js · React · Node.js · Gemini API · Gemini Live API · Web Audio API · Tailwind CSS · Vercel

## Run locally

Node.js 20 or newer is required.

Build the SDK:

```bash
cd sdk
npm install
npm run build
```

Run the demo:

```bash
cd demo
npm install
cp .env.example .env.local
npm run dev
```

Set `DASHCHAT_GEMINI_API_KEY` in `demo/.env.local`, then open [http://localhost:3000](http://localhost:3000).

On Windows, you can bootstrap both from the repo root:

```powershell
powershell -ExecutionPolicy Bypass -File .\setup-windows.ps1
```

## Environment variables

| Variable | Where | Purpose |
| --- | --- | --- |
| `DASHCHAT_GEMINI_API_KEY` | `demo/.env.local` | Gemini key used for typed intent resolution, transcription, and Live voice. |
| `GEMINI_API_KEY` / `GOOGLE_API_KEY` | `demo/.env.local` | Optional fallbacks if `DASHCHAT_GEMINI_API_KEY` is unset. |
| `GEMINI_LIVE_MODEL` | `demo/.env.local` | Optional override for the Live model (defaults to `gemini-3.1-flash-live-preview`). |
| `GEMINI_AGENT_MODEL` | `demo/.env.local` | Optional override for the text intent model (defaults to `gemini-3.5-flash`). |

## Deploying to Vercel

This is a two-package monorepo. The `demo/` Next.js app consumes the local `sdk/` package via a `file:../sdk` dependency. To deploy:

1. In Vercel, set the **Root Directory** to `demo`.
2. Make sure `installCommand` runs the SDK build first (Vercel runs `prepare` for local `file:` deps automatically), or use the included root build script.
3. Add `DASHCHAT_GEMINI_API_KEY` to your Vercel project environment variables.

## Validation

```bash
cd sdk
npm test
npm run typecheck

cd ../demo
npm run typecheck
npm run build
```

The SDK test suite covers manifest sanitization, tool generation, local resolution, missing-field collection, confirmation authority, cancellation, invalid inputs, handler failures, and serializable model responses.

## License

MIT
