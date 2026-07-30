import type { Metadata } from "next"

import { DashChatAuthPage } from "@/northgrid/ui"

export const metadata: Metadata = {
  title: "Sign in — DashChat",
}

export default function LoginPage() {
  return <DashChatAuthPage mode="signin" />
}
