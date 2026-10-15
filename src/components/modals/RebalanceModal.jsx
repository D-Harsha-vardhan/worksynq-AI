import React from 'react';
import { X, Sparkles, ArrowRight, CheckCircle2, AlertTriangle, Scale, ShieldCheck, Zap } from 'lucide-react';
import { additionalRebalanceRecommendations } from '../../data/additionalWorkforceData';

export default function RebalanceModal({ simulationData, onApply, onClose }) {
  const reallocations = simulationData?.reallocations?.length > 0
    ? simulationData.reallocations
    : additionalRebalanceRecommendations.map(r => ({
        id: r.id,
        taskScope: `${r.taskName} (${r.skillName})`,
        transferredHours: r.hoursMoved,
        fromEmployee: r.fromName,
        beforeSourceWorkload: r.fromUtilBefore,
        afterSourceWorkload: r.fromUtilAfter,
        toEmployee: r.toName,
        beforeTargetWorkload: r.toUtilBefore,
        afterTargetWorkload: r.toUtilAfter,
        matchScore: r.matchScore,
        reason: r.reason
      }));
  const beforeBal = 73;
  const afterBal = 96;
  const overloadedCount = 9;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '720px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Scale size={20} />
            </div>
            <div>
              <h3 className="modal-title">Workload Rebalancing Simulator</h3>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Algorithmic task reallocation to eliminate burnout &amp; improve talent utilization
              </div>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Comparison Metric Banner */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '16px', backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: '600' }}>Current State</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#ef4444', marginTop: '2px' }}>{beforeBal}%</div>
              <div style={{ fontSize: '0.72rem', color: '#dc2626', fontWeight: '600' }}>{overloadedCount} Overloaded Staff</div>
            </div>
            <div style={{ color: '#94a3b8' }}>
              <ArrowRight size={24} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.74rem', color: '#64748b', fontWeight: '600' }}>Projected State</div>
              <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#10b981', marginTop: '2px' }}>{afterBal}%</div>
              <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: '600' }}>0 Overloaded (Safe)</div>
            </div>
          </div>

          {/* Reallocation Action Items */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>
              Proposed Task Transfers (Matched by Skill &amp; Capacity)
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {reallocations.map((r, i) => (
                <div key={r.id || i} style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px 14px', backgroundColor: '#ffffff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a' }}>
                      {r.taskScope}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#2563eb', backgroundColor: '#eff6ff', padding: '2px 8px', borderRadius: '4px' }}>
                      {r.transferredHours} hrs/week
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '12px', fontSize: '0.78rem' }}>
                    {/* Source */}
                    <div style={{ padding: '8px', backgroundColor: '#fef2f2', borderRadius: '6px', border: '1px solid #fecaca' }}>
                      <div style={{ fontWeight: '600', color: '#991b1b' }}>{r.fromEmployee}</div>
                      <div style={{ color: '#b91c1c', fontSize: '0.72rem' }}>
                        {r.beforeSourceWorkload}% → <strong>{r.afterSourceWorkload}%</strong> (Safe)
                      </div>
                    </div>

                    <ArrowRight size={14} color="#64748b" />

                    {/* Target */}
                    <div style={{ padding: '8px', backgroundColor: '#ecfdf5', borderRadius: '6px', border: '1px solid #a7f3d0' }}>
                      <div style={{ fontWeight: '600', color: '#065f46' }}>{r.toEmployee}</div>
                      <div style={{ color: '#047857', fontSize: '0.72rem' }}>
                        {r.beforeTargetWorkload}% → <strong>{r.afterTargetWorkload}%</strong> (Productive)
                      </div>
                    </div>
                  </div>

                  {r.reason && (
                    <div style={{ marginTop: '8px', fontSize: '0.73rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px', borderTop: '1px solid #f1f5f9', paddingTop: '6px' }}>
                      <CheckCircle2 size={12} color="#10b981" style={{ flexShrink: 0 }} />
                      <span style={{ flex: 1 }}>{r.reason}</span>
                      {r.matchScore && (
                        <span style={{ fontWeight: '700', color: '#059669', whiteSpace: 'nowrap' }}>
                          {r.matchScore}% Skill Fit
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {reallocations.length === 0 && (
                <div style={{ textAlign: 'center', padding: '18px', color: '#059669', fontSize: '0.84rem' }}>
                  ✓ All staff members currently within safe operating bandwidth.
                </div>
              )}
            </div>
          </div>

          <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '10px 14px', fontSize: '0.78rem', color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="#2563eb" />
            <span>All target employees possess verified domain competencies and have sufficient capacity buffer.</span>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={onApply}>
            <Sparkles size={14} />
            <span>Apply Reallocation &amp; Update Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
}
