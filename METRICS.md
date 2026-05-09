# Metrics

## North Star Metric
**Total Identified Annual Savings ($)**
*Why:* This perfectly aligns user value with Credex's business goals. If the tool identifies $0 in savings, the user got no value and Credex gets no lead. If the tool consistently identifies millions of dollars in aggregate annual savings, it proves the core hypothesis that startups are overspending, and it fills the Credex pipeline with high-value prospects.

## Input Metrics
1. **Audits Completed per Week**: Top-of-funnel volume.
2. **Email Capture Rate (%)**: The efficiency of the "Aha!" moment (the results page) in converting a casual visitor into a lead.
3. **Average Savings Identified per Audit**: Indicates if we are attracting the right target audience (startups with actual scale, rather than solo devs where savings are minimal).

## What I'd Instrument First
I would immediately instrument PostHog to track the funnel drop-off: 
`Landing Page View -> Form Started -> Form Completed -> Results Viewed -> Email Captured -> Credex Link Clicked`.

## The Pivot Number
If the **Email Capture Rate is < 5%** after 1,000 completed audits. 
*Why:* If people are finishing the audit but refusing to give their email to see the full report or take action, it means either A) the savings we identify aren't large enough to care about, or B) they don't trust the math. This would trigger a pivot to rethink the core value proposition or how the results are presented.
