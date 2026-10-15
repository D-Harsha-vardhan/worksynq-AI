// DronaHQ AI Agent Webhook Service
// Connected to DronaHQ Agent Webhook: https://agents-backend.dronahq.com/webhook/3f59dc3f-e318-48af-82f6-9668cf35e05a
// API Key: sk_i30YnObDjuZIFRj0JPF9r35Xi6o00TFX

import { askNvidiaAssistant } from './nvidiaAiService';

export const DRONAHQ_WEBHOOK_URL = 'https://agents-backend.dronahq.com/webhook/3f59dc3f-e318-48af-82f6-9668cf35e05a';
export const DRONAHQ_API_KEY = 'sk_i30YnObDjuZIFRj0JPF9r35Xi6o00TFX';

const PRIMARY_PROXY_ENDPOINT = '/api/dronahq/webhook/3f59dc3f-e318-48af-82f6-9668cf35e05a';
const DIRECT_ENDPOINT = DRONAHQ_WEBHOOK_URL;

/**
 * Sends a question or instruction to DronaHQ AI Agent webhook and extracts the answer.
 * Gracefully handles background runs, credits exhausted, and network fallbacks.
 */
export async function askDronaHqAdvisor({
  prompt,
  threadId = null,
  agentId = 'optimizer',
  project = null,
  recommendation = null,
  workloadStats = null,
  skillGaps = [],
  history = []
}) {
  if (!prompt || !prompt.trim()) {
    return {
      text: 'Please provide a question or topic for the AI Advisor.',
      source: 'local'
    };
  }

  const payload = {
    message: prompt,
    prompt: prompt,
    query: prompt,
    question: prompt,
    input: prompt,
    user_input: prompt,
    thread_id: threadId || undefined,
    context: {
      application: 'Workforce Intelligence — Smart Talent Planning & Workforce Optimization',
      selectedProject: project ? { id: project.id, name: project.name, budget: project.budget, deadline: project.deadline } : null,
      timestamp: new Date().toISOString()
    }
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${DRONAHQ_API_KEY}`,
    'api-key': DRONAHQ_API_KEY,
    'x-api-key': DRONAHQ_API_KEY
  };

  let responseData = null;
  let responseStatus = null;
  let connectionSuccessful = false;
  let isCreditsExhausted = false;

  // 1. Try local dev proxy endpoint first (to avoid browser CORS issues)
  try {
    const res = await fetch(PRIMARY_PROXY_ENDPOINT, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });
    responseStatus = res.status;
    responseData = await res.json().catch(() => null);
    connectionSuccessful = true;
  } catch (proxyError) {
    console.warn('DronaHQ proxy endpoint request failed, attempting direct connection...', proxyError);
  }

  // 2. Fallback to direct endpoint if proxy didn't connect
  if (!connectionSuccessful) {
    try {
      const res = await fetch(DIRECT_ENDPOINT, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      responseStatus = res.status;
      responseData = await res.json().catch(() => null);
      connectionSuccessful = true;
    } catch (directError) {
      console.warn('DronaHQ direct endpoint request failed:', directError);
    }
  }

  // Check if credits are exhausted
  if (
    responseStatus === 402 ||
    responseData?.detail?.type === 'credits_exhausted' ||
    (typeof responseData?.detail?.message === 'string' && responseData.detail.message.toLowerCase().includes('credit balance'))
  ) {
    isCreditsExhausted = true;
  }

  // If DronaHQ returned a successful response with direct text content:
  if (responseData && (responseStatus >= 200 && responseStatus < 300)) {
    const newThreadId = responseData.thread_id || threadId;
    
    // Look for content / answer fields in the returned payload
    const directText =
      responseData.response ||
      responseData.answer ||
      responseData.output ||
      responseData.result ||
      responseData.data?.text ||
      responseData.data?.response ||
      responseData.text ||
      responseData.content;

    if (directText && typeof directText === 'string' && directText.trim()) {
      return {
        text: directText.trim(),
        threadId: newThreadId,
        runId: responseData.run_id,
        source: 'dronahq-direct',
        raw: responseData
      };
    }

    // If DronaHQ returned background run status:
    // e.g. { success: true, thread_id: "...", run_id: "...", message: "Agent run started in background..." }
    if (responseData.success && responseData.message) {
      // Generate domain answer to accompany the DronaHQ run confirmation
      let smartAnswer = '';
      try {
        smartAnswer = await askNvidiaAssistant({
          prompt,
          agentId,
          project,
          recommendation,
          workloadStats,
          skillGaps,
          history
        });
      } catch (err) {
        console.warn('Secondary fallback error:', err);
      }

      const formattedResponse = smartAnswer
        ? `**[DronaHQ Agent Webhook]** Run initiated successfully on thread \`${newThreadId || 'active'}\`.\n\n${smartAnswer}`
        : `**[DronaHQ Agent Webhook]** ${responseData.message}\n\n• **Thread ID**: \`${newThreadId || 'N/A'}\`\n• **Run ID**: \`${responseData.run_id || 'N/A'}\``;

      return {
        text: formattedResponse,
        threadId: newThreadId,
        runId: responseData.run_id,
        source: 'dronahq-agent',
        raw: responseData
      };
    }
  }

  // If DronaHQ credit balance is exhausted:
  if (isCreditsExhausted) {
    let domainAnswer = '';
    try {
      domainAnswer = await askNvidiaAssistant({
        prompt,
        agentId,
        project,
        recommendation,
        workloadStats,
        skillGaps,
        history
      });
    } catch (err) {
      console.warn('Secondary fallback error:', err);
    }

    const exhaustedMsg = `> **DronaHQ Agent Webhook Notice**\n> Endpoint: \`agents-backend.dronahq.com/webhook/3f59dc3f...\`\n> **Status:** HTTP 402 — *Your DronaHQ credit balance has been exhausted.*\n\n${domainAnswer || 'Your question was processed, but live credit recharge is required in DronaHQ to continue remote LLM streaming.'}`;

    return {
      text: exhaustedMsg,
      threadId,
      source: 'dronahq-credits-exhausted',
      isCreditsExhausted: true,
      raw: responseData
    };
  }

  // If DronaHQ could not be reached:
  let fallbackText = '';
  try {
    fallbackText = await askNvidiaAssistant({
      prompt,
      agentId,
      project,
      recommendation,
      workloadStats,
      skillGaps,
      history
    });
  } catch (err) {
    fallbackText = 'Workforce Intelligence Advisor is operating in local deterministic mode. Please verify network connectivity to DronaHQ.';
  }

  return {
    text: `> **DronaHQ Agent Connection Note**\n> DronaHQ agent webhook responded with status ${responseStatus || 'unavailable'}.\n\n${fallbackText}`,
    threadId,
    source: 'dronahq-fallback',
    raw: responseData
  };
}
