import React from 'react';
import { Users, Briefcase, PieChart, AlertTriangle, ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

export default function StatCards({ employeesCount = 60, projectsCount = 11, avgUtilization = 72, skillGapsCount = 8 }) {
  const cards = [
    {
      label: 'Total Employees',
      value: employeesCount,
      trend: '+2%',
      trendDir: 'up',
      sub: 'vs last month',
      metricPill: '80% Full-time',
      progress: 80,
      icon: Users,
      iconBg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
      iconColor: '#2563eb',
      borderColor: '#bfdbfe'
    },
    {
      label: 'Active Projects',
      value: projectsCount,
      trend: '+12%',
      trendDir: 'up',
      sub: 'vs last month',
      metricPill: '4 in Planning',
      progress: 68,
      icon: Briefcase,
      iconBg: 'linear-gradient(135deg, #f0f7ff 0%, #dbeafe 100%)',
      iconColor: '#1d4ed8',
      borderColor: '#bfdbfe'
    },
    {
      label: 'Avg. Utilization',
      value: `${avgUtilization}%`,
      trend: '+6%',
      trendDir: 'up',
      sub: 'vs last month',
      metricPill: 'Healthy Buffer',
      progress: avgUtilization,
      icon: PieChart,
      iconBg: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      iconColor: '#0284c7',
      borderColor: '#bae6fd'
    },
    {
      label: 'Open Skill Gaps',
      value: skillGapsCount,
      trend: '-3%',
      trendDir: 'down',
      sub: 'vs last month',
      metricPill: '5 in Training',
      progress: 42,
      icon: AlertTriangle,
      iconBg: 'linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%)',
      iconColor: '#1e40af',
      borderColor: '#c7d9f9'
    }
  ];

  return (
    <div className="kpi-grid">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        const isUp = card.trendDir === 'up';
        return (
          <div key={idx} className="kpi-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '18px 20px', borderRadius: '14px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: card.iconBg,
                    border: `1px solid ${card.borderColor}`,
                    color: card.iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon size={22} />
                </div>
                <div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '600' }}>{card.label}</div>
                  <div style={{ fontSize: '1.65rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                    {card.value}
                  </div>
                </div>
              </div>

              <span className={`kpi-trend ${isUp ? 'trend-up' : 'trend-down'}`}>
                {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {card.trend}
              </span>
            </div>

            {/* Micro Progress Bar & Subtext */}
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.68rem', color: '#94a3b8', marginBottom: '5px' }}>
                <span>{card.sub}</span>
                <span style={{ fontWeight: '700', color: '#1d4ed8' }}>{card.metricPill}</span>
              </div>
              <div style={{ width: '100%', height: '5px', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${card.progress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #2563eb 0%, #38bdf8 100%)',
                    borderRadius: '9999px'
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
