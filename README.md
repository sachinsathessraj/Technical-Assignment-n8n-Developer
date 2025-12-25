# Technical Assignment – n8n Developer

A single-page contact experience built with Next.js 16 (App Router). Submissions are sent as JSON to an n8n webhook endpoint and the layout is Vercel-ready.

## Tech stack
- Next.js 16 / React 19 (App Router, TypeScript)
- Tailwind CSS v4 (via `@tailwindcss/postcss`)
- Hosted on Vercel, backed by n8n webhook automation

## Local development
```bash
npm install
npm run dev
# open http://localhost:3000
```

Environment variable:

| Name | Description |
| ---- | ----------- |
| `NEXT_PUBLIC_N8N_WEBHOOK_URL` | n8n endpoint that receives the form JSON. Optional—defaults to the provided test URL. |

Create a `.env.local` file when you want to override the fallback URL, then restart `npm run dev`.

## Deployment
1. Push this repository to GitHub.
2. In Vercel, import the repo and keep the root directory as `.` (project root).
3. Add `NEXT_PUBLIC_N8N_WEBHOOK_URL` under Project Settings → Environment Variables.
4. Deploy. Vercel will run `next build` and host the compiled site.

## n8n integration
The form posts `{ name, email, message }` JSON to the configured webhook using `fetch`. n8n can parse the payload with the standard Webhook trigger node and route data to your automation flow.
