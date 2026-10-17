import React from 'react';
import {
  LayoutGrid,
  Briefcase,
  Users2,
  UserCheck,
  BarChart3,
  GraduationCap,
  FileText,
  Settings,
  Sparkles,
  Bot
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, showAiDrawer, onToggleAi }) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'ai-advisor', label: 'AI Advisor', icon: Bot, isAi: true },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'team-builder', label: 'Team Builder', icon: Users2 },
    { id: 'employees', label: 'Employees', icon: UserCheck },
    { id: 'workload', label: 'Workload', icon: BarChart3 },
    { id: 'skills-training', label: 'Skills & Training', icon: GraduationCap },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="brand-icon-wrapper">
          <Users2 size={24} />
        </div>
        <div>
          <div className="brand-title">Workforce<br />Intelligence</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon size={19} />
              <span>{item.label}</span>
              {item.isAi && (
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: '0.62rem',
                    fontWeight: '700',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : '#eff6ff',
                    color: isActive ? '#ffffff' : '#1d4ed8',
                    border: isActive ? 'none' : '1px solid #bfdbfe'
                  }}
                >
                  AI
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: '0 16px 12px' }}>
        <div
          style={{
            padding: '8px 12px',
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563eb', flexShrink: 0 }}></span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#1d4ed8' }}>Workforce Copilot</div>
            <div style={{ fontSize: '0.64rem', color: '#64748b' }}>Enterprise Engine • Live</div>
          </div>
        </div>
      </div>

      <div className="sidebar-footer">
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Sparkles size={12} color="#3b82f6" />
          <span>Better teams. Higher impact.</span>
        </p>
      </div>
    </aside>
  );
}
