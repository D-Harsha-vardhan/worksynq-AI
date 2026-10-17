import React, { useState, useRef, useEffect } from 'react';
import { Search, Calendar, Bell, ChevronDown, CheckCircle2, AlertTriangle, X, User, Briefcase, Sparkles } from 'lucide-react';
import { initialEmployees, initialProjects } from '../data/workforceData';

export default function Header({ searchQuery, setSearchQuery, onSelectEmployee, onSelectProject }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchContainerRef = useRef(null);

  const notifications = [
    { id: 1, title: 'Workload Alert: Raju Reddy at 118%', type: 'warning', time: '10m ago' },
    { id: 2, title: 'Team recommendation ready for Banking Mobile App Revamp', type: 'success', time: '2h ago' },
    { id: 3, title: 'Skill Gap: 3 Kubernetes engineers needed', type: 'warning', time: '5h ago' },
    { id: 4, title: 'Training completed: Anita Roy (Cloud Native)', type: 'info', time: '1d ago' }
  ];

  // Live matching for instant search results
  const trimmed = (searchQuery || '').trim().toLowerCase();
  const matchedEmployees = trimmed ? initialEmployees.filter(e =>
    e.name.toLowerCase().includes(trimmed) ||
    e.role.toLowerCase().includes(trimmed) ||
    e.skills.some(s => s.name.toLowerCase().includes(trimmed))
  ).slice(0, 4) : [];

  const matchedProjects = trimmed ? initialProjects.filter(p =>
    p.name.toLowerCase().includes(trimmed) ||
    p.department?.toLowerCase().includes(trimmed)
  ).slice(0, 3) : [];

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="top-header">
      <div className="search-container" ref={searchContainerRef}>
        <Search size={16} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search employees, projects, skills..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSearchResults(true);
          }}
          onFocus={() => setShowSearchResults(true)}
          style={{ paddingRight: searchQuery ? '64px' : '44px' }}
        />
        {searchQuery ? (
          <button
            onClick={() => {
              setSearchQuery('');
              setShowSearchResults(false);
            }}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Clear search"
          >
            <X size={15} />
          </button>
        ) : (
          <span
            className="search-shortcut"
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          >
            Ctrl K
          </span>
        )}

        {/* Live Search Floating Results */}
        {showSearchResults && trimmed && (matchedEmployees.length > 0 || matchedProjects.length > 0) && (
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: '46px',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '12px',
              boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)',
              zIndex: 100,
              overflow: 'hidden'
            }}
          >
            {matchedEmployees.length > 0 && (
              <div style={{ padding: '8px 12px 4px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Employees ({matchedEmployees.length})
                </div>
                {matchedEmployees.map(emp => (
                  <div
                    key={emp.id}
                    onClick={() => {
                      if (onSelectEmployee) onSelectEmployee(emp);
                      setShowSearchResults(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease',
                      marginBottom: '4px'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eff6ff'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={emp.avatar} alt={emp.name} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a' }}>{emp.name}</div>
                        <div style={{ fontSize: '0.70rem', color: '#64748b' }}>{emp.role} • {emp.department}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.68rem', fontWeight: '700', color: '#1d4ed8', backgroundColor: '#eff6ff', padding: '2px 8px', borderRadius: '9999px', border: '1px solid #bfdbfe' }}>
                      {emp.workload}% load
                    </span>
                  </div>
                ))}
              </div>
            )}

            {matchedProjects.length > 0 && (
              <div style={{ padding: '8px 12px' }}>
                <div style={{ fontSize: '0.68rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                  Projects ({matchedProjects.length})
                </div>
                {matchedProjects.map(proj => (
                  <div
                    key={proj.id}
                    onClick={() => {
                      if (onSelectProject) onSelectProject(proj);
                      setShowSearchResults(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eff6ff'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Briefcase size={16} color="#2563eb" />
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a' }}>{proj.name}</div>
                        <div style={{ fontSize: '0.70rem', color: '#64748b' }}>{proj.department} • {proj.budget}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.66rem', fontWeight: '700', color: '#0369a1', backgroundColor: '#e0f2fe', padding: '2px 6px', borderRadius: '4px' }}>
                      {proj.priority}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
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
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a' }}>Notifications (4)</span>
                <span style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: '600', cursor: 'pointer' }}>Mark all read</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {notifications.map(n => (
                  <div key={n.id} style={{ display: 'flex', gap: '8px', fontSize: '0.78rem', padding: '8px 10px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                    {n.type === 'warning' ? <AlertTriangle size={15} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} /> : <CheckCircle2 size={15} color="#1d4ed8" style={{ flexShrink: 0, marginTop: '2px' }} />}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: '#0f172a' }}>{n.title}</div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>{n.time}</div>
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
                width: '220px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
                padding: '10px',
                zIndex: 50
              }}
            >
              <div style={{ padding: '8px 10px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a' }}>Workforce Intelligence</div>
                <div style={{ fontSize: '0.68rem', color: '#1d4ed8', fontWeight: '600', marginTop: '2px' }}>Enterprise Edition v2.4</div>
              </div>
              <div style={{ padding: '8px 10px', fontSize: '0.78rem', color: '#334155', cursor: 'pointer', borderRadius: '6px', marginTop: '4px' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eff6ff'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Role: Senior Delivery Manager
              </div>
              <div style={{ padding: '8px 10px', fontSize: '0.78rem', color: '#334155', cursor: 'pointer', borderRadius: '6px' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eff6ff'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Department: Global Technology
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
