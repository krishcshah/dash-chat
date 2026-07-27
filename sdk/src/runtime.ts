import {
  capabilityForToolName,
  type DashCapabilityDescriptor,
  type DashField,
  type DashInput,
  type DashManifest,
  type DashPendingContext,
} from "./core.js"

export type DashHandlerResult = {
  message?: string
  data?: unknown
}

export type DashCapabilityContext = {
  capability: DashCapabilityDescriptor
  input: DashInput
  source: "manual" | "typed" | "live" | "ui"
}

export type DashCapabilityRegistration = DashCapabilityDescriptor & {
  handler: (
    context: DashCapabilityContext
  ) => DashHandlerResult | void | Promise<DashHandlerResult | void>
  preview?: (input: DashInput) => string
  validate?: (
    input: DashInput
  ) => { fields: string[]; message: string } | undefined
}

export type DashPendingExecution = DashPendingContext & {
  capability: DashCapabilityDescriptor
  preview?: string
}

export type DashExecutionResult = {
  status: "completed" | "needs-input" | "needs-confirmation" | "cancelled" | "failed"
  capability?: DashCapabilityDescriptor
  input?: DashInput
  missingFields?: DashField[]
  preview?: string
  message: string
  data?: unknown
}

export type DashRuntime = {
  manifest: () => DashManifest
  register: (capability: DashCapabilityRegistration) => void
  invoke: (
    capabilityId: string,
    input?: DashInput,
    options?: { source?: DashCapabilityContext["source"]; confirmed?: boolean }
  ) => Promise<DashExecutionResult>
  invokeToolCall: (
    name: string,
    args?: DashInput,
    options?: { source?: DashCapabilityContext["source"] }
  ) => Promise<DashExecutionResult>
  continuePending: (input: DashInput) => Promise<DashExecutionResult>
  confirmPending: (input?: DashInput) => Promise<DashExecutionResult>
  cancelPending: () => DashExecutionResult
  pending: () => DashPendingExecution | null
  pendingContext: () => DashPendingContext | undefined
  functionResponse: (result: DashExecutionResult) => Record<string, unknown>
}

function isEmpty(value: unknown) {
  return value === undefined || value === null || (typeof value === "string" && !value.trim())
}

function coerceField(field: DashField, value: unknown) {
  if (isEmpty(value)) return undefined
  if (
    typeof value === "object" ||
    typeof value === "function" ||
    typeof value === "symbol"
  ) {
    return undefined
  }
  if (field.type === "number" || field.type === "integer") {
    const number = typeof value === "number" ? value : Number(String(value).replace(/[$,]/g, ""))
    if (!Number.isFinite(number)) return undefined
    if (field.type === "integer" && !Number.isInteger(number)) return undefined
    return number
  }
  if (field.type === "boolean") {
    if (typeof value === "boolean") return value
    if (/^(true|yes|on|1)$/i.test(String(value))) return true
    if (/^(false|no|off|0)$/i.test(String(value))) return false
    return undefined
  }
  const string = String(value).trim()
  if (field.type === "enum") {
    return field.options?.find((option) => option.toLowerCase() === string.toLowerCase())
  }
  if (
    field.type === "email" &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string)
  ) {
    return undefined
  }
  if (field.type === "date" && Number.isNaN(Date.parse(string))) {
    return undefined
  }
  return string
}

function descriptor(capability: DashCapabilityRegistration): DashCapabilityDescriptor {
  const {
    id,
    label,
    description,
    kind,
    route,
    examples,
    fields,
    confirmation,
    confirmationMessage,
  } = capability
  return {
    id,
    label,
    description,
    kind,
    route,
    examples,
    fields,
    confirmation: confirmation ?? "never",
    confirmationMessage,
  }
}

function defaultPreview(capability: DashCapabilityDescriptor, input: DashInput) {
  const values = (capability.fields ?? [])
    .filter((field) => !isEmpty(input[field.name]))
    .map((field) => `${field.label}: ${String(input[field.name])}`)
  return values.length
    ? `${capability.label}\n${values.join("\n")}`
    : capability.confirmationMessage ?? capability.description
}

export function createDashRuntime(options: {
  app: string
  version?: string
  capabilities?: DashCapabilityRegistration[]
}): DashRuntime {
  const capabilities = new Map<string, DashCapabilityRegistration>()
  let pendingExecution: DashPendingExecution | null = null
  for (const capability of options.capabilities ?? []) capabilities.set(capability.id, capability)

  function manifest(): DashManifest {
    return {
      app: options.app,
      version: options.version ?? "1.0.0",
      capabilities: Array.from(capabilities.values()).map(descriptor),
    }
  }

  function register(capability: DashCapabilityRegistration) {
    capabilities.set(capability.id, capability)
  }

  async function invoke(
    capabilityId: string,
    input: DashInput = {},
    invokeOptions: {
      source?: DashCapabilityContext["source"]
      confirmed?: boolean
    } = {}
  ): Promise<DashExecutionResult> {
    const registration = capabilities.get(capabilityId)
    if (!registration) {
      return { status: "failed", message: `Unknown DashChat capability: ${capabilityId}` }
    }
    const capability = descriptor(registration)
    const merged =
      pendingExecution?.capabilityId === capabilityId
        ? { ...pendingExecution.input, ...input }
        : { ...input }
    delete merged.confirmed

    const normalized: DashInput = {}
    for (const field of capability.fields ?? []) {
      const value = coerceField(field, merged[field.name])
      if (value !== undefined) normalized[field.name] = value
    }
    const missingFields = (capability.fields ?? []).filter(
      (field) => field.required && isEmpty(normalized[field.name])
    )
    if (missingFields.length) {
      pendingExecution = {
        capabilityId,
        capability,
        status: "needs-input",
        input: normalized,
        missingFields: missingFields.map((field) => field.name),
      }
      return {
        status: "needs-input",
        capability,
        input: normalized,
        missingFields,
        message: `I need ${missingFields.map((field) => field.label).join(", ")} before I can ${capability.label.toLowerCase()}.`,
      }
    }
    const validation = registration.validate?.(normalized)
    if (validation) {
      const requestedFields = (capability.fields ?? []).filter((field) =>
        validation.fields.includes(field.name)
      )
      pendingExecution = {
        capabilityId,
        capability,
        status: "needs-input",
        input: normalized,
        missingFields: requestedFields.map((field) => field.name),
      }
      return {
        status: "needs-input",
        capability,
        input: normalized,
        missingFields: requestedFields,
        message: validation.message,
      }
    }

    if (capability.confirmation === "always") {
      const hasPendingPreview =
        pendingExecution?.capabilityId === capabilityId &&
        pendingExecution.status === "needs-confirmation"
      if (!invokeOptions.confirmed || !hasPendingPreview) {
        const preview = registration.preview?.(normalized) ?? defaultPreview(capability, normalized)
        pendingExecution = {
          capabilityId,
          capability,
          status: "needs-confirmation",
          input: normalized,
          preview,
        }
        return {
          status: "needs-confirmation",
          capability,
          input: normalized,
          preview,
          message:
            capability.confirmationMessage ??
            `${capability.label} is ready. Confirm verbally or use the button to continue.`,
        }
      }
    }

    try {
      const output = await registration.handler({
        capability,
        input: normalized,
        source: invokeOptions.source ?? "typed",
      })
      pendingExecution = null
      return {
        status: "completed",
        capability,
        input: normalized,
        message: output?.message ?? `${capability.label} completed.`,
        data: output?.data,
      }
    } catch (error) {
      return {
        status: "failed",
        capability,
        input: normalized,
        message: error instanceof Error ? error.message : `${capability.label} failed.`,
      }
    }
  }

  async function invokeToolCall(
    name: string,
    args: DashInput = {},
    invokeOptions: { source?: DashCapabilityContext["source"] } = {}
  ) {
    const capability = capabilityForToolName(manifest(), name)
    if (!capability) {
      return { status: "failed", message: `Unknown DashChat tool: ${name}` } satisfies DashExecutionResult
    }
    const confirmed = args.confirmed === true
    return invoke(capability.id, args, {
      source: invokeOptions.source ?? "live",
      confirmed,
    })
  }

  function continuePending(input: DashInput) {
    if (!pendingExecution) {
      return Promise.resolve({
        status: "failed",
        message: "There is no pending DashChat action.",
      } satisfies DashExecutionResult)
    }
    return invoke(pendingExecution.capabilityId, input, { source: "ui" })
  }

  function confirmPending(input: DashInput = {}) {
    if (!pendingExecution || pendingExecution.status !== "needs-confirmation") {
      return Promise.resolve({
        status: "failed",
        message: "There is no action awaiting confirmation.",
      } satisfies DashExecutionResult)
    }
    return invoke(pendingExecution.capabilityId, { ...pendingExecution.input, ...input }, {
      source: "ui",
      confirmed: true,
    })
  }

  function cancelPending(): DashExecutionResult {
    const capability = pendingExecution?.capability
    pendingExecution = null
    return {
      status: "cancelled",
      capability,
      message: capability ? `${capability.label} was cancelled.` : "Pending action cancelled.",
    }
  }

  function pending() {
    return pendingExecution
      ? {
          ...pendingExecution,
          input: { ...pendingExecution.input },
          missingFields: pendingExecution.missingFields
            ? [...pendingExecution.missingFields]
            : undefined,
        }
      : null
  }

  function pendingContext(): DashPendingContext | undefined {
    if (!pendingExecution) return undefined
    return {
      capabilityId: pendingExecution.capabilityId,
      status: pendingExecution.status,
      input: { ...pendingExecution.input },
      missingFields: pendingExecution.missingFields
        ? [...pendingExecution.missingFields]
        : undefined,
    }
  }

  function functionResponse(result: DashExecutionResult) {
    return {
      status: result.status,
      message: result.message,
      missingFields: result.missingFields?.map((field) => ({
        name: field.name,
        label: field.label,
        description: field.description,
      })),
      preview: result.preview,
      data: result.data,
    }
  }

  return {
    manifest,
    register,
    invoke,
    invokeToolCall,
    continuePending,
    confirmPending,
    cancelPending,
    pending,
    pendingContext,
    functionResponse,
  }
}

export const mountDashChat = createDashRuntime
