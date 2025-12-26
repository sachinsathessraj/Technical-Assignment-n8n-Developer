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

Technical Assignment: n8n & JS Contact System
Overview
This system consists of a custom frontend contact form and an n8n automation workflow. It handles lead capture, data persistence, AI-powered communication, and timed follow-ups.

## Setup Instructions
1. Frontend (JavaScript + Vercel)


<img width="1680" height="962" alt="image" src="https://github.com/user-attachments/assets/8c8ec405-1258-4ee7-9c3d-cb25ac0cf700" />


Form Logic: A custom JavaScript form captures user inputs: Name, Email, and Message.

<img width="1680" height="963" alt="image" src="https://github.com/user-attachments/assets/22cd521f-b047-4334-87da-674ca540e66d" />


## Integration: On submission, the data is sent via a POST request as a JSON object to the n8n Webhook URL.

## Deployment: The frontend is hosted on Vercel for high availability and ease of deployment.

## n8n Workflow

<img width="1680" height="963" alt="image" src="https://github.com/user-attachments/assets/fa4d985a-45a1-4d51-a17d-1f476770afc3" />

## OUTPUT

<img width="1680" height="962" alt="image" src="https://github.com/user-attachments/assets/8ca1a7b5-3f1d-4644-975b-ae356275a8c7" />

# Delivers an immediate HTML-formatted reply to the user using the AI-generated content.

<img width="1680" height="960" alt="image" src="https://github.com/user-attachments/assets/5fd89f8c-0a03-457f-8097-4e5add9854b1" />

# Sends a second dynamic HTML email containing the IST timestamp.

<img width="1680" height="961" alt="image" src="https://github.com/user-attachments/assets/2088b75d-da01-4387-bf0b-0bc537c39d34" />


The workflow is structured to ensure data integrity and automated engagement:

Webhook Trigger: Receives the live data from the Vercel-hosted form.

Google Sheets Integration: Immediately appends the Name, Email, Message, and a Submitted At timestamp to a centralized sheet for record-keeping.

AI Generation: An HTTP Request node connects to OpenRouter (DeepSeek-chat) to generate a contextual response to the user's message.

SMTP Email 1: Delivers an immediate HTML-formatted reply to the user using the AI-generated content.

Wait Node: Implements a mandatory 2-minute delay before the final follow-up.

Time Formatting (IST): A Code node uses JavaScript to calculate the exact current time in the Asia/Kolkata (IST) timezone at the moment of the second email.

SMTP Email 2: Sends a second dynamic HTML email containing the IST timestamp.

## Technical Decisions
1. Data Persistence First
We decided to place the Google Sheets node immediately after the Webhook. This ensures that even if the AI API or SMTP server fails, the user's contact information is securely stored and not lost.

2. AI Model Selection
We utilized OpenRouter to access DeepSeek-chat. This was chosen for its excellent performance-to-cost ratio and its ability to provide a "DeepSeek" response via a standard OpenAI-compatible API format, making the workflow more flexible.

3. SMTP vs. Gmail Node
To satisfy the requirement of being platform-agnostic and avoiding Gmail API limitations, the SMTP node was used for all outgoing communications. The emails are sent in HTML format to allow for professional branding and dynamic data injection.

4. Dynamic IST Time Calculation
Rather than passing the initial submission time to the final email, we used a dedicated JavaScript node after the Wait node. This ensures that the time sent to the user is the actual time of the follow-up, formatted precisely for the IST timezone as required.

5. Security & Credentials
No Hardcoding: All sensitive information, including the OpenRouter API key, SMTP credentials, and Google Service Account keys, are stored within n8n’s internal Credential Manager.

Environment Variables: Vercel environment variables are used for the Webhook URL in the frontend code to keep the repository clean.
