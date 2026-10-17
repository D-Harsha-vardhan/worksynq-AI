import React, { useState } from 'react';
import { Search, Filter, Star, Eye, ShieldAlert, CheckCircle2, LayoutGrid, Table as TableIcon, Award, Briefcase } from 'lucide-react';
import EmployeeDetailModal from '../modals/EmployeeDetailModal';

export default function EmployeesView({ employees }) {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'
  const [selectedEmp, setSelectedEmp] = useState(null);

  const filtered = employees.filter(emp => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase()) ||
      emp.skills.some(s => s.name.toLowerCase().includes(search.toLowerCase()));

    const matchesDept = deptFilter === 'All' || emp.department === deptFilter;

    let matchesStatus = true;
    if (statusFilter === 'Overallocated') matchesStatus = emp.workload > 100;
    else if (statusFilter === 'Optimal') matchesStatus = emp.workload >= 70 && emp.workload <= 95;
    else if (statusFilter === 'Underutilized') matchesStatus = emp.workload < 60;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const availableDepts = ['All', ...new Set(employees.map(e => e.department).filter(Boolean))];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
            Workforce Directory ({employees.length} Engineers &amp; Specialists)
          </h2>
          <p style={{ fontSize: '0.84rem', color: '#64748b', marginTop: '3px' }}>
            Explore verified competencies, active sprint allocations, availability status, and profile portfolios.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '3px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <button
            onClick={() => setViewMode('table')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '0.78rem',
              fontWeight: '700',
              backgroundColor: viewMode === 'table' ? '#2563eb' : 'transparent',
              color: viewMode === 'table' ? '#ffffff' : '#64748b',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <TableIcon size={14} /> Table
          </button>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '0.78rem',
              fontWeight: '700',
              backgroundColor: viewMode === 'grid' ? '#2563eb' : 'transparent',
              color: viewMode === 'grid' ? '#ffffff' : '#64748b',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <LayoutGrid size={14} /> Cards
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
        <div style={{ position: 'relative', width: '320px' }}>
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, role, skill..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="search-input"
          style={{ width: '180px' }}
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
        >
          {availableDepts.map(d => (
            <option key={d} value={d}>
              {d === 'All' ? 'All Departments' : d}
            </option>
          ))}
        </select>

        <select
          className="search-input"
          style={{ width: '180px' }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Bandwidths</option>
          <option value="Overallocated">Overallocated (&gt;100%)</option>
          <option value="Optimal">Optimal (70-95%)</option>
          <option value="Underutilized">Available / Low Load (&lt;60%)</option>
        </select>
      </div>

      {/* Grid Cards View */}
      {viewMode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '16px' }}>
          {filtered.map(emp => (
            <div
              key={emp.id}
              onClick={() => setSelectedEmp(emp)}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '18px',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.03)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(15, 23, 42, 0.06)';
                e.currentTarget.style.borderColor = '#bfdbfe';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 2px 6px rgba(15, 23, 42, 0.03)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={emp.avatar} alt={emp.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #eff6ff' }} />
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#0f172a' }}>{emp.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{emp.department}</div>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: '700',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    backgroundColor: emp.workload > 100 ? '#f0f4ff' : '#eff6ff',
                    color: emp.workload > 100 ? '#1e40af' : '#1d4ed8',
                    border: emp.workload > 100 ? '1px solid #c7d9f9' : '1px solid #bfdbfe'
                  }}
                >
                  {emp.workload}% load
                </span>
              </div>

              <div style={{ fontSize: '0.76rem', color: '#1d4ed8', fontWeight: '700' }}>
                {emp.role} • {emp.experienceYears}y exp
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {emp.skills.slice(0, 3).map((s, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.68rem',
                      padding: '2px 8px',
                      borderRadius: '6px',
                      backgroundColor: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      color: '#334155',
                      fontWeight: '500'
                    }}
                  >
                    {s.name} ({s.level}/5)
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '10px', marginTop: 'auto' }}>
                <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Capacity: {emp.capacity}%</span>
                <button
                  style={{
                    padding: '4px 10px',
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    color: '#2563eb',
                    backgroundColor: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  View Profile →
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <table className="custom-table" style={{ margin: 0 }}>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Role</th>
                <th>Top Skills</th>
                <th>Experience</th>
                <th>Workload</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(emp => (
                <tr key={emp.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedEmp(emp)}>
                  <td>
                    <div className="emp-cell">
                      <img src={emp.avatar} alt={emp.name} className="emp-avatar" />
                      <div>
                        <div className="emp-name">{emp.name}</div>
                        <div className="emp-role-sub">{emp.role}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: '#475569', fontSize: '0.8rem' }}>{emp.department}</td>
                  <td>
                    <span className="role-badge" style={{ fontSize: '0.72rem' }}>{emp.role}</span>
                  </td>
                  <td style={{ fontSize: '0.76rem', color: '#334155', maxWidth: '240px' }}>
                    {emp.skills.slice(0, 3).map(s => s.name).join(', ')}
                  </td>
                  <td style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: '500' }}>{emp.experienceYears} yrs</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="capacity-track" style={{ width: '60px', backgroundColor: '#f1f5f9', height: '6px', borderRadius: '9999px' }}>
                        <div
                          className="capacity-bar"
                          style={{
                            width: `${Math.min(100, emp.workload)}%`,
                            background: emp.workload > 100 ? 'linear-gradient(90deg, #1d4ed8, #1e3a8a)' : 'linear-gradient(90deg, #2563eb, #38bdf8)',
                            borderRadius: '9999px'
                          }}
                        ></div>
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: '700', color: emp.workload > 100 ? '#1e40af' : '#0f172a' }}>
                        {emp.workload}%
                      </span>
                    </div>
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        padding: '3px 9px',
                        borderRadius: '9999px',
                        backgroundColor: emp.workload > 100 ? '#f0f4ff' : '#eff6ff',
                        color: emp.workload > 100 ? '#1e40af' : '#1d4ed8',
                        border: emp.workload > 100 ? '1px solid #c7d9f9' : '1px solid #bfdbfe'
                      }}
                    >
                      {emp.workload > 100 ? 'Overallocated' : 'Available'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="icon-btn" style={{ width: '28px', height: '28px', marginLeft: 'auto', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }} title="View profile">
                      <Eye size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedEmp && (
        <EmployeeDetailModal employee={selectedEmp} onClose={() => setSelectedEmp(null)} />
      )}
    </div>
  );
}
