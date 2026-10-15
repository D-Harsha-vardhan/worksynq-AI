import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Send,
  UserCheck,
  Zap,
  Scale,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  X,
  Loader2,
  Cpu
} from 'lucide-react';
import { askNvidiaAssistant } from '../utils/nvidiaAiService';

export default function AiAssistantPanel({
  selectedProject,
  recommendation,
  workloadStats,
  skillGaps = [],
  onSelectProject,
  onOpenWhyModal,
  onOpenRebalanceModal,
  onOpenTrainingModal,
  onClose
}) {
  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'system',
      text: "Hello! I'm your Workforce Intelligence Assistant powered by NVIDIA NIM. Ask me about optimal project squads, workload rebalancing, skill bottlenecks, or training pathways."
    }
  ]);

  const team = recommendation?.recommendedMembers || [];
  const gaps = recommendation?.identifiedGaps || [];
  const topOverloaded = workloadStats?.topOverutilized || [];

  const agents = [
    {
      id: 'analyst',
      name: 'Project Analyst',
      desc: 'Parses requirements and checks eligibility.',
      colorClass: 'agent-icon-blue',
      icon: Zap,
      samplePrompt: `Analyze requirement coverage for ${selectedProject?.name || 'current project'}`
    },
    {
      id: 'optimizer',
      name: 'Team Optimizer',
      desc: 'Selects complementary team composition.',
      colorClass: 'agent-icon-purple',
      icon: UserCheck,
      samplePrompt: `Recommend optimal complementary team for ${selectedProject?.name || 'current project'}`
    },
    {
      id: 'balancer',
      name: 'Workforce Balancer',
      desc: 'Finds task reallocations and improves utilization.',
      colorClass: 'agent-icon-emerald',
      icon: Scale,
      samplePrompt: 'Simulate reallocating overloaded engineers'
    }
  ];

  const handleSend = async (textToSend = null, agentId = 'optimizer') => {
    const text = textToSend || inputText;
    if (!text.trim() || isGenerating) return;

    // Add user message
    const userMsg = { id: Date.now(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsGenerating(true);

    try {
      const replyText = await askNvidiaAssistant({
        prompt: text,
        agentId,
        project: selectedProject,
        recommendation,
        workloadStats,
        skillGaps
      });

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'assistant',
          text: replyText,
          isNvidia: true
        }
      ]);
    } catch (err) {
      console.error('NVIDIA AI query error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="ai-sidebar" style={{ height: '100%', width: '100%', borderLeft: 'none', position: 'static' }}>
      {/* Header */}
      <div className="ai-header">
        <div className="ai-header-left">
          <div className="ai-icon-sparkle">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="ai-title">AI Assistant</div>
            <div style={{ fontSize: '0.66rem', color: '#64748b' }}>NVIDIA NIM Microservice</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            className="ai-status-pill"
            style={{
              backgroundColor: 'rgba(118, 185, 0, 0.12)',
              color: '#365f00',
              border: '1px solid rgba(118, 185, 0, 0.4)'
            }}
            title="Connected to NVIDIA NIM API (DiffusionGemma-26B)"
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#76b900' }}></span>
            NVIDIA NIM • Live
          </span>
          {onClose && (
            <button
              className="icon-btn"
              style={{ width: '28px', height: '28px', background: '#f1f5f9', border: '1px solid #e2e8f0' }}
              onClick={onClose}
              title="Close AI Assistant"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="ai-body">
        {/* Intro greeting bubble */}
        <div className="ai-intro-bubble">
          {messages[0].text}
        </div>

        {/* 3 Online Agents List */}
        <div className="agents-list">
          {agents.map(ag => {
            const Icon = ag.icon;
            return (
              <div
                key={ag.id}
                className="agent-card"
                onClick={() => handleSend(ag.samplePrompt, ag.id)}
                title={`Click to ask ${ag.name} (Powered by NVIDIA NIM)`}
                style={{ opacity: isGenerating ? 0.6 : 1, pointerEvents: isGenerating ? 'none' : 'auto' }}
              >
                <div className={`agent-avatar-icon ${ag.colorClass}`}>
                  <Icon size={16} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="agent-name">{ag.name}</div>
                  <div className="agent-desc">{ag.desc}</div>
                </div>
                <ArrowRight size={13} color="#94a3b8" />
              </div>
            );
          })}
        </div>

        {/* Dynamic Assistant Response */}
        <div className="ai-response-box">
          <div className="ai-response-header">
            <Bot size={14} color="#4f46e5" />
            <span>Active Project Recommendation</span>
          </div>
          <div className="ai-response-text">
            For <strong>{selectedProject?.name || 'Active Project'}</strong>, I recommend a team of {team.length} members with <strong>{recommendation?.avgMatchScore || 85}%</strong> average match score.
            {gaps.length > 0 ? (
              <span> There are <strong>{gaps.length} skill gap(s)</strong> ({gaps.map(g => g.skill).join(', ')}).</span>
            ) : (
              <span> All required skills are fully covered.</span>
            )}
            {topOverloaded.length > 0 && (
              <span> Reallocating tasks from {topOverloaded[0]?.name} ({topOverloaded[0]?.workload}%) will protect delivery velocity.</span>
            )}
          </div>
          <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span
              className="card-action-link"
              onClick={onOpenWhyModal}
              style={{ fontSize: '0.74rem' }}
            >
              View Full Recommendations →
            </span>
          </div>
        </div>

        {/* Conversation Stream */}
        {messages.slice(1).map(msg => (
          <div
            key={msg.id}
            style={{
              padding: '10px 12px',
              borderRadius: '8px',
              fontSize: '0.76rem',
              lineHeight: 1.45,
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === 'user' ? '#eff6ff' : '#f8fafc',
              border: `1px solid ${msg.sender === 'user' ? '#bfdbfe' : '#e2e8f0'}`,
              color: msg.sender === 'user' ? '#1e3a8a' : '#0f172a',
              maxWidth: '92%'
            }}
          >
            {msg.sender === 'user' ? (
              <div><strong>You:</strong> {msg.text}</div>
            ) : (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '700', marginBottom: '4px', color: '#166534' }}>
                  <Cpu size={12} color="#76b900" />
                  <span>NVIDIA NIM Copilot:</span>
                  <span style={{ fontSize: '0.62rem', backgroundColor: 'rgba(118, 185, 0, 0.15)', color: '#3f6c00', padding: '1px 5px', borderRadius: '4px' }}>
                    DiffusionGemma
                  </span>
                </div>
                <div>{msg.text}</div>
              </div>
            )}
          </div>
        ))}

        {/* Loading Indicator */}
        {isGenerating && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.76rem',
              backgroundColor: '#f8fafc',
              border: '1px solid #cbd5e1',
              color: '#334155',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              maxWidth: '90%',
              alignSelf: 'flex-start'
            }}
          >
            <Loader2 size={14} className="spin-animation" color="#76b900" />
            <span>NVIDIA NIM is reasoning...</span>
          </div>
        )}
      </div>

      {/* Footer Chat Input */}
      <div className="ai-footer-input">
        <form
          className="ai-input-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            type="text"
            className="ai-text-input"
            placeholder={isGenerating ? "NVIDIA AI is thinking..." : "Ask a question..."}
            value={inputText}
            disabled={isGenerating}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit" className="ai-send-btn" title="Send query" disabled={isGenerating}>
            {isGenerating ? <Loader2 size={13} className="spin-animation" /> : <Send size={13} />}
          </button>
        </form>
      </div>
    </div>
  );
}
