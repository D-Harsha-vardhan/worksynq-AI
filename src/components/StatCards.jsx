import React from 'react';
import { Users, Briefcase, PieChart, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function StatCards({ employeesCount = 60, projectsCount = 8, avgUtilization = 78, skillGapsCount = 12 }) {
  const cards = [
    {
      label: 'Total Employees',
      value: employeesCount,
      trend: '+2%',
      trendDir: 'up',
      sub: 'vs last month',
      icon: Users,
      iconClass: 'kpi-icon-blue'
    },
    {
      label: 'Active Projects',
      value: projectsCount,
      trend: '+12%',
      trendDir: 'up',
      sub: 'vs last month',
      icon: Briefcase,
      iconClass: 'kpi-icon-sapphire'
    },
    {
      label: 'Avg. Utilization',
      value: `${avgUtilization}%`,
      trend: '+6%',
      trendDir: 'up',
      sub: 'vs last month',
      icon: PieChart,
      iconClass: 'kpi-icon-sky'
    },
    {
      label: 'Open Skill Gaps',
      value: skillGapsCount,
      trend: '-3%',
      trendDir: 'down',
      sub: 'vs last month',
      icon: AlertTriangle,
      iconClass: 'kpi-icon-navy'
    }
  ];

  return (
    <div className="kpi-grid">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        const isUp = card.trendDir === 'up';
        return (
          <div key={idx} className="kpi-card">
            <div className={`kpi-icon-box ${card.iconClass}`}>
              <Icon size={24} />
            </div>
            <div className="kpi-content">
              <div className="kpi-label">{card.label}</div>
              <div className="kpi-value-row">
                <span className="kpi-value">{card.value}</span>
                <span className={`kpi-trend ${isUp ? 'trend-up' : 'trend-down'}`}>
                  {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {card.trend}
                </span>
              </div>
              <div className="kpi-subtext">{card.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
