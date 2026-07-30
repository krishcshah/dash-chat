import type { Metadata } from "next"

import { NorthgridRoutePage } from "@/northgrid/ui"

export const metadata: Metadata = {
  title: "Invoices",
}

export default function InvoicesPage() {
  return <NorthgridRoutePage route="invoices" />
}
