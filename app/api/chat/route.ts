import OpenAI from "openai";
import { retrieveDocs, type Document } from "@/lib/mock-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChatRequest {
  message: string;
  history?: { role: "user" | "assistant"; content: string }[];
}

function sse(payload: object): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify(payload)}\n\n`);
}

function buildContext(docs: Document[]): string {
  return docs
    .map(
      (d, i) =>
        `[${i + 1}] ${d.title} (source: ${d.source}, by ${d.author})\n${d.excerpt}`
    )
    .join("\n\n");
}

const SYSTEM_PROMPT = `You are OmniSearch, an enterprise knowledge assistant for Acme Corp.
You answer employees' questions using ONLY the provided source documents.

Rules:
- Be concise and direct. Aim for 2-4 sentences unless the user asks for detail.
- Cite sources inline using [1], [2], etc. matching the numbered documents.
- If the documents don't contain the answer, say so honestly. Do not make things up.
- Use a professional but friendly tone.
- Format with short paragraphs. No headers unless the answer is genuinely long.`;

export async function POST(req: Request) {
  let body: ChatRequest;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const message = (body.message || "").trim();
  if (!message) return new Response("Missing message", { status: 400 });

  const docs = retrieveDocs(message, 3);
  const apiKey = process.env.OPENAI_API_KEY;
  const baseURL = process.env.OPENAI_BASE_URL;
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const stream = new ReadableStream({
    async start(controller) {
      // 1) emit citations first so UI can render the source cards immediately
      controller.enqueue(sse({ type: "citations", citations: docs }));

      try {
        if (apiKey) {
          await streamFromOpenAI({
            apiKey,
            baseURL,
            model,
            message,
            history: body.history || [],
            docs,
            controller,
          });
        } else {
          await streamMock({ message, docs, controller });
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        controller.enqueue(
          sse({ type: "error", message: `LLM call failed: ${msg}` })
        );
        // fall back to mock so the demo still feels alive
        try {
          await streamMock({ message, docs, controller });
        } catch {
          /* ignore */
        }
      } finally {
        controller.enqueue(sse({ type: "done" }));
        controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/event-stream; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      "x-accel-buffering": "no",
      connection: "keep-alive",
    },
  });
}

async function streamFromOpenAI({
  apiKey,
  baseURL,
  model,
  message,
  history,
  docs,
  controller,
}: {
  apiKey: string;
  baseURL?: string;
  model: string;
  message: string;
  history: { role: "user" | "assistant"; content: string }[];
  docs: Document[];
  controller: ReadableStreamDefaultController<Uint8Array>;
}) {
  const client = new OpenAI({ apiKey, baseURL });
  const userPrompt = `Context documents:\n\n${buildContext(docs)}\n\nUser question: ${message}\n\nAnswer concisely with inline [n] citations.`;

  const completion = await client.chat.completions.create({
    model,
    stream: true,
    temperature: 0.3,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.slice(-6).map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user", content: userPrompt },
    ],
  });

  for await (const chunk of completion) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) {
      controller.enqueue(sse({ type: "delta", text: delta }));
    }
  }
}

// Mock streaming — feels like a real LLM, even works offline
async function streamMock({
  message,
  docs,
  controller,
}: {
  message: string;
  docs: Document[];
  controller: ReadableStreamDefaultController<Uint8Array>;
}) {
  const answer = composeMockAnswer(message, docs);
  for (const piece of tokenize(answer)) {
    controller.enqueue(sse({ type: "delta", text: piece }));
    // small jitter so it feels like real streaming
    await new Promise((r) => setTimeout(r, 18 + Math.random() * 22));
  }
}

function tokenize(s: string): string[] {
  // word-ish chunks so the streaming animation looks natural
  return s.match(/\S+\s*|\s+/g) || [s];
}

function composeMockAnswer(query: string, docs: Document[]): string {
  const q = query.toLowerCase();

  // Try to match against a few canonical questions for nicer demos
  if (q.includes("remote") || q.includes("work from home") || q.includes("wfh")) {
    return `All full-time employees can work remotely up to 4 days per week. Engineers and designers may opt into fully remote arrangements with manager approval [1]. Core collaboration hours are 10am–3pm in your local time zone — outside of that you're free to structure your day.\n\nIf you want to switch to fully remote, talk to your manager and People Ops [1].`;
  }
  if (q.includes("pto") || q.includes("vacation") || q.includes("time off")) {
    return `Acme has unlimited PTO with a 15-day minimum recommended per year [1]. Sick leave is tracked separately. For trips longer than 3 days, submit your request in BambooHR at least 2 weeks ahead and get manager approval [1].`;
  }
  if (q.includes("roadmap") || q.includes("q4") || q.includes("priorities")) {
    return `Q4 2025 focuses on three pillars: platform reliability, AI/ML infrastructure, and developer experience [1]. The headline goals are reducing P95 latency by 30%, shipping the new vector search service, and deprecating the legacy auth module [1].`;
  }
  if (q.includes("onboard") || q.includes("new engineer") || q.includes("dev environment")) {
    return `Day 1 covers GitHub access, VPN, and AWS console setup [1]. In your first week you'll pair with your buddy and ship a small PR. By week 2 you should attend the architecture overview, and by month 1 you're owning a feature end-to-end [1]. Required reading: the service catalog and the on-call runbook.`;
  }
  if (q.includes("on-call") || q.includes("oncall") || q.includes("payment") && q.includes("runbook")) {
    return `For the payments service, primary on-call is paged via PagerDuty with an SLO of 5 minutes during business hours and 15 minutes off-hours [1]. The most common issues are Stripe webhook lag, idempotency key collisions, and currency conversion errors [1]. Escalate to @payments-leads on Slack if needed.`;
  }
  if (q.includes("incident") || q.includes("outage") || q.includes("postmortem")) {
    return `The most recent major incident was on 2025-10-28 — primary PostgreSQL hit memory exhaustion at 14:23 UTC [1]. Failover to the read replica took 47 seconds. Root cause: a runaway analytics query joined three large tables without proper indexing [1].`;
  }
  if (q.includes("auth") || q.includes("jwt") || q.includes("token")) {
    return `Use RS256 over HS256 for service-to-service auth [1]. Access tokens expire in 15 minutes; refresh tokens last 7 days and are rotated on every use. Never store JWTs in localStorage — use httpOnly secure cookies, and always validate the audience claim [1].`;
  }
  if (q.includes("freeze") || q.includes("deploy") || q.includes("deployment")) {
    return `There's a soft deployment freeze from Dec 22 to Jan 3 for the holidays [1]. Hotfixes still require VP approval. Regular deploys resume Jan 4, followed by a coordinated release of the new payment flow [1].`;
  }
  if (q.includes("billing") || q.includes("migration") || q.includes("go")) {
    return `PROJ-1247 is the epic to migrate the billing service from Node.js to Go [1]. It's split into three phases: invoice generation, payment processing, and subscription lifecycle. Estimated 14 weeks total, with a dependency on the new event bus (PROJ-1180) [1].`;
  }
  if (q.includes("design") || q.includes("component") || q.includes("ui")) {
    return `Design System v3.0 is built on Radix primitives plus Tailwind [1]. All new components must support dark mode, keyboard navigation, screen readers, and reduced-motion preferences. Tokens live in /design-tokens/v3 [1].`;
  }

  // Generic fallback — uses whatever was retrieved
  if (docs.length > 0) {
    return (
      `Based on your connected workspaces, here's what I found:\n\n` +
      docs
        .slice(0, 2)
        .map((d, i) => `${d.excerpt} [${i + 1}]`)
        .join("\n\n") +
      `\n\nLet me know if you want me to dig deeper into any of these.`
    );
  }
  return `I couldn't find a clear answer in our connected sources. You might want to check directly with the relevant team — or rephrase the question. I can also help if you want me to summarize a specific document.`;
}
