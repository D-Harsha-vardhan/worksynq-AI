import React from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';

export default function WorkloadAllocationCard({ stats, onSelectEmployee, onOpenRebalance }) {
  const topOverloaded = stats?.topOverutilized || [];

  const size = 110;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const breakdown = stats?.breakdown || {
    fullyUtilized: { count: 39, percent: 65 },
    overutilized: { count: 3, percent: 5 },
    underutilized: { count: 14, percent: 23 },
    atCapacity: { count: 4, percent: 7 }
  };

  const balancePct = stats?.currentBalance || 72;

  const optimalRatio = (breakdown.fullyUtilized?.percent || 65) / 100;
  const overRatio = (breakdown.overutilized?.percent || 5) / 100;
  const underRatio = (breakdown.underutilized?.percent || 23) / 100;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Workload Allocation</h3>
        <span className="card-action-link" onClick={onOpenRebalance}>
          View Details
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#f1f5f9"
              strokeWidth={strokeWidth}
            />
            {/* Optimal */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#0ea5e9"
              strokeWidth={strokeWidth}
              strokeDasharray={`${optimalRatio * circumference} ${circumference}`}
              strokeDashoffset={0}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
            {/* Overutilized */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#ef4444"
              strokeWidth={strokeWidth}
              strokeDasharray={`${overRatio * circumference} ${circumference}`}
              strokeDashoffset={`${-optimalRatio * circumference}`}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
            {/* Underutilized */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#f59e0b"
              strokeWidth={strokeWidth}
              strokeDasharray={`${underRatio * circumference} ${circumference}`}
              strokeDashoffset={`${-(optimalRatio + overRatio) * circumference}`}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </svg>
          <div className="donut-center-label">
            <div className="donut-number" style={{ fontSize: '1.25rem' }}>{balancePct}%</div>
            <div className="donut-sub" style={{ fontSize: '0.62rem' }}>Balanced</div>
          </div>
        </div>

        {/* Dynamic Legend */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', flex: 1, fontSize: '0.74rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <span className="legend-color-dot" style={{ backgroundColor: '#ef4444' }}></span>
              Overutilized
            </span>
            <span style={{ fontWeight: '600' }}>
              {breakdown.overutilized?.count || 0} ({breakdown.overutilized?.percent || 0}%)
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <span className="legend-color-dot" style={{ backgroundColor: '#0ea5e9' }}></span>
              Optimal
            </span>
            <span style={{ fontWeight: '600' }}>
              {breakdown.fullyUtilized?.count || 0} ({breakdown.fullyUtilized?.percent || 0}%)
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <span className="legend-color-dot" style={{ backgroundColor: '#f59e0b' }}></span>
              Underutilized
            </span>
            <span style={{ fontWeight: '600' }}>
              {breakdown.underutilized?.count || 0} ({breakdown.underutilized?.percent || 0}%)
            </span>
          </div>
        </div>
      </div>

      {/* Real Top Overutilized Employees */}
      <div className="overutilized-list">
        <div style={{ fontSize: '0.74rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Top Overutilized Employees
        </div>
        {topOverloaded.slice(0, 3).map(emp => (
          <div
            key={emp.id}
            className="overutilized-item"
            style={{ cursor: 'pointer' }}
            onClick={() => onSelectEmployee && onSelectEmployee(emp)}
          >
            <div className="overutilized-emp">
              <img
                src={emp.avatar}
                alt={emp.name}
                style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <span style={{ fontWeight: '600', color: '#0f172a' }}>{emp.name}</span>
            </div>
            <span className="overutilized-pct">{emp.workload}%</span>
          </div>
        ))}
        {topOverloaded.length === 0 && (
          <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '600', padding: '6px 0' }}>
            ✓ Zero overutilized employees detected.
          </div>
        )}
      </div>
    </div>
  );
}
