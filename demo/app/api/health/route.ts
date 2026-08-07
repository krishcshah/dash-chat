import { NextResponse } from "next/server"

import {
  geminiApiKey,
  liveModelId,
  agentModelId,
} from "@/northgrid/server"

export const runtime = "nodejs"

/**
 * Lightweight health/config check. Never returns the key itself — only
 * whether one is configured and which models/env names are in play.
 * Visit /api/health after setting env vars to confirm they reached Vercel.
 */
export async function GET() {
  const key = geminiApiKey()
  return NextResponse.json({
    ok: Boolean(key),
    geminiKeyConfigured: Boolean(key),
    geminiKeyPrefix: key ? `${key.slice(0, 6)}…` : null,
    liveModel: liveModelId(),
    agentModel: agentModelId(),
    keyCandidates: {
      DASHCHAT_GEMINI_API_KEY: Boolean(process.env.DASHCHAT_GEMINI_API_KEY),
      GOOGLE_API_KEY: Boolean(process.env.GOOGLE_API_KEY),
      GEMINI_API_KEY: Boolean(process.env.GEMINI_API_KEY),
      NEXT_PUBLIC_GEMINI_API_KEY: Boolean(process.env.NEXT_PUBLIC_GEMINI_API_KEY),
    },
    vercelEnv: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? null,
  })
}
