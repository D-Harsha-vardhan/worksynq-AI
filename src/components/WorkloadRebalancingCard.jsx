import React, { useState } from 'react';
import {
  Sparkles,
  Scale,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import {
  additionalWorkloadSummary,
  additionalRebalanceRecommendations,
  additionalEmployeeImpact
} from '../data/additionalWorkforceData';

export default function WorkloadRebalancingCard({
  stats,
  isRebalanced = false,
  onOpenRebalance,
  onSelectEmployee
}) {
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [localRebalanced, setLocalRebalanced] = useState(isRebalanced);

  // Sync with prop if changed from parent
  const activeRebalanced = isRebalanced || localRebalanced;

  // Use real summary metrics from Workforce_Additional_Datasets.xlsx
  const summary = activeRebalanced
    ? additionalWorkloadSummary.after
    : additionalWorkloadSummary.before;

  const overloadedPct = activeRebalanced ? 0 : 15;
  const underutilizedPct = activeRebalanced ? 2 : 12;
  const optimalPct = activeRebalanced ? 96 : 73;

  // Real staff impacts from dataset
  const overutilizedStaff = [
    {
      id: 'E028',
      name: 'Divya Menon',
      role: 'Senior Data Scientist',
      percentage: activeRebalanced ? '83%' : '125%',
      rawLoad: activeRebalanced ? 83 : 125,
      barWidth: activeRebalanced ? '45%' : '100%',
      movedHours: '-17 hrs',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'E001',
      name: 'Ravi Shankar',
      role: 'Lead Backend Engineer',
      percentage: activeRebalanced ? '70%' : '118%',
      rawLoad: activeRebalanced ? 70 : 118,
      barWidth: activeRebalanced ? '40%' : '94%',
      movedHours: '-19 hrs',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'E003',
      name: 'Karthik Subramanian',
      role: 'Lead Backend Engineer',
      percentage: activeRebalanced ? '78%' : '113%',
      rawLoad: activeRebalanced ? 78 : 113,
      barWidth: activeRebalanced ? '42%' : '90%',
      movedHours: '-14 hrs',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    }
  ];

  const underutilizedStaff = [
    {
      id: 'E036',
      name: 'Zoya Ansari',
      role: 'Data Engineer',
      percentage: activeRebalanced ? '85%' : '35%',
      rawLoad: activeRebalanced ? 85 : 35,
      barWidth: activeRebalanced ? '75%' : '35%',
      receivedHours: '+20 hrs',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'E002',
      name: 'Anita Rao',
      role: 'Senior Backend Engineer',
      percentage: activeRebalanced ? '68%' : '40%',
      rawLoad: activeRebalanced ? 68 : 40,
      barWidth: activeRebalanced ? '60%' : '40%',
      receivedHours: '+11 hrs',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'E017',
      name: 'Nikhil Agarwal',
      role: 'Senior DevOps Engineer',
      percentage: activeRebalanced ? '65%' : '30%',
      rawLoad: activeRebalanced ? 65 : 30,
      barWidth: activeRebalanced ? '58%' : '30%',
      receivedHours: '+14 hrs',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    }
  ];

  const handleToggleRebalance = () => {
    if (onOpenRebalance) {
      onOpenRebalance();
    } else {
      setLocalRebalanced(!localRebalanced);
    }
  };

  return (
    <div className="card workload-rebalance-card" style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column' }}>
      {/* Title & Live Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.08rem',
          fontWeight: '700',
          color: '#0f172a',
          margin: 0
        }}>
          Workload Rebalancing &amp; Allocation
        </h3>
        {activeRebalanced && (
          <span style={{
            fontSize: '0.68rem',
            fontWeight: '700',
            backgroundColor: '#ecfdf5',
            color: '#065f46',
            border: '1px solid #a7f3d0',
            padding: '2px 8px',
            borderRadius: '9999px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <ShieldCheck size={12} color="#059669" />
            104h Reallocated
          </span>
        )}
      </div>

      {/* Top Metric Label */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
      }}>
        <span style={{
          fontSize: '0.84rem',
          fontWeight: '700',
          color: activeRebalanced ? '#059669' : '#0f172a'
        }}>
          Overloaded ({overloadedPct}%)
        </span>
        <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
          {activeRebalanced ? '0 Burnout Bottlenecks' : '9 Engineers Overloaded'}
        </span>
      </div>

      {/* Multi-segment Progress Bar */}
      <div style={{
        display: 'flex',
        width: '100%',
        height: '10px',
        borderRadius: '9999px',
        overflow: 'hidden',
        backgroundColor: '#f1f5f9',
        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.06)'
      }}>
        <div
          style={{
            width: `${overloadedPct}%`,
            backgroundColor: '#ea580c',
            transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          title={`Overloaded: ${overloadedPct}%`}
        />
        <div
          style={{
            width: `${underutilizedPct}%`,
            backgroundColor: '#2563eb',
            marginLeft: '2px',
            transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          title={`Underutilized: ${underutilizedPct}%`}
        />
        <div
          style={{
            width: `${optimalPct}%`,
            backgroundColor: '#10b981',
            marginLeft: '2px',
            transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          title={`Optimal: ${optimalPct}%`}
        />
      </div>

      {/* Bottom Metric Labels */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '8px',
        fontSize: '0.82rem',
        color: '#334155',
        fontWeight: '600'
      }}>
        <span>Underutilized ({underutilizedPct}%)</span>
        <span style={{ color: activeRebalanced ? '#059669' : '#334155', fontWeight: activeRebalanced ? '700' : '600' }}>
          Optimal ({optimalPct}%)
        </span>
      </div>

      {/* Primary Auto-Rebalance Tasks Button */}
      <button
        className="btn-auto-rebalance"
        onClick={handleToggleRebalance}
        style={{
          width: '100%',
          marginTop: '16px',
          marginBottom: '16px',
          padding: '11px 18px',
          backgroundColor: activeRebalanced ? '#059669' : '#1d4ed8',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '0.9rem',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          boxShadow: activeRebalanced
            ? '0 2px 8px rgba(5, 150, 105, 0.28)'
            : '0 2px 8px rgba(29, 78, 216, 0.28)',
          transition: 'all 0.18s ease'
        }}
        title="Execute intelligent task reallocation simulation"
      >
        {activeRebalanced ? (
          <>
            <CheckCircle2 size={16} />
            <span>✓ Rebalance Applied (104h Shifted)</span>
          </>
        ) : (
          <>
            <span>Auto-Rebalance Tasks</span>
            <span style={{ fontSize: '1rem', lineHeight: 1 }}>✨</span>
          </>
        )}
      </button>

      {/* Over-utilized staff section */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.82rem',
          fontWeight: '700',
          color: '#0f172a',
          marginBottom: '8px'
        }}>
          <span>Over-utilized staff</span>
          <span style={{ fontSize: '0.72rem', color: activeRebalanced ? '#059669' : '#ea580c', fontWeight: '600' }}>
            {activeRebalanced ? 'Protected from Burnout' : 'At Risk (>100% Load)'}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {overutilizedStaff.slice(0, 2).map(emp => (
            <div
              key={emp.id}
              onClick={() => onSelectEmployee && onSelectEmployee(emp)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: onSelectEmployee ? 'pointer' : 'default',
                padding: '4px 6px',
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                border: '1px solid #f1f5f9'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src={emp.avatar}
                  alt={emp.name}
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid #e2e8f0'
                  }}
                />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1e293b' }}>
                    {emp.name} ({emp.percentage})
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    {emp.role} {activeRebalanced && <span style={{ color: '#059669', fontWeight: '700' }}>({emp.movedHours})</span>}
                  </div>
                </div>
              </div>

              {/* Mini Progress Track */}
              <div style={{
                width: '74px',
                height: '7px',
                backgroundColor: '#f1f5f9',
                borderRadius: '9999px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: emp.barWidth,
                  height: '100%',
                  backgroundColor: activeRebalanced ? '#10b981' : '#ea580c',
                  borderRadius: '9999px',
                  transition: 'width 0.4s ease'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Under-utilized staff section */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.82rem',
          fontWeight: '700',
          color: '#0f172a',
          marginBottom: '8px'
        }}>
          <span>Under-utilized staff</span>
          <span style={{ fontSize: '0.72rem', color: activeRebalanced ? '#059669' : '#2563eb', fontWeight: '600' }}>
            {activeRebalanced ? 'Productively Allocated' : 'Available Bandwidth'}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {underutilizedStaff.slice(0, 2).map(emp => (
            <div
              key={emp.id}
              onClick={() => onSelectEmployee && onSelectEmployee(emp)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: onSelectEmployee ? 'pointer' : 'default',
                padding: '4px 6px',
                borderRadius: '6px',
                backgroundColor: '#ffffff',
                border: '1px solid #f1f5f9'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img
                  src={emp.avatar}
                  alt={emp.name}
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid #e2e8f0'
                  }}
                />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1e293b' }}>
                    {emp.name} ({emp.percentage})
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    {emp.role} {activeRebalanced && <span style={{ color: '#059669', fontWeight: '700' }}>({emp.receivedHours})</span>}
                  </div>
                </div>
              </div>

              {/* Mini Progress Track */}
              <div style={{
                width: '74px',
                height: '7px',
                backgroundColor: '#f1f5f9',
                borderRadius: '9999px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: emp.barWidth,
                  height: '100%',
                  backgroundColor: '#10b981',
                  borderRadius: '9999px',
                  transition: 'width 0.4s ease'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expandable Task Transfers Toggle */}
      <div style={{ marginTop: '14px', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
        <button
          onClick={() => setShowTaskDetails(!showTaskDetails)}
          style={{
            width: '100%',
            background: 'none',
            border: 'none',
            padding: '4px 0',
            fontSize: '0.74rem',
            color: '#4f46e5',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span>{showTaskDetails ? 'Hide' : 'View'} 10 Proposed Task Reallocations (104 hrs)</span>
          {showTaskDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {showTaskDetails && (
          <div style={{
            marginTop: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            maxHeight: '180px',
            overflowY: 'auto',
            paddingRight: '4px'
          }}>
            {additionalRebalanceRecommendations.map(r => (
              <div
                key={r.id}
                style={{
                  padding: '6px 8px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0',
                  fontSize: '0.72rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#0f172a' }}>
                  <span>{r.taskName} ({r.hoursMoved}h)</span>
                  <span style={{ color: '#059669' }}>{r.matchScore}% Match</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#475569', marginTop: '2px' }}>
                  <span style={{ color: '#dc2626' }}>{r.fromName}</span>
                  <ArrowRight size={10} />
                  <span style={{ color: '#15803d' }}>{r.toName}</span>
                  <span style={{ marginLeft: 'auto', color: '#64748b' }}>{r.skillName}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
