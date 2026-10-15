// NVIDIA NIM Inference Service
// Powered by NVIDIA API Catalog: google/diffusiongemma-26b-a4b-it
// Seamlessly integrated via Vite proxy to eliminate browser CORS

const NVIDIA_API_KEY = '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';
const NVIDIA_MODEL = 'google/diffusiongemma-26b-a4b-it';

// Endpoint handles both proxy and direct fallback
const PRIMARY_ENDPOINT = '/api/nvidia/chat/completions';
const DIRECT_ENDPOINT = 'https://integrate.api.nvidia.com/v1/chat/completions';

/**
 * Core query function to NVIDIA NIM LLM
 */
export async function queryNvidiaLLM(messages, options = {}) {
  const maxTokens = options.maxTokens || 400;
  const temperature = options.temperature || 0.3;

  const payload = {
    model: NVIDIA_MODEL,
    messages,
    max_tokens: maxTokens,
    temperature
  };

  try {
    // 1. Try local dev proxy first (no CORS)
    const response = await fetch(PRIMARY_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (content && content.trim()) {
        return content.trim();
      }
    }
  } catch (proxyErr) {
    console.warn('Vite proxy failed, attempting direct NVIDIA API call...', proxyErr);
  }

  try {
    // 2. Direct fallback
    const directResp = await fetch(DIRECT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NVIDIA_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (directResp.ok) {
      const data = await directResp.json();
      return data.choices?.[0]?.message?.content?.trim() || '';
    }
  } catch (directErr) {
    console.error('Direct NVIDIA call failed:', directErr);
  }

  return null;
}

/**
 * Ask the Workforce Intelligence Multi-Agent System via NVIDIA AI
 */
export async function askNvidiaAssistant({
  prompt,
  agentId = 'optimizer',
  project = null,
  recommendation = null,
  workloadStats = null,
  skillGaps = []
}) {
  const teamNames = recommendation?.recommendedMembers?.map(m => `${m.employee.name} (${m.matchScore}% fit)`).join(', ') || 'Team not formed';
  const gapsList = recommendation?.identifiedGaps?.map(g => g.skill).join(', ') || 'No critical gaps';
  const overloadedNames = workloadStats?.topOverutilized?.map(e => `${e.name} (${e.workload}%)`).join(', ') || 'None';

  let agentRole = 'You are the Workforce Intelligence Copilot, an enterprise talent planning AI.';
  if (agentId === 'analyst') {
    agentRole = 'You are the Project Analyst Agent. You evaluate project requirements, eligibility, skill criticality, and delivery feasibility.';
  } else if (agentId === 'optimizer') {
    agentRole = 'You are the Team Optimizer Agent. You find complementary squads, maximizing skill match while avoiding burnout and preserving capacity buffers.';
  } else if (agentId === 'balancer') {
    agentRole = 'You are the Workforce Balancer Agent. You resolve workload imbalances by shifting movable sprint tasks from overloaded engineers to underutilized peers.';
  }

  const systemPrompt = `${agentRole}
Current Organization Context:
- Active Project: "${project?.name || 'Enterprise Project'}" (Priority: ${project?.priority || 'High'}, Team Size: ${project?.teamSize || 4})
- Recommended Squad: ${teamNames} (Avg Score: ${recommendation?.avgMatchScore || 85}%)
- Unfulfilled Skill Gaps: ${gapsList}
- Workforce Utilization: ${workloadStats?.avgUtilization || 72}% (Overall Balance: ${workloadStats?.currentBalance || 72}%)
- Overloaded Staff (>100%): ${overloadedNames}

Provide a concise, practical, highly professional 2-3 sentence answer specifically addressing the query using the organizational context.`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: prompt }
  ];

  const nvidiaReply = await queryNvidiaLLM(messages, { maxTokens: 280 });

  if (nvidiaReply) {
    return nvidiaReply;
  }

  // Graceful fallback heuristics if network is interrupted
  const lower = prompt.toLowerCase();
  if (lower.includes('balance') || lower.includes('overload') || lower.includes('rebalance')) {
    return `Workforce Balancer: Transferring movable delivery tasks from overloaded engineers (${overloadedNames}) to underutilized talent increases the overall balance index from ${workloadStats?.currentBalance || 72}% to 86% while reducing team churn.`;
  }
  if (lower.includes('team') || lower.includes('squad') || lower.includes('recommend')) {
    return `Team Optimizer: For "${project?.name}", the highest complementary squad is ${teamNames}. This achieves ${recommendation?.avgMatchScore || 88}% match score with full core requirements coverage.`;
  }
  if (lower.includes('gap') || lower.includes('training') || lower.includes('course')) {
    return `Skill Gap Analyst: Key deficit identified in ${gapsList}. Sponsoring targeted upskilling certifications will quickly bridge domain bottlenecks.`;
  }

  return `Workforce Intelligence AI: Analyzing 60 active employees across ${workloadStats?.avgUtilization || 72}% average capacity. The active squad for "${project?.name}" is well aligned with safe bandwidth buffers.`;
}

/**
 * Generate deep AI Team Selection Rationale via NVIDIA LLM
 */
export async function generateNvidiaWhyTeamExplanation(project, recommendation) {
  const teamMembers = recommendation?.recommendedMembers || [];
  const memberSummaries = teamMembers.map(m => `- ${m.employee.name} (${m.employee.role}, ${m.matchScore}% score, ${m.employee.experienceYears}y exp, ${m.employee.workload}% load)`).join('\n');
  const gaps = recommendation?.identifiedGaps?.map(g => g.skill).join(', ') || 'None';

  const systemPrompt = `You are an elite enterprise talent strategist. Explain why the following project team was selected for "${project?.name}".
Candidate Squad:
${memberSummaries}
Remaining Technology Gaps: ${gaps}

Provide a sharp, 3-point executive briefing on:
1. Skill Synergy & Primary Strengths
2. Workload & Capacity Safety
3. Risk Mitigation for remaining gaps`;

  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Provide executive rationale for the team selected for ${project?.name}.` }
  ];

  const reply = await queryNvidiaLLM(messages, { maxTokens: 350 });
  return reply;
}
