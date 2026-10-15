import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  Gauge,
  Users,
  BarChart3,
  TrendingUp,
  ChevronDown
} from 'lucide-react';

export default function WorkloadRebalancingCard({
  stats,
  isRebalanced = false,
  onOpenRebalance,
  onSelectEmployee
}) {
  const overutilizedStaff = [
    {
      id: 'E028',
      name: 'Divya Menon',
      role: 'Senior Data Scientist',
      percentage: '125%',
      barWidth: '100%',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'E001',
      name: 'Ravi Shankar',
      role: 'Lead Backend Engineer',
      percentage: '118%',
      barWidth: '92%',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    }
  ];

  const underutilizedStaff = [
    {
      id: 'E036',
      name: 'Zoya Ansari',
      role: 'Data Engineer',
      percentage: '35%',
      barWidth: '35%',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'E002',
      name: 'Anita Rao',
      role: 'Senior Backend Engineer',
      percentage: '40%',
      barWidth: '40%',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
    }
  ];

  // ==========================================
  // PANEL 6: When Rebalanced (Success State)
  // ==========================================
  if (isRebalanced) {
    return (
      <div className="card" style={{ padding: '22px 24px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.08rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
            Workload Rebalancing &amp; Allocation
          </h3>
          <span style={{ fontSize: '0.72rem', fontWeight: '700', color: '#059669', backgroundColor: '#ecfdf5', padding: '2px 8px', borderRadius: '9999px', border: '1px solid #a7f3d0' }}>
            ✓ Optimized
          </span>
        </div>

        {/* Success Banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 14px',
          backgroundColor: '#ecfdf5',
          borderRadius: '8px',
          border: '1px solid #a7f3d0',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} color="#059669" />
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#065f46' }}>
                Changes Applied Successfully
              </div>
              <div style={{ fontSize: '0.72rem', color: '#047857' }}>
                3 transfers applied. Workload metrics updated.
              </div>
            </div>
          </div>
          <button
            onClick={onOpenRebalance}
            style={{
              background: 'none',
              border: 'none',
              color: '#065f46',
              fontSize: '0.74rem',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            View Changes &gt;
          </button>
        </div>

        {/* Updated Workforce Overview */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a' }}>Overloaded (8%)</span>
            <span style={{ fontSize: '0.74rem', color: '#64748b' }}>5 Engineers Overloaded</span>
          </div>

          <div style={{ display: 'flex', width: '100%', height: '8px', borderRadius: '9999px', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
            <div style={{ width: '8%', backgroundColor: '#ea580c' }} />
            <div style={{ width: '10%', backgroundColor: '#2563eb', marginLeft: '2px' }} />
            <div style={{ width: '82%', backgroundColor: '#10b981', marginLeft: '2px' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '0.78rem', color: '#334155', fontWeight: '600' }}>
            <span>Underutilized (10%)</span>
            <span style={{ color: '#059669', fontWeight: '700' }}>Optimal (82%)</span>
          </div>
        </div>

        {/* Key Improvements (3 Cards Row) */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
            Key Improvements
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            <div style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Gauge size={16} color="#059669" />
              <div>
                <div style={{ fontSize: '0.66rem', color: '#64748b' }}>Balance improved</div>
                <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#059669' }}>+28%</div>
              </div>
            </div>

            <div style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={16} color="#059669" />
              <div>
                <div style={{ fontSize: '0.66rem', color: '#64748b' }}>Overloaded</div>
                <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#059669' }}>-4</div>
              </div>
            </div>

            <div style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={16} color="#059669" />
              <div>
                <div style={{ fontSize: '0.66rem', color: '#64748b' }}>Redistributed</div>
                <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#059669' }}>104 hrs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefit Highlight Banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 12px',
          backgroundColor: '#f0fdf4',
          borderRadius: '6px',
          border: '1px solid #bbf7d0'
        }}>
          <TrendingUp size={16} color="#16a34a" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.74rem', color: '#166534', lineHeight: 1.35 }}>
            A more balanced team leads to better productivity, higher engagement and on-time project delivery.
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // PANEL 1: Initial State (Overview Card)
  // ==========================================
  return (
    <div className="card workload-rebalance-card" style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column' }}>
      {/* Header Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#ffffff' }} />
        </div>
        <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0f172a' }}>Workforce Intelligence</span>
        <span style={{ color: '#cbd5e1' }}>|</span>
        <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Workload Rebalancing &amp; Allocation</span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.08rem',
        fontWeight: '700',
        color: '#0f172a',
        margin: '0 0 12px 0'
      }}>
        Workload Rebalancing &amp; Allocation
      </h3>

      {/* Multi-segment Progress Bar */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a' }}>
            Overloaded (15%)
          </span>
          <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
            9 Engineers Overloaded
          </span>
        </div>

        <div style={{ display: 'flex', width: '100%', height: '8px', borderRadius: '9999px', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
          <div style={{ width: '15%', backgroundColor: '#ea580c' }} title="Overloaded (15%)" />
          <div style={{ width: '12%', backgroundColor: '#2563eb', marginLeft: '2px' }} title="Underutilized (12%)" />
          <div style={{ width: '73%', backgroundColor: '#10b981', marginLeft: '2px' }} title="Optimal (73%)" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '0.8rem', color: '#334155', fontWeight: '600' }}>
          <span>Underutilized (12%)</span>
          <span>Optimal (73%)</span>
        </div>
      </div>

      {/* Primary Auto-Rebalance Tasks Button */}
      <button
        className="btn-auto-rebalance"
        onClick={onOpenRebalance}
        style={{
          width: '100%',
          marginTop: '6px',
          marginBottom: '14px',
          padding: '10px 18px',
          backgroundColor: '#2563eb',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '0.88rem',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)',
          transition: 'all 0.18s ease'
        }}
      >
        <Sparkles size={16} />
        <span>Auto-Rebalance Tasks</span>
      </button>

      {/* Over-utilized staff section */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
          <span>Over-utilized staff</span>
          <span style={{ fontSize: '0.72rem', color: '#ea580c', fontWeight: '600' }}>At Risk (&gt;100% Load)</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {overutilizedStaff.map(emp => (
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
                <img src={emp.avatar} alt={emp.name} style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1e293b' }}>
                    {emp.name} ({emp.percentage})
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    {emp.role}
                  </div>
                </div>
              </div>

              <div style={{ width: '74px', height: '7px', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: emp.barWidth, height: '100%', backgroundColor: '#ea580c', borderRadius: '9999px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Under-utilized staff section */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
          <span>Under-utilized staff</span>
          <span style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: '600' }}>Available Bandwidth</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {underutilizedStaff.map(emp => (
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
                <img src={emp.avatar} alt={emp.name} style={{ width: '26px', height: '26px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1e293b' }}>
                    {emp.name} ({emp.percentage})
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                    {emp.role}
                  </div>
                </div>
              </div>

              <div style={{ width: '74px', height: '7px', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: emp.barWidth, height: '100%', backgroundColor: '#10b981', borderRadius: '9999px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Link to Proposals */}
      <div style={{ marginTop: 'auto', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
        <button
          onClick={onOpenRebalance}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            fontSize: '0.76rem',
            color: '#2563eb',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span>View 10 Proposed Task Reallocations (104 hrs)</span>
          <ChevronDown size={14} />
        </button>
      </div>
    </div>
  );
}
