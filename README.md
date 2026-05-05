# OmniSearch

Live Demo: https://omnisearch-eight.vercel.app/

> AI-powered enterprise knowledge assistant. Connect Notion, Drive, Slack, Jira, and Confluence — get instant, cited answers from your company's collective knowledge.

![Stack](https://img.shields.io/badge/Next.js-14-000?logo=next.js)
![Stack](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![Stack](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)
![Stack](https://img.shields.io/badge/OpenAI-API-412991?logo=openai)

## What it does

OmniSearch is a centralized, AI-driven knowledge management platform that eliminates information silos. Using Retrieval-Augmented Generation (RAG), it indexes your company's tools and lets employees query everything in natural language.

### Core features

- **Unified Search & AI Chat** — ChatGPT-like interface, scoped to your company's data.
- **Streaming responses** — token-by-token via Server-Sent Events.
- **Source citations** — every answer links back to the original document. No hallucinations.
- **Connector catalog** — Notion, Google Drive, Slack, Jira, Confluence (mocked for the demo; wire-protocol-ready).
- **Analytics dashboard** — top queries, weekly trends, source distribution, knowledge gaps.
- **Permissions-aware retrieval** — interns can't search HR salary data (architecture stub included).

## Demo screens

| Page | Route |
|---|---|
| Marketing landing | `/` |
| Knowledge chat | `/dashboard` |
| Connection management | `/dashboard/connections` |
| Analytics dashboard | `/dashboard/analytics` |

## Tech stack

- **Frontend**: Next.js 14 (App Router) + Tailwind CSS + Lucide icons
- **Backend**: Next.js Route Handlers (streaming SSE)
- **AI**: OpenAI Chat Completions (any model — defaults to `gpt-4o-mini`)
- **Retrieval**: simple keyword scoring over an in-memory document store (drop-in replacement for pgvector / Pinecone)
- **Mock connectors**: 10 realistic enterprise documents across 5 sources

## Run locally

```bash
npm install
cp .env.example .env.local
# (optional) add your OPENAI_API_KEY — without it, the chat uses high-quality canned responses
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project at https://vercel.com/new.
3. (Optional) Set `OPENAI_API_KEY` as a project environment variable.
4. Deploy. That's it.

The app works without `OPENAI_API_KEY` — the chat falls back to streamed mock answers tailored to the demo dataset, so the UI/UX always feels alive.

## Architecture

```
app/
├── page.tsx                  Marketing landing
├── dashboard/
│   ├── layout.tsx            Sidebar + main shell
│   ├── page.tsx              Chat (main feature)
│   ├── connections/page.tsx  Connector management
│   └── analytics/page.tsx    Admin analytics
└── api/chat/route.ts         Streaming SSE endpoint (OpenAI + mock fallback)

components/
├── sidebar.tsx
├── chat/
│   ├── chat-input.tsx        Auto-resizing textarea + submit
│   ├── message-list.tsx      Streaming message renderer with [n] citations
│   ├── citation-card.tsx     Source preview cards
│   └── empty-state.tsx       Suggested queries
└── ui/
    ├── logo.tsx
    └── source-icon.tsx       Letter-mark glyphs for each connector

lib/
├── mock-data.ts              Documents, connections, analytics, retrieveDocs()
└── utils.ts                  cn(), formatNumber(), timeAgo()
```

### Retrieval flow

1. User asks a question in `/dashboard`.
2. Client POSTs to `/api/chat` with the message + history.
3. Server runs `retrieveDocs(query)` — keyword scoring across mocked documents.
4. Server emits an SSE `citations` event with the top-K source documents (UI shows source cards immediately).
5. Server streams `delta` events token-by-token from OpenAI (or the mock generator).
6. Server emits a final `done` event.

To swap in a real vector store, replace `retrieveDocs()` in `lib/mock-data.ts` with calls to pgvector / Pinecone / Chroma.

## What's mocked vs real

| Component | Status |
|---|---|
| Frontend UI | ✅ Real |
| Streaming chat protocol | ✅ Real (SSE) |
| OpenAI integration | ✅ Real (with API key) |
| Mock fallback | ✅ Real (works offline) |
| Document retrieval | ⚠️ Mocked (keyword over fixed set) |
| Connector sync | ⚠️ Mocked (no real Notion/Slack OAuth) |
| Permissions/ACL | ⚠️ Mocked (architecture stub only) |
| Analytics data | ⚠️ Mocked |

The streaming pipeline, UI, error handling, and OpenAI integration are production-ready. Swap the data layer when you're ready to ship.

## License

MIT
