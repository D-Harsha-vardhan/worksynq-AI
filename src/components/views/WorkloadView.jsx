import React from 'react';
import { Scale, AlertTriangle, ShieldCheck, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { analyzeWorkloadDistribution, simulateWorkloadReallocation } from '../../utils/matchingEngine';

export default function WorkloadView({ employees, onOpenRebalanceModal, isRebalanced }) {
  const stats = analyzeWorkloadDistribution(employees);
  const overloaded = employees.filter(e => e.workload > 100);
  const underutilized = employees.filter(e => e.workload < 60);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a' }}>
            Workforce Capacity &amp; Workload Balancing
          </h2>
          <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
            Scenario B Solver: Proactively detect overload bottlenecks and redistribute project tasks.
          </p>
        </div>
        <button
          className="btn-primary"
          onClick={onOpenRebalanceModal}
        >
          <Scale size={16} />
          <span>Launch Rebalancing Simulator</span>
        </button>
      </div>

      {/* Hero Metric Comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', marginBottom: '24px' }}>
        <div className="card" style={{ borderColor: isRebalanced ? '#a7f3d0' : '#fecaca', backgroundColor: isRebalanced ? '#ecfdf5' : '#fef2f2' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: '700', color: isRebalanced ? '#065f46' : '#991b1b' }}>
            {isRebalanced ? 'Status: Balanced' : 'Critical Burnout Risks'}
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: isRebalanced ? '#059669' : '#dc2626', marginTop: '4px' }}>
            {isRebalanced ? '0 Employees' : `${overloaded.length} Overloaded`}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px' }}>
            {isRebalanced ? 'All team members operating in safe buffer' : 'Operating above 100% weekly capacity limit'}
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748b' }}>
            Underutilized Bandwidth
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#3b82f6', marginTop: '4px' }}>
            {underutilized.length} Engineers
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px' }}>
            Ready to absorb up to 480 hours of technical delivery
          </div>
        </div>

        <div className="card" style={{ backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#1e40af' }}>
            Workforce Balance Index
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1d4ed8', marginTop: '4px' }}>
            {isRebalanced ? '86%' : '68%'}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#1e40af', marginTop: '4px' }}>
            {isRebalanced ? '✓ Optimized equilibrium achieved' : '⚠️ Sub-optimal distribution across teams'}
          </div>
        </div>
      </div>

      {/* Overloaded vs Underutilized Split Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Overloaded Column */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626' }}>
              <AlertTriangle size={18} />
              Overallocated Employees ({overloaded.length})
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {overloaded.map(emp => (
              <div key={emp.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderRadius: '8px', backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={emp.avatar} alt={emp.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#991b1b' }}>{emp.name}</div>
                    <div style={{ fontSize: '0.74rem', color: '#b91c1c' }}>{emp.role}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: '800', color: '#ef4444' }}>{emp.workload}%</span>
                  <div style={{ fontSize: '0.7rem', color: '#991b1b' }}>{emp.allocatedWeeklyHours}h / 40h</div>
                </div>
              </div>
            ))}
            {overloaded.length === 0 && (
              <div style={{ textAlign: 'center', padding: '24px', color: '#059669', fontWeight: '600', fontSize: '0.86rem' }}>
                ✓ No overloaded staff! All workloads balanced.
              </div>
            )}
          </div>
        </div>

        {/* Available Talent Column */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669' }}>
              <ShieldCheck size={18} />
              Available Talent Capacity ({underutilized.length})
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto' }}>
            {underutilized.slice(0, 6).map(emp => (
              <div key={emp.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderRadius: '8px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={emp.avatar} alt={emp.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#166534' }}>{emp.name}</div>
                    <div style={{ fontSize: '0.74rem', color: '#15803d' }}>{emp.role}</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: '800', color: '#10b981' }}>{emp.workload}%</span>
                  <div style={{ fontSize: '0.7rem', color: '#166534' }}>{40 - emp.allocatedWeeklyHours}h available</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
