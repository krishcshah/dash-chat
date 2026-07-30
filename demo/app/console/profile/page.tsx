import type { Metadata } from "next"

import { NorthgridRoutePage } from "@/northgrid/ui"

export const metadata: Metadata = {
  title: "Profile",
}

export default function ProfilePage() {
  return <NorthgridRoutePage route="profile" />
}
