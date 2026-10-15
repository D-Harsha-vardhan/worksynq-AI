import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  Zap,
  UserCheck,
  Scale,
  Cpu,
  Loader2,
  Trash2,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  Users,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { askNvidiaAssistant } from '../../utils/nvidiaAiService';

export default function AiAdvisorView({
  projects = [],
  selectedProject,
  setSelectedProject,
  employees = [],
  recommendation,
  workloadStats,
  skillGaps = [],
  onOpenRebalanceModal,
  onOpenWhyModal,
  onViewEmployee
}) {
  const [selectedAgent, setSelectedAgent] = useState('optimizer'); // 'general', 'analyst', 'optimizer', 'balancer'
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const chatScrollRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([]);

  const scrollToBottom = () => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isGenerating]);

  const agents = [
    {
      id: 'optimizer',
      name: 'Team Optimizer',
      desc: 'Combinatorial squad selection & synergy',
      icon: UserCheck,
      color: '#4f46e5',
      bgColor: '#eef2ff'
    },
    {
      id: 'analyst',
      name: 'Project Analyst',
      desc: 'Requirements coverage & eligibility',
      icon: Zap,
      color: '#0284c7',
      bgColor: '#f0f9ff'
    },
    {
      id: 'balancer',
      name: 'Workforce Balancer',
      desc: 'Reallocation & burnout prevention',
      icon: Scale,
      color: '#10b981',
      bgColor: '#ecfdf5'
    },
    {
      id: 'general',
      name: 'Executive Strategist',
      desc: 'Macro talent & capacity planning',
      icon: Bot,
      color: '#7c3aed',
      bgColor: '#f5f3ff'
    }
  ];

  const suggestedPrompts = [
    {
      label: 'Recommend Squad',
      prompt: `Recommend the optimal team for "${selectedProject?.name || 'current project'}" with skill match scores and capacity buffers.`,
      agent: 'optimizer'
    },
    {
      label: 'Balance Overloaded Staff',
      prompt: 'Who are our top overloaded engineers and which movable tasks can we reallocate to underutilized staff?',
      agent: 'balancer'
    },
    {
      label: 'Evaluate Skill Gaps',
      prompt: 'What are our most critical technology gaps across active projects and which training courses should we sponsor?',
      agent: 'analyst'
    },
    {
      label: 'Staffing Health Check',
      prompt: 'Provide a strategic audit of our overall workforce utilization (71.9%) and identify any operational risks.',
      agent: 'general'
    }
  ];

  const handleSendMessage = async (textToSend = null, agentId = null) => {
    const query = textToSend || inputText;
    if (!query.trim() || isGenerating) return;

    const activeAgentId = agentId || selectedAgent;
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsGenerating(true);

    try {
      const responseText = await askNvidiaAssistant({
        prompt: query,
        agentId: activeAgentId,
        project: selectedProject,
        recommendation,
        workloadStats,
        skillGaps
      });

      const agentObj = agents.find(a => a.id === activeAgentId) || agents[0];

      const assistantMsg = {
        id: Date.now() + 1,
        sender: 'assistant',
        agent: 'AI Advisor',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('NVIDIA AI query failed:', err);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'assistant',
          agent: 'System',
          text: 'Encountered temporary network latency connecting to NVIDIA NIM. Please retry in a moment.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  return (
    <div className="ai-advisor-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a' }}>AI Advisor</h2>
          <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
            Chat directly with your autonomous workforce intelligence assistant powered by NVIDIA NIM.
          </p>
        </div>
        <button
          onClick={handleClearChat}
          style={{
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            color: '#475569',
            padding: '7px 14px',
            borderRadius: '8px',
            fontSize: '0.8rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          title="Reset conversation"
        >
          <Trash2 size={14} />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Main Dual-Column Canvas */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'start' }}>
        {/* Left Column: Chat Workspace */}
        <div className="card" style={{ padding: 0, display: 'flex', flexDirection: 'column', height: '680px', overflow: 'hidden' }}>
          {/* Chat Messages Stream */}
          <div
            ref={chatScrollRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              backgroundColor: '#ffffff'
            }}
          >
            {messages.length === 0 && !isGenerating && (
              <div style={{
                margin: 'auto',
                textAlign: 'center',
                padding: '40px 20px',
                maxWidth: '460px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%)',
                  border: '1px solid #bfdbfe',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.12)'
                }}>
                  <Bot size={26} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', marginBottom: '6px' }}>
                  AI Workforce Advisor
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.55, margin: 0 }}>
                  Ask any question about your organization's talent, team formations, skill gaps, or workload balancing.
                </p>
              </div>
            )}

            {messages.map(msg => (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%'
                }}
              >
                {msg.sender !== 'user' && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    backgroundColor: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Bot size={18} />
                  </div>
                )}

                <div>
                  {msg.sender !== 'user' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0f172a' }}>
                        {msg.agent}
                      </span>
                      <span style={{ fontSize: '0.66rem', color: '#94a3b8' }}>
                        {msg.timestamp}
                      </span>
                      <span style={{
                        fontSize: '0.62rem',
                        fontWeight: '700',
                        color: '#15803d',
                        backgroundColor: '#dcfce7',
                        padding: '1px 6px',
                        borderRadius: '9999px'
                      }}>
                        NVIDIA NIM
                      </span>
                    </div>
                  )}

                  <div style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    fontSize: '0.84rem',
                    lineHeight: 1.55,
                    backgroundColor: msg.sender === 'user' ? '#1d4ed8' : '#f8fafc',
                    color: msg.sender === 'user' ? '#ffffff' : '#1e293b',
                    border: msg.sender === 'user' ? 'none' : '1px solid #e2e8f0',
                    boxShadow: msg.sender === 'user' ? '0 2px 8px rgba(29, 78, 216, 0.25)' : 'none',
                    whiteSpace: 'pre-wrap'
                  }}>
                    {msg.text}
                  </div>

                  {msg.sender === 'user' && (
                    <div style={{ textAlign: 'right', fontSize: '0.66rem', color: '#94a3b8', marginTop: '3px' }}>
                      {msg.timestamp}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isGenerating && (
              <div style={{ display: 'flex', gap: '12px', alignSelf: 'flex-start', maxWidth: '85%' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  backgroundColor: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Bot size={18} />
                </div>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontSize: '0.82rem',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#334155',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Loader2 size={16} className="spin-animation" color="#76b900" />
                  <span>NVIDIA NIM is reasoning across real organization data...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Suggestions Bar */}
          <div style={{
            padding: '10px 18px',
            backgroundColor: '#f8fafc',
            borderTop: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto'
          }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={12} color="#4f46e5" />
              Suggested:
            </span>
            {suggestedPrompts.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(s.prompt, s.agent)}
                disabled={isGenerating}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  color: '#334155',
                  cursor: isGenerating ? 'not-allowed' : 'pointer',
                  whiteSpace: 'nowrap',
                  fontWeight: '500',
                  transition: 'all 0.15s ease'
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Bottom Chat Input Form */}
          <div style={{ padding: '14px 18px', borderTop: '1px solid var(--border-light)', backgroundColor: '#ffffff' }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <input
                type="text"
                placeholder={isGenerating ? "NVIDIA AI is thinking..." : "Ask AI Advisor anything..."}
                value={inputText}
                disabled={isGenerating}
                onChange={(e) => setInputText(e.target.value)}
                style={{
                  flex: 1,
                  padding: '11px 16px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.86rem',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                  color: '#0f172a'
                }}
              />
              <button
                type="submit"
                disabled={isGenerating || !inputText.trim()}
                style={{
                  padding: '11px 18px',
                  backgroundColor: isGenerating || !inputText.trim() ? '#94a3b8' : '#1d4ed8',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.86rem',
                  fontWeight: '600',
                  cursor: isGenerating || !inputText.trim() ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 6px rgba(29, 78, 216, 0.25)',
                  transition: 'all 0.15s ease'
                }}
              >
                {isGenerating ? <Loader2 size={16} className="spin-animation" /> : <Send size={16} />}
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Live Context & Knowledge Snapshot */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Card: Active Organization Context */}
          <div className="card" style={{ padding: '18px 20px' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={16} color="#2563eb" />
              Active Knowledge Snapshot
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Selected Project</span>
                <span style={{ fontWeight: '700', color: '#0f172a', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {selectedProject?.name}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Recommended Squad</span>
                <span style={{ fontWeight: '700', color: '#059669' }}>
                  {recommendation?.recommendedMembers?.length || 4} Members ({recommendation?.avgMatchScore || 88}%)
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Workforce Balance</span>
                <span style={{ fontWeight: '700', color: '#2563eb' }}>
                  {workloadStats?.currentBalance || 72}% Balanced
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', paddingBottom: '8px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Burnout Imbalances</span>
                <span style={{ fontWeight: '700', color: '#dc2626' }}>
                  {workloadStats?.topOverutilized?.length || 3} Overloaded
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: '#64748b' }}>Open Skill Gaps</span>
                <span style={{ fontWeight: '700', color: '#d97706' }}>
                  {skillGaps.length} Critical
                </span>
              </div>
            </div>

            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                className="btn-why-team"
                onClick={onOpenWhyModal}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Sparkles size={13} />
                <span>Explain Active Team Formation</span>
              </button>

              <button
                onClick={onOpenRebalanceModal}
                style={{
                  width: '100%',
                  padding: '7px 12px',
                  backgroundColor: '#ecfdf5',
                  color: '#065f46',
                  border: '1px solid #a7f3d0',
                  borderRadius: '6px',
                  fontSize: '0.76rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Scale size={13} />
                <span>Simulate Task Rebalancing</span>
              </button>
            </div>
          </div>

          {/* Card: AI Intelligence Engine */}
          <div className="card" style={{ padding: '18px 20px' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={16} color="#76b900" />
              AI Intelligence Engine
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Model</span>
                <span style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.76rem' }}>DiffusionGemma-26B</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Provider</span>
                <span style={{ fontWeight: '700', color: '#15803d', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} color="#15803d" /> NVIDIA NIM
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b' }}>Organization Data</span>
                <span style={{ fontWeight: '600', color: '#2563eb' }}>Real Datasets Connected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
