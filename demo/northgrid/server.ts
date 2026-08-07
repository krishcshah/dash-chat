const KEY_ENV_NAMES = [
  "DASHCHAT_GEMINI_API_KEY",
  "GOOGLE_API_KEY",
  "GEMINI_API_KEY",
  "NEXT_PUBLIC_GEMINI_API_KEY",
  "NEXT_PUBLIC_GOOGLE_API_KEY",
  "GOOGLE_GENERATIVE_AI_API_KEY",
]

/** Reads the Gemini key from any common env var name, tolerating stray
 * whitespace and surrounding quotes that sneak in via dashboard UIs. */
export function geminiApiKey() {
  for (const name of KEY_ENV_NAMES) {
    const raw = process.env[name]
    if (!raw) continue
    const cleaned = raw.trim().replace(/^["']|["']$/g, "").trim()
    if (cleaned) return cleaned
  }
  return undefined
}

/** True when a Gemini credential is configured server-side. Exposed to the
 * health endpoint so misconfiguration is visible in one request. */
export function hasGeminiApiKey() {
  return Boolean(geminiApiKey())
}

export function liveModelId() {
  return (process.env.GEMINI_LIVE_MODEL ?? "gemini-3.1-flash-live-preview").replace(
    /^models\//,
    ""
  )
}

export function agentModelId() {
  return (process.env.GEMINI_AGENT_MODEL ?? "gemini-3.5-flash").replace(
    /^models\//,
    ""
  )
}
