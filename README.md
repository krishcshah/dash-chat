# 🚀 DashChat

> **Stop staring at static dashboards. Start talking to your data.**

DashChat is a next-generation conversational AI companion that docks directly into your analytics environment. By transforming complex telemetry, metrics, and visual data into an interactive, voice-enabled intelligence layer, DashChat delivers brutally honest, data-driven answers exactly when you need them.

Whether you're looking for top-level summaries or deep-dive technical diagnostics, DashChat adapts to your role, your context, and your data.

---

## 🎯 Who is it for?

*   **The Executive:** Get immediate, unvarnished truths about bottom-line metrics and KPIs without waiting for a weekly report. Ask questions out loud and get direct, strategic answers.
*   **The Data Scientist:** Interrogate your datasets naturally. Use DashChat as a sounding board to identify anomalies, evaluate model drift, and explore correlations on the fly.
*   **The Engineer:** Debug faster. Ask your dashboard about server loads, error spikes, or pipeline bottlenecks, and let DashChat pinpoint the critical failure points in real-time.

## ✨ Supercharged Features

*   🎙️ **Live Audio Interaction:** Powered by advanced generative AI, simply speak to your dashboard. DashChat listens, analyzes, and responds in real-time.
*   🧠 **Context-Aware Intelligence:** Integrates deeply with your existing Northgrid deployments and custom internal tools. It doesn't just read data; it understands the semantic context behind it.
*   ⚡ **Adaptive Personas:** From high-level executive summaries to granular technical readouts, the AI dynamically adjusts its verbosity and technical depth based on who is asking.
*   🔌 **Extensible SDK:** Built with a robust, modular architecture. Drop the DashChat SDK into your Next.js application in minutes.

## 🛠️ Tech Stack

Built for performance, scalability, and seamless integration:
*   **Framework:** Next.js (React) App Router
*   **AI Engine:** Gemini Live Audio API Integration
*   **Architecture:** Modular environment (Core SDK + Next.js Demo Console)
*   **Styling & UI:** TailwindCSS, Framer Motion (Animated SVG masks, Audio Visualizer bars, Terminal effects)

---

## 🚀 Quick Start

Get your companion up and running in a few simple steps.

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Configure your API keys by duplicating the environment template in the demo folder:
```bash
cp demo/.env.example demo/.env.local
```
*(Ensure your AI and dashboard provider credentials are correctly set).*

### 3. Spin Up the Local Companion
```bash
npm run dev
```
Navigate to `http://localhost:3000/console` and start talking to your data.

---

## 🏗️ Repository Structure

*   `/sdk`: The core DashChat TypeScript SDK. Handles live audio streaming, runtime execution, and LLM communication.
*   `/demo`: A full-featured Next.js console demonstrating the DashChat integration, complete with a modern analytics UI, agent visualizers, and authentication.

---
*Built with precision by Krish Shah.*
