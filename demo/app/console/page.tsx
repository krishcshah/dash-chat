import type { Metadata } from "next"

import { NorthgridRoutePage } from "@/northgrid/ui"

export const metadata: Metadata = {
  title: "Capability console",
}

export default function CapabilityConsolePage() {
  return <NorthgridRoutePage route="console" />
}
