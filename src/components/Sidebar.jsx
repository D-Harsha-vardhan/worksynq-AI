import React from 'react';
import {
  LayoutDashboard,
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
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
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
          <Users2 size={22} />
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
              <Icon size={18} />
              <span>{item.label}</span>
              {item.isAi && (
                <span
                  style={{
                    marginLeft: 'auto',
                    fontSize: '0.62rem',
                    fontWeight: '700',
                    padding: '1px 6px',
                    borderRadius: '4px',
                    backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(118, 185, 0, 0.2)',
                    color: isActive ? '#ffffff' : '#84cc16'
                  }}
                >
                  NIM
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <Sparkles size={12} color="#3b82f6" />
          <span>Better teams. Higher impact.</span>
        </p>
      </div>
    </aside>
  );
}
