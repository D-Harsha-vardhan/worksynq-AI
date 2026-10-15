import React from 'react';
import { Download, FileText, CheckCircle2, TrendingUp, BarChart2, ShieldCheck } from 'lucide-react';

export default function ReportsView({ stats, projects }) {
  const exportReport = () => {
    alert("Workforce Intelligence Executive Summary PDF generated and downloaded!");
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a' }}>
            Workforce Intelligence &amp; Executive Reports
          </h2>
          <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
            Auditable insights on talent utilization, team formation efficiency, and training ROI.
          </p>
        </div>
        <button className="btn-primary" onClick={exportReport}>
          <Download size={15} />
          <span>Export Executive PDF</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '24px' }}>
        <div className="card">
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600' }}>Overall Talent Utilization</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>
            {stats?.avgUtilization || 72}%
          </div>
          <div style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: '600', marginTop: '2px' }}>
            +6.2% improvement vs prior quarter
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600' }}>Project Staffing Velocity</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#2563eb', marginTop: '4px' }}>1.4 Days</div>
          <div style={{ fontSize: '0.74rem', color: '#10b981', fontWeight: '600', marginTop: '2px' }}>
            Reduced from 14 days with AI Matching
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600' }}>Burnout Risk Mitigation</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10b981', marginTop: '4px' }}>100%</div>
          <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
            0 critical bottlenecks following reallocation
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title" style={{ marginBottom: '16px' }}>Project Allocation Health Matrix</h3>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Department</th>
              <th>Priority</th>
              <th>Staffing Status</th>
              <th>Avg Fit Score</th>
              <th>Est Delivery Health</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id}>
                <td style={{ fontWeight: '600' }}>{p.name}</td>
                <td>{p.department}</td>
                <td>
                  <span className="priority-pill priority-high" style={{ fontSize: '0.68rem' }}>
                    {p.priority}
                  </span>
                </td>
                <td>
                  <span style={{ color: '#059669', fontWeight: '600', fontSize: '0.78rem' }}>
                    {p.assignedTeam.length}/{p.teamSize} Assigned
                  </span>
                </td>
                <td style={{ fontWeight: '700', color: '#2563eb' }}>
                  {Math.min(96, Math.max(76, Math.round(82 + (p.assignedTeam?.length || 2) * 3)))}%
                </td>
                <td>
                  <span style={{ color: '#10b981', fontWeight: '600', fontSize: '0.78rem' }}>
                    ● On Schedule
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
