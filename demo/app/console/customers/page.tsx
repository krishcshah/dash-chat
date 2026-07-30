import type { Metadata } from "next"

import { NorthgridRoutePage } from "@/northgrid/ui"

export const metadata: Metadata = {
  title: "Customers",
}

export default function CustomersPage() {
  return <NorthgridRoutePage route="customers" />
}
