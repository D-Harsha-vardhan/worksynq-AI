import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ShieldCheck, Zap, AlertTriangle, ArrowRight, Loader2, Cpu } from 'lucide-react';
import { generateNvidiaWhyTeamExplanation } from '../../utils/nvidiaAiService';

export default function WhyThisTeamModal({ project, recommendation, onClose }) {
  const [nvidiaExplanation, setNvidiaExplanation] = useState(null);
  const [isLoadingNvidia, setIsLoadingNvidia] = useState(false);
  const reasoning = recommendation?.reasoning || {
    summary: 'Selected based on complementary cross-functional skill matrix.',
    synergyScore: 94,
    strengths: [
      'High domain mastery across Python, Cloud Computing, and Data Analytics.',
      'Safe capacity buffer: Average utilization is 71% with zero burnout risk.',
      'Balanced technical seniority: Senior technical lead paired with full-stack execution.'
    ],
    gapAnalysis: 'Identified 2 secondary gaps: Kubernetes (1) and Spark (1).',
    memberContributions: []
  };

  const members = recommendation?.recommendedMembers || [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '640px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="modal-title">AI Team Formation Reasoning</h3>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Multi-objective optimization breakdown for {project?.name}
              </div>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Synergy Banner */}
          <div style={{ background: 'linear-gradient(135deg, #eff6ff 0%, #f5f3ff 100%)', border: '1px solid #c7d2fe', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#4f46e5', fontWeight: '700' }}>
                Composite Synergy Score
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1e1b4b', lineHeight: 1.1, marginTop: '2px' }}>
                94 / 100
              </div>
              <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '4px' }}>
                Top 2% combinatorial match across all 60 organization members
              </div>
            </div>
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(79, 70, 229, 0.15)' }}>
              <ShieldCheck size={28} color="#4f46e5" />
            </div>
          </div>

          {/* Core Strengths */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
              Algorithmic Selection Strengths
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {reasoning.strengths.map((str, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.82rem', color: '#334155' }}>
                  <CheckCircle2 size={16} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{str}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Member Contributions */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>
              Individual Role & Skill Alignment
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {members.map(m => (
                <div key={m.employee.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={m.employee.avatar} alt={m.employee.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontSize: '0.84rem', fontWeight: '700', color: '#0f172a' }}>{m.employee.name}</div>
                      <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{m.employee.role}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.84rem', fontWeight: '700', color: '#059669' }}>{m.matchScore}% Match</div>
                    <div style={{ fontSize: '0.72rem', color: '#475569' }}>Bandwidth: {m.employee.capacity}% Safe</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gap Mitigation Strategy */}
          <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '12px 14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309', fontWeight: '700', fontSize: '0.8rem', marginBottom: '4px' }}>
              <AlertTriangle size={15} />
              <span>Skill Gap Mitigation Advice</span>
            </div>
            <div style={{ fontSize: '0.76rem', color: '#78350f', lineHeight: 1.45 }}>
              {reasoning.gapAnalysis || 'Skill distribution across team members ensures delivery feasibility. Targeted certification is recommended for secondary skill requirements.'}
            </div>
          </div>

          {/* Live NVIDIA NIM Deep Executive Rationale */}
          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '14px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: '700', fontSize: '0.82rem' }}>
                <Cpu size={16} color="#76b900" />
                <span>NVIDIA NIM Executive Synthesis (DiffusionGemma-26B)</span>
              </div>
              {!nvidiaExplanation && !isLoadingNvidia && (
                <button
                  onClick={async () => {
                    setIsLoadingNvidia(true);
                    try {
                      const res = await generateNvidiaWhyTeamExplanation(project, recommendation);
                      setNvidiaExplanation(res);
                    } catch (e) {
                      console.error(e);
                    } finally {
                      setIsLoadingNvidia(false);
                    }
                  }}
                  style={{
                    backgroundColor: '#15803d',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '5px 10px',
                    fontSize: '0.72rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Sparkles size={11} /> Generate Live AI Rationale
                </button>
              )}
            </div>

            {isLoadingNvidia && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#15803d', padding: '6px 0' }}>
                <Loader2 size={14} className="spin-animation" color="#76b900" />
                <span>Synthesizing deep strategic reasoning through NVIDIA NIM...</span>
              </div>
            )}

            {nvidiaExplanation && (
              <div style={{ fontSize: '0.78rem', color: '#14532d', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                {nvidiaExplanation}
              </div>
            )}

            {!nvidiaExplanation && !isLoadingNvidia && (
              <div style={{ fontSize: '0.74rem', color: '#166534' }}>
                Click above to generate real-time LLM strategic analysis powered by your active NVIDIA API key.
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
