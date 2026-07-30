import type { Metadata } from "next"

import { NorthgridRoutePage } from "@/northgrid/ui"

export const metadata: Metadata = {
  title: "Analytics",
}

export default function AnalyticsPage() {
  return <NorthgridRoutePage route="analytics" />
}
