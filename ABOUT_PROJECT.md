# About DashChat

## Why we built it

We've all watched someone open a powerful dashboard, stare at it for ten seconds, and then close it — not because the data wasn't there, but because getting to it meant learning the tool's maze of filters, tabs, and forms. Meanwhile, "AI agents" that browse the web promised to fix this by simply *looking* at the screen and clicking. They inspect pixels, guess a selector, and hope nothing moved. It's impressive in a demo and fragile in production: a shifted button, a loading spinner, or a hidden permission silently breaks the workflow — or worse, fires the wrong action.

We wanted a conversational layer that treats the product's own actions as the source of truth instead of operating it from the outside.

## What DashChat is

DashChat is a TypeScript SDK that exposes a product's real actions as **typed capabilities**. Each capability declares its route, inputs, handler, and confirmation policy. Gemini understands what the user means; DashChat validates the request, collects missing fields, applies the product's rules, and runs the real handler. Sensitive actions require confirmation in a separate user turn, so the model can never approve its own request.

To prove it, we built **Northgrid**, a complete Next.js dashboard product with 32 capabilities across 9 routes — analytics, customers, orders, invoices, approvals, settings, navigation, and exports — all driven by the same handlers whether you click a button or say it out loud.

## The hard parts

Making confirmation *actually trustworthy* while keeping the conversation natural was the toughest problem — the model has to be unable to self-approve. We also worked through incomplete user requests, live-audio latency, microphone playback, and keeping the reusable SDK cleanly separated from demo-specific business logic.

## What we learned

Browser agents are useful when no integration exists, but they have to infer how a product works by looking at it. A capability-based agent gets a direct contract with the application.

The lesson that stuck: **let the model understand intent, but let the product keep authority.**
