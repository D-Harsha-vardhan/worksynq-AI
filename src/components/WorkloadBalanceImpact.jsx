import React from 'react';
import { Sparkles, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function WorkloadBalanceImpact({
  currentBalance = 68,
  projectedBalance = 86,
  onOpenRebalanceModal,
  isRebalanced = false
}) {
  // SVG Donut params
  const size = 80;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="card balance-impact-card">
      <div className="card-header" style={{ marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <h3 className="card-title">Workload Balance Impact</h3>
          <HelpCircle size={14} color="#94a3b8" />
        </div>
      </div>

      <div className="balance-circles-row">
        {/* Current Balance */}
        <div className="balance-circle-item">
          <div className="balance-circle-label">Current Balance</div>
          <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke="#f1f5f9"
                strokeWidth={strokeWidth}
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke="#f59e0b"
                strokeWidth={strokeWidth}
                strokeDasharray={`${(currentBalance / 100) * circumference} ${circumference}`}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            </svg>
            <div className="donut-center-label">
              <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a' }}>
                {currentBalance}%
              </span>
            </div>
          </div>
        </div>

        {/* Arrow transition */}
        <div style={{ color: '#94a3b8' }}>
          <ArrowRight size={20} />
        </div>

        {/* After Reallocation */}
        <div className="balance-circle-item">
          <div className="balance-circle-label">After Reallocation</div>
          <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke="#f1f5f9"
                strokeWidth={strokeWidth}
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke="#10b981"
                strokeWidth={strokeWidth}
                strokeDasharray={`${(projectedBalance / 100) * circumference} ${circumference}`}
                strokeLinecap="round"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            </svg>
            <div className="donut-center-label">
              <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#059669' }}>
                {projectedBalance}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action / Suggestion Pill */}
      <div
        className="balance-pill-badge"
        style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
        onClick={onOpenRebalanceModal}
        title="Open task reallocation simulator"
      >
        <Sparkles size={16} color="#059669" style={{ flexShrink: 0 }} />
        <span style={{ flex: 1, fontSize: '0.74rem' }}>
          {isRebalanced ? 'Rebalancing applied (+18% balance)' : 'Reassignment of workload in suggestion'}
        </span>
        <ArrowRight size={14} color="#059669" />
      </div>
    </div>
  );
}
