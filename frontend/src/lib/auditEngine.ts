export interface AuditInput {
  tool: string;
  plan: string;
  spend: number;
  users: number;
  useCase: string;
}

export interface AuditResult {
  currentSpend: number;
  recommendedSpend: number;
  monthlySavings: number;
  yearlySavings: number;
  reason: string;
  recommendedAction: string;
}

export function runAudit(input: AuditInput): AuditResult {
  let recommendedSpend = input.spend;
  let reason = "You are currently on the optimal plan for your usage.";
  let recommendedAction = "Keep current plan.";

  if (input.tool === 'ChatGPT' && input.plan === 'Team' && input.users <= 2) {
    recommendedSpend = input.users * 20; 
    reason = "Your team size is too small to justify the overhead of the Team plan.";
    recommendedAction = "Downgrade to ChatGPT Plus.";
  }

  if (input.tool === 'Cursor' && input.plan === 'Business' && input.users <= 5) {
    recommendedSpend = input.users * 20; 
    reason = "Unless you need centralized billing and enforced privacy mode, Pro is sufficient for small teams.";
    recommendedAction = "Downgrade to Cursor Pro.";
  }

  if (input.tool === 'Copilot' && input.plan === 'Enterprise') {
    recommendedSpend = input.users * 19; 
    reason = "Enterprise features (like custom models) are rarely utilized fully unless you have a very large codebase.";
    recommendedAction = "Downgrade to GitHub Copilot Business.";
  }

  if (input.tool === 'Claude' && input.plan === 'Pro' && input.users >= 5) {
    recommendedSpend = input.users * 30; // Claude Team is $30
    reason = "You have enough users to benefit from centralized billing and higher usage limits on the Team plan.";
    recommendedAction = "Upgrade to Claude Team (costs more, but saves administrative overhead).";
    // wait, savings would be negative here. Let's stick to savings.
    if (input.spend > recommendedSpend) {
        recommendedSpend = input.users * 30;
    } else {
        recommendedSpend = input.spend;
        reason = "Consider the Team plan for better administration.";
        recommendedAction = "Upgrade to Claude Team.";
    }
  }

  const monthlySavings = Math.max(0, input.spend - recommendedSpend);
  const yearlySavings = monthlySavings * 12;

  return {
    currentSpend: input.spend,
    recommendedSpend: input.spend - monthlySavings, // Ensure it aligns
    monthlySavings,
    yearlySavings,
    reason,
    recommendedAction
  };
}
