import type { Metadata } from "next"

import { NorthgridRoutePage } from "@/northgrid/ui"

export const metadata: Metadata = {
  title: "Settings",
}

export default function SettingsPage() {
  return <NorthgridRoutePage route="settings" />
}
