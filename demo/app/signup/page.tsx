import type { Metadata } from "next"

import { DashChatAuthPage } from "@/northgrid/ui"

export const metadata: Metadata = {
  title: "Create a workspace — DashChat",
}

export default function SignupPage() {
  return <DashChatAuthPage mode="signup" />
}
