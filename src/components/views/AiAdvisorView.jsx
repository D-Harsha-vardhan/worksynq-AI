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
    <div className="ai-advisor-container" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Dedicated Chat Card */}
      <div className="card" style={{ padding: 0, display: 'flex', flexDirection: 'column', flex: 1, height: '100%', overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', backgroundColor: '#ffffff' }}>
        
        {/* Chat Top Header */}
        <div style={{
          padding: '14px 22px',
          borderBottom: '1px solid var(--border-light)',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)'
            }}>
              <Bot size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a' }}>AI Advisor</span>
                <span style={{
                  fontSize: '0.66rem',
                  fontWeight: '700',
                  color: '#15803d',
                  backgroundColor: '#dcfce7',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16a34a' }}></span>
                  NVIDIA NIM
                </span>
              </div>
              <p style={{ fontSize: '0.76rem', color: '#64748b', margin: 0, marginTop: '1px' }}>
                Chat with your autonomous workforce intelligence copilot
              </p>
            </div>
          </div>

          <button
            onClick={handleClearChat}
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              color: '#64748b',
              padding: '7px 13px',
              borderRadius: '7px',
              fontSize: '0.78rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            title="Reset conversation"
          >
            <Trash2 size={13} />
            <span>Clear Chat</span>
          </button>
        </div>

        {/* Chat Messages Stream */}
        <div
          ref={chatScrollRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            backgroundColor: '#ffffff'
          }}
        >
          {messages.length === 0 && !isGenerating && (
            <div style={{
              margin: 'auto',
              textAlign: 'center',
              padding: '60px 20px',
              maxWidth: '480px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%)',
                border: '1px solid #bfdbfe',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.15)'
              }}>
                <Bot size={30} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                How can I help with your workforce?
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                Ask any question about team optimization, skill gaps, employee workloads, or project staffing. Powered by real organization data and NVIDIA NIM.
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
                  fontSize: '0.86rem',
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
          padding: '10px 22px',
          backgroundColor: '#f8fafc',
          borderTop: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto'
        }}>
          <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
            <Sparkles size={12} color="#4f46e5" />
            Suggested:
          </span>
          {suggestedPrompts.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(s.prompt, s.agent)}
              disabled={isGenerating}
              style={{
                padding: '5px 12px',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                fontSize: '0.75rem',
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
        <div style={{ padding: '16px 22px', borderTop: '1px solid var(--border-light)', backgroundColor: '#ffffff' }}>
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
                padding: '12px 18px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.88rem',
                outline: 'none',
                backgroundColor: '#ffffff',
                color: '#0f172a'
              }}
            />
            <button
              type="submit"
              disabled={isGenerating || !inputText.trim()}
              style={{
                padding: '12px 22px',
                backgroundColor: isGenerating || !inputText.trim() ? '#94a3b8' : '#1d4ed8',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.88rem',
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
    </div>
  );
}
