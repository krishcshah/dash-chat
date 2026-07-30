import type { Metadata } from "next"

import { NorthgridConsoleLayout } from "@/northgrid/ui"

export const metadata: Metadata = {
  title: {
    default: "Northgrid demo — DashChat",
    template: "%s — Northgrid",
  },
  description:
    "A routed demo application showing DashChat SDK navigation, reads, mutations, approvals, and voice workflows.",
}

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <NorthgridConsoleLayout>{children}</NorthgridConsoleLayout>
}
