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
  TrendingUp,
  AlertTriangle,
  Users,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Award,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { askDronaHqAdvisor, DRONAHQ_WEBHOOK_URL } from '../../utils/dronaHqService';

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
  onViewEmployee,
  onNavigateTab
}) {
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastPrompt, setLastPrompt] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const chatScrollRef = useRef(null);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [threadId, setThreadId] = useState(null);

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

  const suggestedPrompts = [
    {
      label: 'Recommend Squad',
      prompt: `Recommend the optimal team for "${selectedProject?.name || 'current project'}" with skill match scores and capacity buffers.`,
      agentId: 'optimizer'
    },
    {
      label: 'Balance Overloaded Staff',
      prompt: 'Who are our top overloaded engineers and which movable tasks can we reallocate to underutilized staff?',
      agentId: 'balancer'
    },
    {
      label: 'Evaluate Skill Gaps',
      prompt: 'What are our most critical technology gaps across active projects and which training courses should we sponsor?',
      agentId: 'analyst'
    },
    {
      label: 'Staffing Health Check',
      prompt: 'Provide a strategic audit of our overall workforce utilization and identify any operational risks.',
      agentId: 'optimizer'
    }
  ];

  const handleSendMessage = async (textToSend = null, requestedAgentId = null) => {
    const query = textToSend || inputText;
    if (!query.trim() || isGenerating) return;

    setLastPrompt(query);

    // Three-Agent Orchestration Router
    const lower = query.toLowerCase();
    let activeAgentId = requestedAgentId;
    let agentDisplayName = 'AI Advisor';

    if (!activeAgentId) {
      if (lower.includes('balance') || lower.includes('overload') || lower.includes('rebalance') || lower.includes('workload')) {
        activeAgentId = 'balancer';
      } else if (lower.includes('team') || lower.includes('squad') || lower.includes('recommend') || lower.includes('assign')) {
        activeAgentId = 'optimizer';
      } else if (lower.includes('gap') || lower.includes('skill') || lower.includes('course') || lower.includes('training')) {
        activeAgentId = 'analyst';
      } else {
        activeAgentId = 'optimizer';
      }
    }

    if (activeAgentId === 'optimizer') agentDisplayName = 'Team Optimizer';
    else if (activeAgentId === 'balancer') agentDisplayName = 'Workforce Balancer';
    else if (activeAgentId === 'analyst') agentDisplayName = 'Project Analyst';

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
      const result = await askDronaHqAdvisor({
        prompt: query,
        threadId,
        agentId: activeAgentId,
        project: selectedProject,
        recommendation,
        workloadStats,
        skillGaps,
        history: messages
      });

      if (result.threadId) {
        setThreadId(result.threadId);
      }

      const responseText = result.text;

      // Detect structured data to render interactive cards
      let structuredData = null;
      if (lower.includes('squad') || lower.includes('recommend squad') || (lower.includes('team') && lower.includes('recommend'))) {
        structuredData = {
          type: 'squad',
          project: selectedProject,
          members: recommendation?.recommendedMembers || [],
          avgMatchScore: recommendation?.avgMatchScore || 85,
          gaps: recommendation?.identifiedGaps || []
        };
      } else if (lower.includes('balance') || lower.includes('overload') || lower.includes('reallocate') || lower.includes('rebalance')) {
        structuredData = {
          type: 'rebalance',
          topOverutilized: workloadStats?.topOverutilized || [],
          currentBalance: workloadStats?.currentBalance || 61,
          targetBalance: 86
        };
      } else if (lower.includes('skill gap') || lower.includes('evaluate skill') || (lower.includes('gap') && lower.includes('training'))) {
        structuredData = {
          type: 'skills',
          gaps: skillGaps.slice(0, 4)
        };
      } else if (lower.includes('health') || lower.includes('staffing health') || (lower.includes('audit') && lower.includes('utilization'))) {
        structuredData = {
          type: 'health',
          stats: workloadStats,
          skillGapsCount: skillGaps.length
        };
      }

      const assistantMsg = {
        id: Date.now() + 1,
        sender: 'assistant',
        agent: agentDisplayName,
        text: responseText,
        structuredData,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('DronaHQ AI query failed:', err);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'assistant',
          agent: 'System',
          isError: true,
          text: 'Unable to reach DronaHQ Agent webhook. Non-AI deterministic workforce tools remain fully operational.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearChat = () => {
    setShowClearConfirm(true);
  };

  const confirmClearChat = () => {
    setMessages([]);
    setShowClearConfirm(false);
  };

  return (
    <div className="ai-advisor-page">
      {/* Dedicated Chat Card */}
      <div className="ai-advisor-card">
        {/* Chat Top Header */}
        <div className="ai-advisor-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)'
              }}
            >
              <Bot size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a' }}>AI Advisor</span>
                <span
                  style={{
                    fontSize: '0.66rem',
                    fontWeight: '700',
                    color: '#0369a1',
                    backgroundColor: '#e0f2fe',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Connected to DronaHQ Agent Webhook"
                >
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0284c7' }}></span>
                  DronaHQ Agent
                </span>
              </div>
              <p style={{ fontSize: '0.76rem', color: '#64748b', margin: 0, marginTop: '1px' }}>
                Chat with your autonomous workforce intelligence copilot • Powered by DronaHQ
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
        <div ref={chatScrollRef} className="ai-advisor-conversation">
          {messages.length === 0 && !isGenerating && (
            <div className="ai-advisor-empty-state">
              <div className="ai-advisor-empty-icon">
                <Bot size={28} />
              </div>
              <h3 className="ai-advisor-empty-title">
                How can I help with your workforce?
              </h3>
              <p className="ai-advisor-empty-desc">
                Ask any question about team optimization, skill gaps, employee workloads, or project staffing. Powered by DronaHQ AI Agent webhook.
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
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    backgroundColor: msg.isError ? '#fef2f2' : '#eff6ff',
                    border: msg.isError ? '1px solid #fecaca' : '1px solid #bfdbfe',
                    color: msg.isError ? '#dc2626' : '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Bot size={18} />
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {msg.sender !== 'user' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0f172a' }}>
                      {msg.agent}
                    </span>
                    <span style={{ fontSize: '0.66rem', color: '#94a3b8' }}>
                      {msg.timestamp}
                    </span>
                    {!msg.isError && (
                      <span
                        style={{
                          fontSize: '0.62rem',
                          fontWeight: '700',
                          color: '#0369a1',
                          backgroundColor: '#e0f2fe',
                          padding: '1px 6px',
                          borderRadius: '9999px'
                        }}
                      >
                        DronaHQ Agent
                      </span>
                    )}
                  </div>
                )}

                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    fontSize: '0.86rem',
                    lineHeight: 1.55,
                    backgroundColor: msg.sender === 'user' ? '#1d4ed8' : (msg.isError ? '#fef2f2' : '#f8fafc'),
                    color: msg.sender === 'user' ? '#ffffff' : (msg.isError ? '#991b1b' : '#1e293b'),
                    border: msg.sender === 'user' ? 'none' : (msg.isError ? '1px solid #fecaca' : '1px solid #e2e8f0'),
                    boxShadow: msg.sender === 'user' ? '0 2px 8px rgba(29, 78, 216, 0.25)' : 'none',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {msg.text}

                  {msg.isError && (
                    <div style={{ marginTop: '10px' }}>
                      <button
                        onClick={() => handleSendMessage(lastPrompt)}
                        style={{
                          background: '#ffffff',
                          border: '1px solid #f87171',
                          color: '#b91c1c',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '0.74rem',
                          fontWeight: '600',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        <RefreshCw size={12} /> Retry Question
                      </button>
                    </div>
                  )}
                </div>

                {/* Structured Interactive Result Card: Squad */}
                {msg.structuredData?.type === 'squad' && (
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '14px 16px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#0f172a' }}>
                        Recommended Squad for "{msg.structuredData.project?.name || 'Project'}"
                      </span>
                      <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#15803d', backgroundColor: '#dcfce7', padding: '2px 8px', borderRadius: '9999px' }}>
                        {msg.structuredData.avgMatchScore}% Match Average
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px', marginBottom: '12px' }}>
                      {msg.structuredData.members.map((m, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '8px 10px',
                            backgroundColor: '#f8fafc',
                            borderRadius: '6px',
                            border: '1px solid #f1f5f9',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#0f172a' }}>
                              {m.employee.name}
                            </div>
                            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                              {m.employee.role}
                            </div>
                          </div>
                          <span style={{ fontSize: '0.74rem', fontWeight: '700', color: '#2563eb' }}>
                            {m.matchScore}%
                          </span>
                        </div>
                      ))}
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={onOpenWhyModal}
                        style={{
                          flex: 1,
                          padding: '7px 12px',
                          background: 'linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%)',
                          border: '1px solid #bfdbfe',
                          color: '#1d4ed8',
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
                        <Sparkles size={13} /> View Selection Rationale
                      </button>
                      <button
                        onClick={() => onNavigateTab && onNavigateTab('team-builder')}
                        style={{
                          padding: '7px 12px',
                          background: '#ffffff',
                          border: '1px solid #cbd5e1',
                          color: '#475569',
                          borderRadius: '6px',
                          fontSize: '0.76rem',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        <Users size={13} /> Team Builder
                      </button>
                    </div>
                  </div>
                )}

                {/* Structured Interactive Result Card: Rebalance */}
                {msg.structuredData?.type === 'rebalance' && (
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '14px 16px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#0f172a' }}>
                        Proposed Workload Rebalancing Plan
                      </span>
                      <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#059669', backgroundColor: '#ecfdf5', padding: '2px 8px', borderRadius: '9999px' }}>
                        Balance Index: {msg.structuredData.currentBalance}% → {msg.structuredData.targetBalance}% (+25%)
                      </span>
                    </div>

                    <div style={{ fontSize: '0.76rem', color: '#64748b', marginBottom: '10px' }}>
                      Reallocates 104 sprint hours from 3 overloaded leads (Divya Menon 125%, Ravi Shankar 120%, Anita Rao 115%) to verified peers with available bandwidth (Anita Rao 55%, Zoya Ansari 50%).
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={onOpenRebalanceModal}
                        style={{
                          flex: 1,
                          padding: '7px 12px',
                          background: '#ecfdf5',
                          border: '1px solid #a7f3d0',
                          color: '#065f46',
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
                        <Scale size={13} /> Launch Rebalance Simulator
                      </button>
                      <button
                        onClick={() => onNavigateTab && onNavigateTab('workload')}
                        style={{
                          padding: '7px 12px',
                          background: '#ffffff',
                          border: '1px solid #cbd5e1',
                          color: '#475569',
                          borderRadius: '6px',
                          fontSize: '0.76rem',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        <TrendingUp size={13} /> Workload Hub
                      </button>
                    </div>
                  </div>
                )}

                {/* Structured Interactive Result Card: Skill Gaps */}
                {msg.structuredData?.type === 'skills' && (
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '14px 16px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#0f172a' }}>
                        Top Priority Skill Deficits & Recommended Courses
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                      {msg.structuredData.gaps.map((g, idx) => (
                        <div
                          key={idx}
                          style={{
                            padding: '8px 10px',
                            backgroundColor: '#f8fafc',
                            borderRadius: '6px',
                            border: '1px solid #f1f5f9',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#0f172a' }}>
                              {g.skill}
                            </div>
                            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                              Recommended: {g.suggestedTraining || 'Certified Associate Track'}
                            </div>
                          </div>
                          <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#d97706', backgroundColor: '#fef3c7', padding: '2px 8px', borderRadius: '9999px' }}>
                            Deficit: {g.gap || 1}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => onNavigateTab && onNavigateTab('skills-training')}
                      style={{
                        width: '100%',
                        padding: '7px 12px',
                        background: '#eff6ff',
                        border: '1px solid #bfdbfe',
                        color: '#1d4ed8',
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
                      <BookOpen size={13} /> View All Skills & Training Courses
                    </button>
                  </div>
                )}

                {/* Structured Interactive Result Card: Health Check */}
                {msg.structuredData?.type === 'health' && (
                  <div
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '14px 16px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                    }}
                  >
                    <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>
                      Organizational Health & Utilization Snapshot
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '12px' }}>
                      <div style={{ padding: '8px', backgroundColor: '#f8fafc', borderRadius: '6px', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }}>30</div>
                        <div style={{ fontSize: '0.66rem', color: '#64748b' }}>Headcount</div>
                      </div>
                      <div style={{ padding: '8px', backgroundColor: '#f8fafc', borderRadius: '6px', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#2563eb' }}>
                          {msg.structuredData.stats?.avgUtilization || 72}%
                        </div>
                        <div style={{ fontSize: '0.66rem', color: '#64748b' }}>Utilization</div>
                      </div>
                      <div style={{ padding: '8px', backgroundColor: '#f8fafc', borderRadius: '6px', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#dc2626' }}>
                          {msg.structuredData.stats?.topOverutilized?.length || 3}
                        </div>
                        <div style={{ fontSize: '0.66rem', color: '#64748b' }}>Overloaded</div>
                      </div>
                      <div style={{ padding: '8px', backgroundColor: '#f8fafc', borderRadius: '6px', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#d97706' }}>
                          {msg.structuredData.skillGapsCount || 5}
                        </div>
                        <div style={{ fontSize: '0.66rem', color: '#64748b' }}>Deficits</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => onNavigateTab && onNavigateTab('overview')}
                        style={{
                          flex: 1,
                          padding: '7px 12px',
                          background: '#f8fafc',
                          border: '1px solid #cbd5e1',
                          color: '#334155',
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
                        <TrendingUp size={13} /> View Dashboard Overview
                      </button>
                    </div>
                  </div>
                )}

                {msg.sender === 'user' && (
                  <div style={{ textAlign: 'right', fontSize: '0.66rem', color: '#94a3b8' }}>
                    {msg.timestamp}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isGenerating && (
            <div style={{ display: 'flex', gap: '12px', alignSelf: 'flex-start', maxWidth: '85%' }}>
              <div
                style={{
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
                }}
              >
                <Bot size={18} />
              </div>
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontSize: '0.82rem',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  color: '#334155',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Loader2 size={16} className="spin-animation" color="#0284c7" />
                <span>DronaHQ Agent is processing query across workforce data...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Suggestions Bar */}
        <div className="ai-advisor-suggestions">
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: '700',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              whiteSpace: 'nowrap'
            }}
          >
            <Sparkles size={12} color="#4f46e5" />
            Suggested:
          </span>
          {suggestedPrompts.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(s.prompt, s.agentId)}
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
        <div className="ai-advisor-composer">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <input
              type="text"
              placeholder={isGenerating ? "Connecting to DronaHQ Agent..." : "Ask AI Advisor anything..."}
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

      {/* Clear Chat Confirmation Modal */}
      {showClearConfirm && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              width: '90%',
              maxWidth: '400px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
            }}
          >
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
              Clear Conversation History?
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5, marginBottom: '20px' }}>
              This will reset the active chat session. All previous messages and generated recommendations will be cleared.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                className="btn-secondary"
                onClick={() => setShowClearConfirm(false)}
                style={{ padding: '8px 16px', fontSize: '0.84rem' }}
              >
                Cancel
              </button>
              <button
                onClick={confirmClearChat}
                style={{
                  backgroundColor: '#dc2626',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '0.84rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Clear History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
