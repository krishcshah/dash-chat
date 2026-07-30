import type { Metadata } from "next"

import { NorthgridRoutePage } from "@/northgrid/ui"

export const metadata: Metadata = {
  title: "Orders",
}

export default function OrdersPage() {
  return <NorthgridRoutePage route="orders" />
}
