import {
  NORTHGRID_BRAND,
  northgridCapabilityDescriptors,
  type AppRoute,
} from "@/northgrid/capabilities"
import {
  resolveDashLocally,
  type DashCapabilityKind,
} from "@dashchat/sdk"

export type { AppRoute } from "@/northgrid/capabilities"

export type MappedAction = {
  id: string
  label: string
  route: AppRoute
  operation: DashCapabilityKind
  needsConfirmation: boolean
  selector: string
  description: string
  examples: string[]
}

const selectorOverrides: Record<string, string> = {
  "open-analytics": "[data-dashchat='analytics-nav']",
  "open-settings": "[data-dashchat='settings-nav']",
  "create-customer": "[data-dashchat='create-customer']",
  "show-orders-last-week": "[data-dashchat='orders-table']",
  "export-report": "[data-dashchat='export-report']",
  "create-invoice": "[data-dashchat='create-invoice']",
  "approve-request": "[data-dashchat='approval-request']",
}

export const mappedActions: MappedAction[] = northgridCapabilityDescriptors.map((capability) => ({
  id: capability.id,
  label: capability.label,
  route: (capability.route ?? "overview") as AppRoute,
  operation: capability.kind,
  needsConfirmation: capability.confirmation === "always",
  selector: selectorOverrides[capability.id] ?? `[data-dashchat='${capability.id}']`,
  description: capability.description,
  examples: capability.examples ?? [capability.label],
}))

export function actionById(id: string) {
  return mappedActions.find((action) => action.id === id)
}

export function resolveVoiceCommand(command: string): MappedAction {
  const decision = resolveDashLocally(command, {
    app: NORTHGRID_BRAND.appName,
    version: "1.0.0",
    capabilities: northgridCapabilityDescriptors,
  })
  if ("call" in decision) {
    const normalizedId = decision.call.name.replace(/^dashchat_/, "").replaceAll("_", "-")
    const action = actionById(normalizedId)
    if (action) return action
  }
  return actionById("open-overview")!
}

export const dashManifest = {
  app: NORTHGRID_BRAND.appName,
  version: "1.0.0",
  capabilities: northgridCapabilityDescriptors,
}
