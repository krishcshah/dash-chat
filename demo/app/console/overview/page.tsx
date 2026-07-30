import type { Metadata } from "next"

import { NorthgridRoutePage } from "@/northgrid/ui"

export const metadata: Metadata = {
  title: "Overview",
}

export default function OverviewPage() {
  return <NorthgridRoutePage route="overview" />
}
