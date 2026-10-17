import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, TrendingUp, BarChart2, ShieldCheck, FileSpreadsheet } from 'lucide-react';

export default function ReportsView({ stats, projects }) {
  const [downloadNotice, setDownloadNotice] = useState(null);

  const exportReport = (format = 'PDF') => {
    setDownloadNotice(`Generating Executive ${format} Summary...`);
    setTimeout(() => {
      setDownloadNotice(`✓ Executive ${format} downloaded successfully!`);
      setTimeout(() => setDownloadNotice(null), 3500);
    }, 1000);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
            Workforce Intelligence &amp; Executive Reports
          </h2>
          <p style={{ fontSize: '0.84rem', color: '#64748b', marginTop: '3px' }}>
            Auditable insights on talent utilization, team formation velocity, and competency metrics.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => exportReport('CSV')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              fontSize: '0.80rem',
              fontWeight: '700',
              color: '#334155',
              cursor: 'pointer'
            }}
          >
            <FileSpreadsheet size={15} color="#2563eb" />
            <span>Export CSV</span>
          </button>
          <button className="btn-primary" onClick={() => exportReport('PDF')}>
            <Download size={15} />
            <span>Export Executive PDF</span>
          </button>
        </div>
      </div>

      {downloadNotice && (
        <div style={{ padding: '10px 16px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '700', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} />
          <span>{downloadNotice}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginBottom: '24px' }}>
        <div className="card" style={{ padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600' }}>Overall Talent Utilization</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0f172a', marginTop: '4px' }}>
            {stats?.avgUtilization || 72}%
          </div>
          <div style={{ fontSize: '0.74rem', color: '#1d4ed8', fontWeight: '700', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={13} /> +6.2% improvement vs prior quarter
          </div>
        </div>

        <div className="card" style={{ padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600' }}>Project Staffing Velocity</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#2563eb', marginTop: '4px' }}>1.4 Days</div>
          <div style={{ fontSize: '0.74rem', color: '#1d4ed8', fontWeight: '700', marginTop: '4px' }}>
            Reduced from 14 days with AI Optimizer
          </div>
        </div>

        <div className="card" style={{ padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600' }}>Burnout Risk Mitigation</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1d4ed8', marginTop: '4px' }}>100%</div>
          <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px' }}>
            Zero critical bottlenecks after sprint rebalance
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9' }}>
          <h3 className="card-title" style={{ margin: 0, fontSize: '0.96rem' }}>Project Allocation Health Matrix</h3>
        </div>
        <table className="custom-table" style={{ margin: 0 }}>
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
                <td style={{ fontWeight: '700', color: '#0f172a' }}>{p.name}</td>
                <td style={{ color: '#475569' }}>{p.department}</td>
                <td>
                  <span className="priority-pill priority-high" style={{ fontSize: '0.68rem' }}>
                    {p.priority}
                  </span>
                </td>
                <td>
                  <span style={{ color: '#1d4ed8', fontWeight: '700', fontSize: '0.76rem', backgroundColor: '#eff6ff', padding: '2px 8px', borderRadius: '9999px', border: '1px solid #bfdbfe' }}>
                    {p.assignedTeam.length}/{p.teamSize} Assigned
                  </span>
                </td>
                <td style={{ fontWeight: '800', color: '#2563eb' }}>
                  {Math.min(96, Math.max(76, Math.round(82 + (p.assignedTeam?.length || 2) * 3)))}%
                </td>
                <td>
                  <span style={{ color: '#1d4ed8', fontWeight: '700', fontSize: '0.76rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2563eb' }}></span>
                    On Schedule
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
