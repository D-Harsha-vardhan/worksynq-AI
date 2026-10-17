// Forwarding layer to DronaHQ Agent Service
// All AI agent executions run via DronaHQ Webhook without NVIDIA API dependencies

import {
  askDronaHqAdvisor,
  generateDronaHqWhyTeamExplanation,
  extractProjectFromDocumentWithDronaHq
} from './dronaHqService';

export const askNvidiaAssistant = askDronaHqAdvisor;
export const generateNvidiaWhyTeamExplanation = generateDronaHqWhyTeamExplanation;
export const extractProjectFromDocumentWithNvidia = extractProjectFromDocumentWithDronaHq;

export async function queryNvidiaLLM(messages, options = {}) {
  const prompt = Array.isArray(messages)
    ? messages.map(m => (typeof m.content === 'string' ? m.content : JSON.stringify(m.content))).join('\n')
    : String(messages || '');

  const res = await askDronaHqAdvisor({ prompt });
  return res?.text || res || '';
}
