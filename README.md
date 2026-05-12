# AI Spend Auditor

A free web tool that helps startups identify if they are overspending on AI infrastructure tools (Cursor, Claude, ChatGPT, etc.) and provides actionable downgrade or switch recommendations.

## What I Built
I built a complete end-to-end audit web application. A user can input their stack, and the rule-based Audit Engine will calculate savings based on their current plan, team size, and usage. The app uses an LLM (OpenAI/Anthropic) to provide a personalized summary of the findings and securely captures the user's email before providing the detailed shareable report.

## Quick Start

### 1. Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```

### 2. Backend (Node.js + Express)
```bash
cd backend
npm install
npm run dev
```

## Decisions & Trade-offs
1. **React + Vite instead of Next.js**: Chosen for speed of execution and simplicity. Since the project doesn't strictly need SSR right now, an SPA with a lightweight Express backend is easier to ship in 1 day.
2. **Supabase over standard PostgreSQL**: Supabase provides a very fast out-of-the-box backend for lead capture with zero setup friction.
3. **localStorage over immediate DB writes**: Form state persists across reloads via localStorage so users don't lose their input. The DB is only hit when they opt-in to capture their email and generate the final shareable report.
4. **Tailwind CSS + Headless UI**: Allowed for rapid creation of a premium-looking UI without the bloat of large component libraries like MUI.
5. **Express for API/AI calls**: Hides the OpenAI/Anthropic API key securely rather than making direct calls from the Vite frontend.

## Deployed URL
[https://frontend-five-green-32.vercel.app] (Insert here)
