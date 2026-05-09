# Reflection

1. **The hardest bug you hit this week, and how you debugged it:**
The hardest bug was dealing with localStorage sync issues between React state and the actual persisted data, especially when users cleared their form. It created ghost states where the UI showed 0 spend, but the audit engine calculated old savings. I debugged it by using React DevTools to inspect state vs inspecting Application > Local Storage in Chrome, realizing my `useEffect` for syncing wasn't properly handling undefined/null clearing. I fixed it by explicitly passing `null` as a reset signal.

2. **A decision you reversed mid-week, and what made you reverse it:**
I initially planned to use Next.js App Router. I reversed this to use React + Vite + Express. The reason was speed and simplicity; managing the backend APIs and avoiding server/client boundary complexities in Next.js allowed me to ship the MVP faster and with a cleaner mental model for a small app.

3. **What you would build in week 2 if you had it:**
I would build the embeddable widget version. Allowing blogs (like "Top AI Tools 2026") to embed a mini version of the calculator directly in their article would be a massive top-of-funnel driver for Credex.

4. **How you used AI tools:**
I used Gemini (as an AI coding assistant) to quickly scaffold the boilerplate React components and generate Tailwind utility classes for the layout. I didn't trust it with the precise financial math in the Audit Engine, as LLMs often hallucinate business logic. One time the AI suggested an invalid Tailwind class (`text-gray-1000`) which I caught because the text was invisible.

5. **Self-rating:**
- Discipline: 9 (Shipped the entire core experience in one sitting)
- Code quality: 8 (Clean abstractions, though test coverage could be higher)
- Design sense: 8 (Clean, minimalist Tailwind UI focused on conversion)
- Problem-solving: 9 (Found the simplest path to a working product without over-engineering)
- Entrepreneurial thinking: 10 (Focused entirely on the core value prop and lead capture loop rather than fancy tech)
