import type { Metadata } from "next"

import { DashChatLandingPage } from "@/northgrid/ui"

export const metadata: Metadata = {
  title: "DashChat — A smart way to talk to your dashboards",
  description:
    "A capability SDK for dependable voice and typed actions inside web products and dashboards.",
}

export default function HomePage() {
  return <DashChatLandingPage />
}
