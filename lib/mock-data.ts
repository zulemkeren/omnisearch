// Mock enterprise knowledge base for OmniSearch demo
// Simulates documents pulled from Notion, Google Drive, Slack, Jira, Confluence

export type Source = "notion" | "drive" | "slack" | "jira" | "confluence";

export interface Document {
  id: string;
  title: string;
  source: Source;
  excerpt: string;
  url: string;
  author: string;
  updatedAt: string;
  tags: string[];
}

export const DOCUMENTS: Document[] = [
  {
    id: "doc-001",
    title: "Q4 2025 Engineering Roadmap",
    source: "notion",
    excerpt:
      "Our Q4 priorities focus on three pillars: platform reliability, AI/ML infrastructure, and developer experience. We aim to reduce P95 latency by 30%, ship the new vector search service, and deprecate the legacy auth module.",
    url: "https://notion.so/acme/q4-2025-roadmap",
    author: "Sarah Chen",
    updatedAt: "2025-10-12T09:30:00Z",
    tags: ["engineering", "roadmap", "Q4"],
  },
  {
    id: "doc-002",
    title: "Employee Handbook — Remote Work Policy",
    source: "drive",
    excerpt:
      "All full-time employees are eligible for remote work up to 4 days per week. Engineers and designers may opt into fully remote arrangements with manager approval. Core collaboration hours are 10am–3pm in your local time zone.",
    url: "https://drive.google.com/file/handbook-remote",
    author: "People Ops",
    updatedAt: "2025-09-01T14:00:00Z",
    tags: ["hr", "policy", "remote-work"],
  },
  {
    id: "doc-003",
    title: "Production Incident — 2025-10-28 — DB Failover",
    source: "confluence",
    excerpt:
      "At 14:23 UTC the primary PostgreSQL instance experienced a memory exhaustion event. Failover to the read replica completed in 47 seconds. Root cause: a runaway analytics query joined three large tables without proper indexing.",
    url: "https://confluence.acme.com/incidents/2025-10-28",
    author: "Marcus Rivera",
    updatedAt: "2025-10-29T11:15:00Z",
    tags: ["incident", "postmortem", "database"],
  },
  {
    id: "doc-004",
    title: "Onboarding Checklist for New Engineers",
    source: "notion",
    excerpt:
      "Day 1: GitHub access, VPN setup, AWS console. Week 1: Pair with your buddy, ship a small PR. Week 2: Attend architecture overview. Month 1: Own a feature end-to-end. Required reading: our service catalog and the on-call runbook.",
    url: "https://notion.so/acme/eng-onboarding",
    author: "Engineering Manager",
    updatedAt: "2025-08-22T10:00:00Z",
    tags: ["onboarding", "engineering"],
  },
  {
    id: "doc-005",
    title: "API Authentication — JWT Best Practices",
    source: "confluence",
    excerpt:
      "Use RS256 over HS256 for service-to-service. Tokens expire in 15 minutes; refresh tokens last 7 days and are rotated on every use. Never store JWTs in localStorage — use httpOnly secure cookies. Always validate the audience claim.",
    url: "https://confluence.acme.com/security/jwt",
    author: "Security Team",
    updatedAt: "2025-07-19T16:45:00Z",
    tags: ["security", "auth", "api"],
  },
  {
    id: "doc-006",
    title: "#engineering Slack — Deployment freeze announcement",
    source: "slack",
    excerpt:
      "Heads up team — we're entering a soft deployment freeze from Dec 22 to Jan 3 for the holiday period. Hotfixes still allowed with VP approval. Regular deploys resume Jan 4. Post-freeze, we'll do a coordinated release of the new payment flow.",
    url: "https://acme.slack.com/archives/C-eng/p1734567890",
    author: "@dan-vp-eng",
    updatedAt: "2025-12-15T17:20:00Z",
    tags: ["announcement", "deployment"],
  },
  {
    id: "doc-007",
    title: "PROJ-1247 — Migrate billing service to Go",
    source: "jira",
    excerpt:
      "Epic to migrate the billing service from Node.js to Go. Phase 1: invoice generation. Phase 2: payment processing. Phase 3: subscription lifecycle. Estimated 14 weeks total. Dependencies on the new event bus (PROJ-1180).",
    url: "https://acme.atlassian.net/browse/PROJ-1247",
    author: "Priya Patel",
    updatedAt: "2025-11-04T13:10:00Z",
    tags: ["epic", "migration", "billing"],
  },
  {
    id: "doc-008",
    title: "PTO and Time-Off Policy",
    source: "drive",
    excerpt:
      "Unlimited PTO with a 15-day minimum recommended. Sick leave is separate and tracked. Submit requests in BambooHR at least 2 weeks in advance for trips longer than 3 days. Manager approval required.",
    url: "https://drive.google.com/file/pto-policy",
    author: "People Ops",
    updatedAt: "2025-06-10T09:00:00Z",
    tags: ["hr", "policy", "pto"],
  },
  {
    id: "doc-009",
    title: "On-Call Runbook — Payment Service",
    source: "confluence",
    excerpt:
      "Primary on-call is paged via PagerDuty. SLO: respond within 5 minutes during business hours, 15 minutes off-hours. Common issues: Stripe webhook lag, idempotency key collisions, currency conversion errors. Escalate to @payments-leads on Slack.",
    url: "https://confluence.acme.com/runbooks/payments",
    author: "Payments Team",
    updatedAt: "2025-10-02T12:30:00Z",
    tags: ["runbook", "on-call", "payments"],
  },
  {
    id: "doc-010",
    title: "Design System v3.0 — Component Guidelines",
    source: "notion",
    excerpt:
      "Our v3 design system is built on Radix primitives + Tailwind. All new components must support: dark mode, keyboard navigation, screen readers, and reduced-motion preferences. Tokens live in /design-tokens/v3.",
    url: "https://notion.so/acme/design-system-v3",
    author: "Design Team",
    updatedAt: "2025-09-18T15:00:00Z",
    tags: ["design", "components", "frontend"],
  },
];

// ─── Connections ──────────────────────────────────────────────────────────
export interface Connection {
  source: Source;
  name: string;
  status: "connected" | "syncing" | "error" | "disconnected";
  documentCount: number;
  lastSync: string;
  description: string;
}

export const CONNECTIONS: Connection[] = [
  {
    source: "notion",
    name: "Notion",
    status: "connected",
    documentCount: 1247,
    lastSync: "2025-12-15T08:42:00Z",
    description: "Wikis, meeting notes, project docs",
  },
  {
    source: "drive",
    name: "Google Drive",
    status: "connected",
    documentCount: 3892,
    lastSync: "2025-12-15T08:30:00Z",
    description: "Shared docs, sheets, presentations",
  },
  {
    source: "slack",
    name: "Slack",
    status: "syncing",
    documentCount: 24561,
    lastSync: "2025-12-15T09:01:00Z",
    description: "Channel messages, threads, pinned items",
  },
  {
    source: "jira",
    name: "Jira",
    status: "connected",
    documentCount: 891,
    lastSync: "2025-12-15T08:15:00Z",
    description: "Issues, epics, sprint plans",
  },
  {
    source: "confluence",
    name: "Confluence",
    status: "connected",
    documentCount: 542,
    lastSync: "2025-12-15T07:58:00Z",
    description: "Runbooks, RFCs, postmortems",
  },
];

// ─── Analytics ────────────────────────────────────────────────────────────
export const ANALYTICS = {
  totalQueries: 18472,
  weeklyGrowth: 23.4,
  avgResponseTime: 1.2,
  activeUsers: 312,
  topQueries: [
    { query: "How do I request PTO?", count: 184 },
    { query: "VPN setup instructions", count: 142 },
    { query: "Production deploy process", count: 128 },
    { query: "Q4 roadmap priorities", count: 97 },
    { query: "On-call rotation this month", count: 89 },
    { query: "Expense reimbursement policy", count: 76 },
    { query: "How to add a new feature flag", count: 64 },
    { query: "Slack channel for hiring", count: 58 },
  ],
  knowledgeGaps: [
    { topic: "AI/ML coding standards", searches: 47, hasAnswer: false },
    { topic: "Q1 2026 OKRs", searches: 34, hasAnswer: false },
    { topic: "New employee equity vesting", searches: 28, hasAnswer: false },
  ],
  sourceBreakdown: [
    { source: "notion" as Source, percentage: 38 },
    { source: "drive" as Source, percentage: 24 },
    { source: "confluence" as Source, percentage: 18 },
    { source: "slack" as Source, percentage: 14 },
    { source: "jira" as Source, percentage: 6 },
  ],
  weeklyTrend: [
    { day: "Mon", queries: 2104 },
    { day: "Tue", queries: 2487 },
    { day: "Wed", queries: 2693 },
    { day: "Thu", queries: 2891 },
    { day: "Fri", queries: 2412 },
    { day: "Sat", queries: 487 },
    { day: "Sun", queries: 398 },
  ],
};

// ─── Simple keyword search to simulate retrieval ──────────────────────────
export function retrieveDocs(query: string, k = 3): Document[] {
  const q = query.toLowerCase();
  const scored = DOCUMENTS.map((doc) => {
    const haystack = `${doc.title} ${doc.excerpt} ${doc.tags.join(" ")}`.toLowerCase();
    let score = 0;
    for (const word of q.split(/\s+/).filter((w) => w.length > 2)) {
      if (haystack.includes(word)) score += 1;
      if (doc.title.toLowerCase().includes(word)) score += 2;
      if (doc.tags.some((t) => t.toLowerCase().includes(word))) score += 2;
    }
    return { doc, score };
  });
  scored.sort((a, b) => b.score - a.score);
  const top = scored.filter((s) => s.score > 0).slice(0, k);
  // If nothing matched well, return a random selection so the demo always shows citations
  if (top.length === 0) {
    return DOCUMENTS.slice(0, k);
  }
  return top.map((s) => s.doc);
}

export const SOURCE_META: Record<Source, { label: string; color: string }> = {
  notion: { label: "Notion", color: "text-zinc-900" },
  drive: { label: "Drive", color: "text-blue-600" },
  slack: { label: "Slack", color: "text-purple-600" },
  jira: { label: "Jira", color: "text-sky-600" },
  confluence: { label: "Confluence", color: "text-indigo-600" },
};
