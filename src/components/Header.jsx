import React, { useState } from 'react';
import { Search, Calendar, Bell, ChevronDown, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Header({ searchQuery, setSearchQuery, onSelectEmployee }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'Workload Alert: Raju Reddy at 118%', type: 'warning', time: '10m ago' },
    { id: 2, title: 'Team recommendation ready for Customer Analytics', type: 'success', time: '2h ago' },
    { id: 3, title: 'Skill Gap: 3 Kubernetes engineers needed', type: 'warning', time: '5h ago' },
    { id: 4, title: 'Training completed: Anita Roy (Cloud Native)', type: 'info', time: '1d ago' }
  ];

  return (
    <header className="top-header">
      <div className="search-container">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search employees, projects, skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="header-right">
        <div className="date-pill">
          <Calendar size={14} color="#64748b" />
          <span>Apr 28, 2025 - May 27, 2025</span>
        </div>

        <div style={{ position: 'relative' }}>
          <button
            className="icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <Bell size={18} />
            <span className="badge-count">4</span>
          </button>

          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '46px',
                width: '320px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                padding: '12px',
                zIndex: 50
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', paddingBottom: '6px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>Notifications</span>
                <span style={{ fontSize: '0.72rem', color: '#2563eb', cursor: 'pointer' }}>Mark all read</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {notifications.map(n => (
                  <div key={n.id} style={{ display: 'flex', gap: '8px', fontSize: '0.78rem', padding: '6px', borderRadius: '6px', backgroundColor: '#f8fafc' }}>
                    {n.type === 'warning' ? <AlertTriangle size={15} color="#f59e0b" style={{ flexShrink: 0 }} /> : <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0 }} />}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: '#0f172a' }}>{n.title}</div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <div
            className="profile-pill"
            style={{ cursor: 'pointer' }}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="profile-avatar">AK</div>
            <div className="profile-info">
              <span className="profile-name">Adithya Kumar</span>
              <span className="profile-role">Project Manager</span>
            </div>
            <ChevronDown size={14} color="#94a3b8" />
          </div>

          {showProfileMenu && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '46px',
                width: '200px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                padding: '8px',
                zIndex: 50
              }}
            >
              <div style={{ padding: '8px', borderBottom: '1px solid #f1f5f9', fontSize: '0.8rem', fontWeight: '600' }}>
                Workforce Intelligence v1.0
              </div>
              <div style={{ padding: '8px', fontSize: '0.78rem', color: '#475569', cursor: 'pointer' }}>
                Role: Senior Delivery Manager
              </div>
              <div style={{ padding: '8px', fontSize: '0.78rem', color: '#475569', cursor: 'pointer' }}>
                Department: Global Technology
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
