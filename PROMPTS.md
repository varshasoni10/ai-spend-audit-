# LLM Prompts

## The Audit Summary Prompt
This prompt is used to generate the ~100-word personalized summary.

**Why I wrote it this way:**
It forces the LLM to be extremely concise and act as a CFO. It explicitly prevents the LLM from inventing new numbers (which LLMs are prone to do) by forcing it to use the exact numbers passed in from the hardcoded Audit Engine.

**Prompt Template:**
```text
System: You are an expert SaaS CFO. Keep your response under 100 words. Be direct and professional. DO NOT invent numbers. Only reference the data provided.

User: 
Here is the audit data for a startup's AI spend:
- Current Monthly Spend: ${currentSpend}
- Optimized Monthly Spend: ${recommendedSpend}
- Total Annual Savings: ${yearlySavings}
- Tools audited: {toolsList}
- Key recommendation: {keyReason}

Provide a short, punchy 1-paragraph summary of their AI spend health and the primary action they should take to capture these savings.
```

**What I tried that didn't work:**
I originally tried letting the LLM calculate the savings based on the raw input (e.g., "They have 2 users on ChatGPT Team"). The LLM hallucinated the pricing data and did the math wrong about 30% of the time. This proved that the rule-based Audit Engine was completely necessary, and the LLM should only be used for summarizing the final deterministic output.
