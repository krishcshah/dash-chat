import type {
  DashCapabilityRegistration,
  DashHandlerResult,
} from "@dashchat/sdk"
import type {
  DashCapabilityDescriptor,
  DashInput,
} from "@dashchat/sdk"

export type AppRoute =
  | "overview"
  | "analytics"
  | "customers"
  | "orders"
  | "invoices"
  | "settings"
  | "notifications"
  | "profile"
  | "console"

export const NORTHGRID_BRAND = {
  name: "Northgrid",
  mark: "N.",
  descriptor: "Revenue operations",
  domain: "northgrid.io",
  appName: "Northgrid ops dashboard",
  appId: "northgrid",
} as const

export const NORTHGRID_METRICS = {
  revenue: "$58,412",
  activeCustomers: 12,
  revenuePerCustomer: "$4,867.67",
  growth: "14.2%",
} as const

export type NorthgridCustomer = {
  id: string
  name: string
  email: string
  owner: string
  plan: "Bench" | "Workshop" | "Foundry"
  spend: string
  last: string
  initials: string
}

export type NorthgridOrder = {
  id: string
  customer: string
  product: string
  amount: string
  status: "Open" | "Paid" | "Cancelled"
  date: string
}

export type NorthgridInvoice = {
  id: string
  customer: string
  amount: string
  due: string
  status: "Draft" | "Sent" | "Paid" | "Void"
}

export type NorthgridSettings = {
  workspaceName: string
  workspaceUrl: string
  currency: "USD" | "EUR"
}

export type NorthgridProfile = {
  fullName: string
  email: string
  timezone: "UTC" | "EST"
}

export const initialCustomers: NorthgridCustomer[] = [
  { id: "CUS-112", name: "Meridian Labs", email: "lena@meridianlabs.ai", owner: "Lena Vogt", plan: "Foundry", spend: "$34,210", last: "12m ago", initials: "ML" },
  { id: "CUS-111", name: "Harborline Freight", email: "owen@harborline.co", owner: "Owen Marchetti", plan: "Foundry", spend: "$31,540", last: "34m ago", initials: "HF" },
  { id: "CUS-110", name: "Oriel House", email: "samira@oriel.house", owner: "Samira Iqbal", plan: "Foundry", spend: "$28,760", last: "18m ago", initials: "OH" },
  { id: "CUS-109", name: "Kanso Workshop", email: "niko@kansoworkshop.jp", owner: "Niko Arai", plan: "Workshop", spend: "$24,390", last: "1h ago", initials: "KW" },
  { id: "CUS-108", name: "Stillroom Studio", email: "theo@stillroom.studio", owner: "Theo Martens", plan: "Workshop", spend: "$19,840", last: "2h ago", initials: "SS" },
  { id: "CUS-107", name: "Common Arc", email: "amara@commonarc.design", owner: "Amara Kone", plan: "Foundry", spend: "$31,280", last: "3h ago", initials: "CA" },
  { id: "CUS-106", name: "Daymark Coffee", email: "joon@daymark.coffee", owner: "Joon Park", plan: "Bench", spend: "$8,920", last: "5h ago", initials: "DC" },
  { id: "CUS-105", name: "Northmill Editions", email: "elian@northmill.press", owner: "Elian Voss", plan: "Workshop", spend: "$14,670", last: "Yesterday", initials: "NE" },
  { id: "CUS-104", name: "Paper Kite Office", email: "miren@paperkite.office", owner: "Miren Ortiz", plan: "Bench", spend: "$6,430", last: "Yesterday", initials: "PK" },
  { id: "CUS-103", name: "Emberline Hotel", email: "anika@emberline.hotel", owner: "Anika Rao", plan: "Foundry", spend: "$36,920", last: "Jul 14", initials: "EH" },
  { id: "CUS-102", name: "Saltbox Assembly", email: "jules@saltboxassembly.com", owner: "Jules Hart", plan: "Workshop", spend: "$12,540", last: "Jul 13", initials: "SA" },
  { id: "CUS-101", name: "Copper Canyon Supply", email: "rita@coppercanyon.shop", owner: "Rita Delacroix", plan: "Bench", spend: "$4,120", last: "Jul 12", initials: "CC" },
]

export const initialOrders: NorthgridOrder[] = [
  { id: "ORD-3210", customer: "Oriel House", product: "Foundry annual", amount: "$7,680", status: "Paid", date: "Jul 16" },
  { id: "ORD-3209", customer: "Common Arc", product: "Foundry annual", amount: "$7,680", status: "Paid", date: "Jul 15" },
  { id: "ORD-3208", customer: "Kanso Workshop", product: "Workshop annual", amount: "$4,320", status: "Open", date: "Jul 15" },
  { id: "ORD-3207", customer: "Stillroom Studio", product: "Workshop quarterly", amount: "$1,260", status: "Paid", date: "Jul 14" },
  { id: "ORD-3206", customer: "Emberline Hotel", product: "Foundry monthly", amount: "$720", status: "Paid", date: "Jul 14" },
  { id: "ORD-3205", customer: "Northmill Editions", product: "Workshop annual", amount: "$4,320", status: "Paid", date: "Jul 13" },
  { id: "ORD-3204", customer: "Paper Kite Office", product: "Bench annual", amount: "$1,680", status: "Cancelled", date: "Jul 12" },
  { id: "ORD-3203", customer: "Saltbox Assembly", product: "Workshop monthly", amount: "$420", status: "Open", date: "Jul 11" },
  { id: "ORD-3202", customer: "Daymark Coffee", product: "Bench annual", amount: "$1,680", status: "Paid", date: "Jul 10" },
]

export const initialInvoices: NorthgridInvoice[] = [
  { id: "INV-1438", customer: "Kanso Workshop", amount: "$4,320.00", due: "Due today", status: "Sent" },
  { id: "INV-1437", customer: "Saltbox Assembly", amount: "$420.00", due: "Jul 22", status: "Draft" },
  { id: "INV-1436", customer: "Oriel House", amount: "$7,680.00", due: "Jul 18", status: "Paid" },
  { id: "INV-1435", customer: "Common Arc", amount: "$7,680.00", due: "Jul 17", status: "Paid" },
  { id: "INV-1434", customer: "Stillroom Studio", amount: "$1,260.00", due: "Jul 15", status: "Paid" },
  { id: "INV-1433", customer: "Emberline Hotel", amount: "$720.00", due: "Jul 14", status: "Paid" },
  { id: "INV-1432", customer: "Northmill Editions", amount: "$4,320.00", due: "Jul 12", status: "Paid" },
  { id: "INV-1431", customer: "Paper Kite Office", amount: "$1,680.00", due: "Jul 10", status: "Void" },
  { id: "INV-1430", customer: "Daymark Coffee", amount: "$1,680.00", due: "Jul 08", status: "Paid" },
]

export const initialSettings: NorthgridSettings = {
  workspaceName: NORTHGRID_BRAND.name,
  workspaceUrl: "operations",
  currency: "USD",
}

export const initialProfile: NorthgridProfile = {
  fullName: "Rhea Calder",
  email: "rhea@northgrid.io",
  timezone: "UTC",
}

const routes: Array<{ route: AppRoute; label: string; description: string }> = [
  { route: "overview", label: "Open overview", description: "Navigate to the Northgrid workspace overview." },
  { route: "analytics", label: "View analytics", description: "Open revenue, customer, and acquisition analytics." },
  { route: "customers", label: "Open customers", description: "Navigate to the customer accounts table." },
  { route: "orders", label: "Open orders", description: "Navigate to orders and payments." },
  { route: "invoices", label: "Open invoices", description: "Navigate to invoice management." },
  { route: "settings", label: "Open settings", description: "Navigate to workspace settings." },
  { route: "notifications", label: "Open notifications", description: "Navigate to workspace notifications." },
  { route: "profile", label: "Open profile", description: "Navigate to the current user's profile." },
  { route: "console", label: "Open DashChat console", description: "Navigate to the DashChat capability console." },
]

const routeCapabilities: DashCapabilityDescriptor[] = routes.map(({ route, label, description }) => ({
  id: `open-${route}`,
  label,
  description,
  kind: "navigate",
  route,
  confirmation: "never",
  examples: [`Open ${route}`, `Go to ${route}`],
}))

export const northgridCapabilityDescriptors: DashCapabilityDescriptor[] = [
  ...routeCapabilities,
  {
    id: "read-workspace-summary",
    label: "Workspace summary",
    description: "Fetch the current revenue, customer, order, invoice, and approval summary.",
    kind: "read",
    route: "overview",
    examples: ["What is happening today?", "Give me the workspace summary"],
    confirmation: "never",
  },
  {
    id: "read-analytics",
    label: "Read analytics",
    description: "Fetch current revenue and customer metrics for the requested period.",
    kind: "read",
    route: "analytics",
    fields: [
      { name: "period", label: "Period", type: "enum", options: ["Last 7 days", "Last 30 days"], required: false },
    ],
    examples: ["How much revenue do we have?", "Read analytics for the last week"],
    confirmation: "never",
  },
  {
    id: "find-customers",
    label: "Find customers",
    description: "Fetch customer records by name, email, owner, plan, or id. An empty query returns every customer.",
    kind: "read",
    route: "customers",
    fields: [
      { name: "query", label: "Search query", type: "string", required: false, placeholder: "Name, email, owner, or id" },
      { name: "plan", label: "Plan", type: "enum", options: ["Bench", "Workshop", "Foundry"], required: false },
    ],
    examples: ["List all customers", "Find Kanso Workshop", "Show Workshop customers"],
    confirmation: "never",
  },
  {
    id: "top-customers",
    label: "Top customers by spend",
    description:
      "Rank customers by lifetime spend. Use for questions about the most profitable, highest-spending, biggest, or best customers or accounts.",
    kind: "read",
    route: "customers",
    fields: [
      { name: "limit", label: "Number of customers", type: "integer", required: false, placeholder: "1" },
    ],
    examples: [
      "Who is the most profitable customer?",
      "Who spends the most?",
      "Top 3 customers by lifetime spend",
      "Show our biggest accounts",
    ],
    confirmation: "never",
  },
  {
    id: "revenue-overview",
    label: "Revenue overview",
    description:
      "Report total revenue, paid order value, outstanding invoice balance, and customer count across the workspace.",
    kind: "read",
    route: "overview",
    examples: [
      "What is our total revenue?",
      "How much have customers paid?",
      "How much is outstanding?",
      "What are we owed?",
    ],
    confirmation: "never",
  },
  {
    id: "plan-leaders",
    label: "Plan leaders",
    description:
      "Show the highest-spending customer on each plan tier (Bench, Workshop, Foundry).",
    kind: "read",
    route: "analytics",
    examples: [
      "Which customers lead each plan?",
      "Best customer per plan",
      "Who is our top Foundry account?",
    ],
    confirmation: "never",
  },
  {
    id: "create-customer",
    label: "Create customer",
    description: "Create a customer account and add it to the customer table.",
    kind: "create",
    route: "customers",
    fields: [
      { name: "name", label: "Company name", type: "string", required: true, placeholder: "Lattice Bureau" },
      { name: "email", label: "Primary contact", type: "email", required: true, placeholder: "owner@latticebureau.com" },
      { name: "plan", label: "Plan", type: "enum", options: ["Bench", "Workshop", "Foundry"], required: true },
    ],
    examples: ["Create a customer", "Add Lattice Bureau on the Workshop plan"],
    confirmation: "always",
    confirmationMessage: "Review the new customer, then confirm verbally or in the UI.",
  },
  {
    id: "update-customer",
    label: "Update customer",
    description: "Change a customer's plan or primary contact email.",
    kind: "update",
    route: "customers",
    fields: [
      { name: "customer", label: "Customer name or id", type: "string", required: true },
      { name: "plan", label: "New plan", type: "enum", options: ["Bench", "Workshop", "Foundry"], required: false },
      { name: "email", label: "New contact email", type: "email", required: false },
    ],
    examples: ["Move Kanso Workshop to Foundry", "Change Paper Kite Office's email"],
    confirmation: "always",
  },
  {
    id: "delete-customer",
    label: "Delete customer",
    description: "Permanently remove a customer account from the demo workspace.",
    kind: "delete",
    route: "customers",
    fields: [
      { name: "customer", label: "Customer name or id", type: "string", required: true },
    ],
    examples: ["Delete Paper Kite Office", "Remove customer CUS-104"],
    confirmation: "always",
    confirmationMessage: "Deleting a customer cannot be undone in this demo. Confirm to continue.",
  },
  {
    id: "find-orders",
    label: "Find orders",
    description: "Fetch order records by id, customer, product, or status. An empty query returns every order.",
    kind: "read",
    route: "orders",
    fields: [
      { name: "query", label: "Search query", type: "string", required: false },
      { name: "status", label: "Status", type: "enum", options: ["Open", "Paid", "Cancelled"], required: false },
    ],
    examples: ["List all orders", "Show open orders", "Find order ORD-2082"],
    confirmation: "never",
  },
  {
    id: "show-orders-last-week",
    label: "Show last week's orders",
    description: "Navigate to orders and apply the last seven days filter.",
    kind: "filter",
    route: "orders",
    examples: ["Show orders from last week", "Filter orders to the last seven days"],
    confirmation: "never",
  },
  {
    id: "create-order",
    label: "Create order",
    description: "Create an order in the demo workspace.",
    kind: "create",
    route: "orders",
    fields: [
      { name: "customer", label: "Customer", type: "string", required: true },
      { name: "product", label: "Product", type: "string", required: true },
      { name: "amount", label: "Amount", type: "number", required: true },
      { name: "status", label: "Status", type: "enum", options: ["Open", "Paid"], required: false },
    ],
    examples: ["Create an order for Kanso Workshop", "Add a paid order"],
    confirmation: "always",
  },
  {
    id: "update-order",
    label: "Update order",
    description: "Change the status of an existing order.",
    kind: "update",
    route: "orders",
    fields: [
      { name: "orderId", label: "Order id", type: "string", required: true },
      { name: "status", label: "New status", type: "enum", options: ["Open", "Paid", "Cancelled"], required: true },
    ],
    examples: ["Mark ORD-2082 paid", "Cancel order ORD-2084"],
    confirmation: "always",
  },
  {
    id: "delete-order",
    label: "Delete order",
    description: "Permanently remove an order from the demo workspace.",
    kind: "delete",
    route: "orders",
    fields: [
      { name: "orderId", label: "Order id", type: "string", required: true },
    ],
    examples: ["Delete ORD-2082"],
    confirmation: "always",
  },
  {
    id: "export-orders",
    label: "Export orders",
    description: "Prepare the current order dataset as CSV.",
    kind: "export",
    route: "orders",
    examples: ["Export all orders", "Download orders CSV"],
    confirmation: "always",
  },
  {
    id: "find-invoices",
    label: "Find invoices",
    description: "Fetch invoice records by id, customer, or status. An empty query returns every invoice.",
    kind: "read",
    route: "invoices",
    fields: [
      { name: "query", label: "Search query", type: "string", required: false },
      { name: "status", label: "Status", type: "enum", options: ["Draft", "Sent", "Paid", "Void"], required: false },
    ],
    examples: ["List all invoices", "Find INV-0992", "Show draft invoices"],
    confirmation: "never",
  },
  {
    id: "create-invoice",
    label: "Create invoice",
    description: "Create a draft invoice for a customer.",
    kind: "create",
    route: "invoices",
    fields: [
      { name: "customer", label: "Customer", type: "string", required: true },
      { name: "amount", label: "Invoice amount", type: "number", required: true },
      { name: "dueDate", label: "Due date", type: "date", required: true },
    ],
    examples: ["Create an invoice", "Invoice Kanso Workshop for 1200 dollars"],
    confirmation: "always",
  },
  {
    id: "update-invoice",
    label: "Update invoice",
    description: "Change an invoice status, amount, or due date.",
    kind: "update",
    route: "invoices",
    fields: [
      { name: "invoiceId", label: "Invoice id", type: "string", required: true },
      { name: "status", label: "New status", type: "enum", options: ["Draft", "Sent", "Paid", "Void"], required: false },
      { name: "amount", label: "New amount", type: "number", required: false },
      { name: "dueDate", label: "New due date", type: "date", required: false },
    ],
    examples: ["Mark INV-0991 sent", "Change invoice INV-0992 to 1100 dollars"],
    confirmation: "always",
  },
  {
    id: "delete-invoice",
    label: "Delete invoice",
    description: "Permanently remove an invoice from the demo workspace.",
    kind: "delete",
    route: "invoices",
    fields: [
      { name: "invoiceId", label: "Invoice id", type: "string", required: true },
    ],
    examples: ["Delete invoice INV-0991"],
    confirmation: "always",
  },
  {
    id: "export-report",
    label: "Export analytics report",
    description: "Prepare the current analytics report as CSV.",
    kind: "export",
    route: "analytics",
    fields: [
      { name: "period", label: "Period", type: "enum", options: ["Last 7 days", "Last 30 days"], required: false },
    ],
    examples: ["Export this report", "Download the analytics report"],
    confirmation: "always",
  },
  {
    id: "read-approval-request",
    label: "Read approval request",
    description: "Fetch the pending Kanso Workshop plan change request.",
    kind: "read",
    route: "overview",
    examples: ["What needs approval?", "Read the Kanso Workshop request"],
    confirmation: "never",
  },
  {
    id: "approve-request",
    label: "Approve plan request",
    description: "Approve Kanso Workshop moving to the Foundry plan.",
    kind: "approve",
    route: "overview",
    examples: ["Approve the request", "Approve Kanso Workshop"],
    confirmation: "always",
  },
  {
    id: "reject-request",
    label: "Reject plan request",
    description: "Reject the pending Kanso Workshop plan change request.",
    kind: "delete",
    route: "overview",
    examples: ["Reject the request", "Decline Kanso Workshop"],
    confirmation: "always",
  },
  {
    id: "update-workspace-settings",
    label: "Update workspace settings",
    description: "Update the workspace name, URL slug, or default currency.",
    kind: "update",
    route: "settings",
    fields: [
      { name: "workspaceName", label: "Workspace name", type: "string", required: false },
      { name: "workspaceUrl", label: "Workspace URL slug", type: "string", required: false },
      { name: "currency", label: "Currency", type: "enum", options: ["USD", "EUR"], required: false },
    ],
    examples: ["Rename the workspace", "Change currency to EUR"],
    confirmation: "always",
  },
  {
    id: "update-profile",
    label: "Update profile",
    description: "Update the current user's name, email, or timezone.",
    kind: "update",
    route: "profile",
    fields: [
      { name: "fullName", label: "Full name", type: "string", required: false },
      { name: "email", label: "Email address", type: "email", required: false },
      { name: "timezone", label: "Time zone", type: "enum", options: ["UTC", "EST"], required: false },
    ],
    examples: ["Change my timezone to EST", "Update my email"],
    confirmation: "always",
  },
  {
    id: "mark-all-notifications-read",
    label: "Mark all notifications read",
    description: "Mark every workspace notification as read.",
    kind: "update",
    route: "notifications",
    examples: ["Mark all notifications read", "Clear notification badges"],
    confirmation: "never",
  },
]

export type NorthgridDemoAdapter = {
  navigate: (route: AppRoute) => void
  getCustomers: () => NorthgridCustomer[]
  setCustomers: (customers: NorthgridCustomer[]) => void
  getOrders: () => NorthgridOrder[]
  setOrders: (orders: NorthgridOrder[]) => void
  getInvoices: () => NorthgridInvoice[]
  setInvoices: (invoices: NorthgridInvoice[]) => void
  getSettings: () => NorthgridSettings
  setSettings: (settings: NorthgridSettings) => void
  getProfile: () => NorthgridProfile
  setProfile: (profile: NorthgridProfile) => void
  setLastSevenDays: (active: boolean) => void
  getApprovalStatus: () => "pending" | "approved" | "rejected"
  setApprovalStatus: (status: "pending" | "approved" | "rejected") => void
  markAllNotificationsRead: () => void
}

function text(input: DashInput, key: string) {
  return String(input[key] ?? "").trim()
}

function amount(input: DashInput, key: string) {
  const value = input[key]
  return value === undefined || value === null || value === "" ? Number.NaN : Number(value)
}

function money(value: number, cents = false) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  }).format(value)
}

/** Parses a formatted currency string like "$34,210.00" back into a number. */
function moneyValue(formatted: string) {
  const parsed = Number(String(formatted).replace(/[^0-9.\-]/g, ""))
  return Number.isFinite(parsed) ? parsed : 0
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

function nextId(prefix: string, values: string[]) {
  const highest = values.reduce((max, value) => {
    const number = Number(value.replace(/\D/g, ""))
    return Number.isFinite(number) ? Math.max(max, number) : max
  }, 0)
  return `${prefix}-${String(highest + 1).padStart(4, "0")}`
}

function findByNameOrId<T extends { id: string }>(
  values: T[],
  query: string,
  name: (value: T) => string
) {
  const normalized = query.toLowerCase()
  return values.find(
    (value) => value.id.toLowerCase() === normalized || name(value).toLowerCase() === normalized
  )
}

function handlerResult(message: string, data?: unknown): DashHandlerResult {
  return { message, data }
}

export function createNorthgridCapabilities(
  adapter: NorthgridDemoAdapter
): DashCapabilityRegistration[] {
  return northgridCapabilityDescriptors.map((capability) => ({
    ...capability,
    validate: (input) => {
      const groups: Record<string, string[]> = {
        "update-customer": ["plan", "email"],
        "update-invoice": ["status", "amount", "dueDate"],
        "update-workspace-settings": ["workspaceName", "workspaceUrl", "currency"],
        "update-profile": ["fullName", "email", "timezone"],
      }
      const fields = groups[capability.id]
      if (!fields || fields.some((field) => input[field] !== undefined && input[field] !== "")) {
        return undefined
      }
      return {
        fields,
        message: `What would you like to change for ${capability.label.toLowerCase()}?`,
      }
    },
    preview: (input) => {
      if (capability.id.startsWith("delete-")) {
        return `${capability.label}: ${Object.values(input).filter(Boolean).join(" · ")}\nThis removal cannot be undone in the demo.`
      }
      const values = (capability.fields ?? [])
        .filter((field) => input[field.name] !== undefined)
        .map((field) => `${field.label}: ${String(input[field.name])}`)
      return [capability.label, ...values].join("\n")
    },
    handler: ({ input }) => {
      const route = capability.route as AppRoute | undefined
      if (capability.kind === "navigate" && route) {
        adapter.navigate(route)
        return handlerResult(`${capability.label.replace(/^Open /, "")} opened.`)
      }

      switch (capability.id) {
        case "read-workspace-summary": {
          adapter.navigate("overview")
          return handlerResult("Here’s what’s happening in Northgrid.", {
            revenue: NORTHGRID_METRICS.revenue,
            activeCustomers: adapter.getCustomers().length,
            orders: adapter.getOrders().length,
            invoices: adapter.getInvoices().length,
            approval: adapter.getApprovalStatus(),
          })
        }
        case "read-analytics": {
          adapter.navigate("analytics")
          const period = text(input, "period") || "Last 30 days"
          return handlerResult(`Analytics loaded for ${period.toLowerCase()}.`, {
            period,
            netRevenue: NORTHGRID_METRICS.revenue,
            activeCustomers: NORTHGRID_METRICS.activeCustomers,
            revenuePerCustomer: NORTHGRID_METRICS.revenuePerCustomer,
            growth: NORTHGRID_METRICS.growth,
          })
        }
        case "find-customers": {
          adapter.navigate("customers")
          const query = text(input, "query").toLowerCase()
          const plan = text(input, "plan")
          const customers = adapter.getCustomers().filter((customer) => {
            const matchesQuery =
              !query ||
              `${customer.id} ${customer.name} ${customer.email} ${customer.owner}`
                .toLowerCase()
                .includes(query)
            return matchesQuery && (!plan || customer.plan === plan)
          })
          return handlerResult(
            customers.length
              ? `Found ${customers.length} customer${customers.length === 1 ? "" : "s"}: ${customers.map((customer) => customer.name).join(", ")}.`
              : "No customers matched that request.",
            customers
          )
        }
        case "top-customers": {
          adapter.navigate("customers")
          const limit = Number.isFinite(amount(input, "limit")) ? Math.max(1, Math.min(10, amount(input, "limit"))) : 1
          const ranked = [...adapter.getCustomers()].sort((a, b) => moneyValue(b.spend) - moneyValue(a.spend))
          const top = ranked.slice(0, limit)
          const leader = top[0]
          const message =
            limit === 1 && leader
              ? `${leader.name} is the most profitable customer, with ${leader.spend} lifetime spend on the ${leader.plan} plan (${leader.email}).`
              : `Top ${top.length} customers by lifetime spend: ${top.map((c, i) => `${i + 1}. ${c.name} (${c.spend}, ${c.plan})`).join("; ")}.`
          return handlerResult(message, top)
        }
        case "revenue-overview": {
          adapter.navigate("analytics")
          const customers = adapter.getCustomers()
          const orders = adapter.getOrders()
          const invoices = adapter.getInvoices()
          const lifetimeValue = customers.reduce((sum, c) => sum + moneyValue(c.spend), 0)
          const paidOrders = orders.filter((o) => o.status === "Paid")
          const paidRevenue = paidOrders.reduce((sum, o) => sum + moneyValue(o.amount), 0)
          const outstanding = invoices
            .filter((i) => i.status === "Sent" || i.status === "Draft")
            .reduce((sum, i) => sum + moneyValue(i.amount), 0)
          const top = [...customers].sort((a, b) => moneyValue(b.spend) - moneyValue(a.spend))[0]
          return handlerResult(
            `The workspace has ${money(lifetimeValue, true)} in lifetime customer value across ${customers.length} accounts. Paid orders total ${money(paidRevenue, true)}, with ${money(outstanding, true)} still outstanding on open invoices.${top ? ` Your most profitable customer is ${top.name} at ${top.spend}.` : ""}`,
            {
              lifetimeValue: money(lifetimeValue, true),
              paidOrderRevenue: money(paidRevenue, true),
              outstanding: money(outstanding, true),
              customers: customers.length,
              paidOrders: paidOrders.length,
              topCustomer: top ? { name: top.name, spend: top.spend, plan: top.plan } : null,
            }
          )
        }
        case "plan-leaders": {
          adapter.navigate("analytics")
          const plans = ["Foundry", "Workshop", "Bench"] as const
          const leaders = plans.map((plan) => {
            const onPlan = adapter.getCustomers().filter((c) => c.plan === plan)
            const top = onPlan.sort((a, b) => moneyValue(b.spend) - moneyValue(a.spend))[0]
            return { plan, customer: top ?? null }
          })
          const message = leaders
            .map((l) => (l.customer ? `${l.plan}: ${l.customer.name} (${l.customer.spend})` : `${l.plan}: none yet`))
            .join(". ")
          return handlerResult(`Top customer per plan — ${message}.`, leaders)
        }
        case "create-customer": {
          const name = text(input, "name")
          const email = text(input, "email")
          const plan = text(input, "plan") as NorthgridCustomer["plan"]
          if (adapter.getCustomers().some((customer) => customer.name.toLowerCase() === name.toLowerCase())) {
            throw new Error(`${name} already exists.`)
          }
          const customer: NorthgridCustomer = {
            id: nextId("CUS", adapter.getCustomers().map((item) => item.id)),
            name,
            email,
            owner: email.split("@")[0]?.replace(/[._-]/g, " ") || "New owner",
            plan,
            spend: "$0",
            last: "Just now",
            initials: initials(name),
          }
          adapter.setCustomers([customer, ...adapter.getCustomers()])
          adapter.navigate("customers")
          return handlerResult(`${name} was created on the ${plan} plan.`, customer)
        }
        case "update-customer": {
          const customer = findByNameOrId(adapter.getCustomers(), text(input, "customer"), (item) => item.name)
          if (!customer) throw new Error("That customer was not found.")
          const updated = {
            ...customer,
            ...(text(input, "plan") ? { plan: text(input, "plan") as NorthgridCustomer["plan"] } : {}),
            ...(text(input, "email") ? { email: text(input, "email") } : {}),
            last: "Just now",
          }
          adapter.setCustomers(adapter.getCustomers().map((item) => item.id === customer.id ? updated : item))
          adapter.navigate("customers")
          return handlerResult(`${customer.name} was updated.`, updated)
        }
        case "delete-customer": {
          const customer = findByNameOrId(adapter.getCustomers(), text(input, "customer"), (item) => item.name)
          if (!customer) throw new Error("That customer was not found.")
          adapter.setCustomers(adapter.getCustomers().filter((item) => item.id !== customer.id))
          adapter.navigate("customers")
          return handlerResult(`${customer.name} was deleted.`, customer)
        }
        case "find-orders": {
          adapter.navigate("orders")
          const query = text(input, "query").toLowerCase()
          const status = text(input, "status")
          const orders = adapter.getOrders().filter((order) => {
            const matchesQuery =
              !query ||
              `${order.id} ${order.customer} ${order.product}`.toLowerCase().includes(query)
            return matchesQuery && (!status || order.status === status)
          })
          return handlerResult(
            orders.length
              ? `Found ${orders.length} order${orders.length === 1 ? "" : "s"} totaling ${money(orders.reduce((sum, order) => sum + Number(order.amount.replace(/[$,]/g, "")), 0))}.`
              : "No orders matched that request.",
            orders
          )
        }
        case "show-orders-last-week":
          adapter.setLastSevenDays(true)
          adapter.navigate("orders")
          return handlerResult("Orders are filtered to the last seven days.", adapter.getOrders())
        case "create-order": {
          const order: NorthgridOrder = {
            id: nextId("ORD", adapter.getOrders().map((item) => item.id)),
            customer: text(input, "customer"),
            product: text(input, "product"),
            amount: money(amount(input, "amount")),
            status: (text(input, "status") || "Open") as NorthgridOrder["status"],
            date: "Today",
          }
          adapter.setOrders([order, ...adapter.getOrders()])
          adapter.navigate("orders")
          return handlerResult(`${order.id} was created for ${order.customer}.`, order)
        }
        case "update-order": {
          const order = adapter.getOrders().find((item) => item.id.toLowerCase() === text(input, "orderId").toLowerCase())
          if (!order) throw new Error("That order was not found.")
          const updated = { ...order, status: text(input, "status") as NorthgridOrder["status"] }
          adapter.setOrders(adapter.getOrders().map((item) => item.id === order.id ? updated : item))
          adapter.navigate("orders")
          return handlerResult(`${order.id} is now ${updated.status.toLowerCase()}.`, updated)
        }
        case "delete-order": {
          const order = adapter.getOrders().find((item) => item.id.toLowerCase() === text(input, "orderId").toLowerCase())
          if (!order) throw new Error("That order was not found.")
          adapter.setOrders(adapter.getOrders().filter((item) => item.id !== order.id))
          adapter.navigate("orders")
          return handlerResult(`${order.id} was deleted.`, order)
        }
        case "export-orders":
          adapter.navigate("orders")
          return handlerResult("Orders CSV is ready to download.", adapter.getOrders())
        case "find-invoices": {
          adapter.navigate("invoices")
          const query = text(input, "query").toLowerCase()
          const status = text(input, "status")
          const invoices = adapter.getInvoices().filter((invoice) => {
            const matchesQuery =
              !query || `${invoice.id} ${invoice.customer}`.toLowerCase().includes(query)
            return matchesQuery && (!status || invoice.status === status)
          })
          return handlerResult(
            invoices.length
              ? `Found ${invoices.length} invoice${invoices.length === 1 ? "" : "s"}.`
              : "No invoices matched that request.",
            invoices
          )
        }
        case "create-invoice": {
          const invoice: NorthgridInvoice = {
            id: nextId("INV", adapter.getInvoices().map((item) => item.id)),
            customer: text(input, "customer"),
            amount: money(amount(input, "amount"), true),
            due: text(input, "dueDate"),
            status: "Draft",
          }
          adapter.setInvoices([invoice, ...adapter.getInvoices()])
          adapter.navigate("invoices")
          return handlerResult(`${invoice.id} was created for ${invoice.customer}.`, invoice)
        }
        case "update-invoice": {
          const invoice = adapter.getInvoices().find((item) => item.id.toLowerCase() === text(input, "invoiceId").toLowerCase())
          if (!invoice) throw new Error("That invoice was not found.")
          const updated: NorthgridInvoice = {
            ...invoice,
            ...(text(input, "status") ? { status: text(input, "status") as NorthgridInvoice["status"] } : {}),
            ...(Number.isFinite(amount(input, "amount")) ? { amount: money(amount(input, "amount"), true) } : {}),
            ...(text(input, "dueDate") ? { due: text(input, "dueDate") } : {}),
          }
          adapter.setInvoices(adapter.getInvoices().map((item) => item.id === invoice.id ? updated : item))
          adapter.navigate("invoices")
          return handlerResult(`${invoice.id} was updated.`, updated)
        }
        case "delete-invoice": {
          const invoice = adapter.getInvoices().find((item) => item.id.toLowerCase() === text(input, "invoiceId").toLowerCase())
          if (!invoice) throw new Error("That invoice was not found.")
          adapter.setInvoices(adapter.getInvoices().filter((item) => item.id !== invoice.id))
          adapter.navigate("invoices")
          return handlerResult(`${invoice.id} was deleted.`, invoice)
        }
        case "export-report":
          adapter.navigate("analytics")
          return handlerResult("Analytics CSV is ready to download.", {
            period: text(input, "period") || "Last 30 days",
            netRevenue: NORTHGRID_METRICS.revenue,
            activeCustomers: NORTHGRID_METRICS.activeCustomers,
          })
        case "read-approval-request":
          adapter.navigate("overview")
          return handlerResult(
            adapter.getApprovalStatus() === "pending"
              ? "Kanso Workshop requested a move to the Foundry plan."
              : `The Kanso Workshop request was ${adapter.getApprovalStatus()}.`,
            { customer: "Kanso Workshop", requestedPlan: "Foundry", status: adapter.getApprovalStatus() }
          )
        case "approve-request":
          adapter.setApprovalStatus("approved")
          adapter.navigate("overview")
          return handlerResult("Kanso Workshop was approved for the Foundry plan.")
        case "reject-request":
          adapter.setApprovalStatus("rejected")
          adapter.navigate("overview")
          return handlerResult("The Kanso Workshop plan change was rejected.")
        case "update-workspace-settings": {
          const settings = adapter.getSettings()
          const updated: NorthgridSettings = {
            workspaceName: text(input, "workspaceName") || settings.workspaceName,
            workspaceUrl: text(input, "workspaceUrl") || settings.workspaceUrl,
            currency: (text(input, "currency") || settings.currency) as NorthgridSettings["currency"],
          }
          adapter.setSettings(updated)
          adapter.navigate("settings")
          return handlerResult("Workspace settings were updated.", updated)
        }
        case "update-profile": {
          const profile = adapter.getProfile()
          const updated: NorthgridProfile = {
            fullName: text(input, "fullName") || profile.fullName,
            email: text(input, "email") || profile.email,
            timezone: (text(input, "timezone") || profile.timezone) as NorthgridProfile["timezone"],
          }
          adapter.setProfile(updated)
          adapter.navigate("profile")
          return handlerResult("Your profile was updated.", updated)
        }
        case "mark-all-notifications-read":
          adapter.markAllNotificationsRead()
          adapter.navigate("notifications")
          return handlerResult("All notifications were marked as read.")
        default:
          throw new Error(`${capability.label} is not implemented in the Northgrid demo.`)
      }
    },
  }))
}
