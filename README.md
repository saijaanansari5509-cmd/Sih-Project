# Sarkari Scheme Finder

A beginner-friendly Next.js app that helps users discover relevant Indian government schemes through a transparent questionnaire and a grounded AI assistant.

## Features

- Four-question scheme matching flow
- Transparent scoring: business type (40), support need (30), income (20), documents (10)
- Results ranked by match percentage with clear reasons
- Detailed scheme pages with benefits, documents, application steps, and official links
- AI assistant grounded only in the verified scheme dataset
- Offline keyword fallback when AI Gateway is unavailable
- Responsive mobile-first interface
- Honest eligibility and official-verification disclaimers

## Project structure

```text
app/
  page.tsx                 Home page
  questionnaire/page.tsx   Questionnaire flow
  results/page.tsx         Matching results
  scheme/[id]/page.tsx     Scheme details
  assistant/page.tsx       AI assistant UI
  about/page.tsx           How it works
  api/assistant/route.ts   Server-side assistant endpoint
components/                 Shared UI components
lib/schemes.ts             Scheme dataset and types
lib/match.ts               Questions and matching engine
lib/assistant.ts           Assistant context and offline fallback
```

## Getting started

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## AI assistant

The assistant uses the Vercel AI Gateway when available. If the gateway is unavailable, the app automatically uses its local keyword-based fallback, so the core experience remains usable.

The assistant is constrained to scheme IDs from `lib/schemes.ts`; it does not invent schemes. Always verify current eligibility, benefits, and application requirements on the linked official government website.

## Deployment

The app can be deployed to Vercel from the project UI using **Publish**. The questionnaire and matching engine work without external services. AI Gateway connectivity enables the live AI assistant in deployment.

## Important disclaimer

This is an awareness and discovery tool, not an official government service. Scheme rules, amounts, eligibility criteria, and application procedures may change. Users should confirm all information through the official links before applying.

## License

This project is provided for educational and demonstration purposes.
