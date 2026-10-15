import React, { useState } from 'react';
import { Search, Filter, Star, Eye, ShieldAlert, CheckCircle2 } from 'lucide-react';
import EmployeeDetailModal from '../modals/EmployeeDetailModal';

export default function EmployeesView({ employees }) {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
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
      <div style={{ marginBottom: '22px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a' }}>
          Workforce Directory ({employees.length} Engineers &amp; Specialists)
        </h2>
        <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
          Explore talent profiles, verified skill proficiencies, capacity utilization, and project history.
        </p>
      </div>

      {/* Filters Bar */}
      <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
        <div style={{ position: 'relative', width: '300px' }}>
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
          <option value="All">All Statuses</option>
          <option value="Overallocated">Overallocated (&gt;100%)</option>
          <option value="Optimal">Optimal (70-95%)</option>
          <option value="Underutilized">Underutilized (&lt;60%)</option>
        </select>
      </div>

      {/* Employees Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
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
                <td style={{ color: '#64748b', fontSize: '0.8rem' }}>{emp.experienceYears} yrs</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="capacity-track" style={{ width: '60px' }}>
                      <div
                        className="capacity-bar"
                        style={{
                          width: `${Math.min(100, emp.workload)}%`,
                          backgroundColor: emp.workload > 100 ? '#ef4444' : (emp.workload < 50 ? '#f59e0b' : '#10b981')
                        }}
                      ></div>
                    </div>
                    <span style={{ fontSize: '0.78rem', fontWeight: '700', color: emp.workload > 100 ? '#ef4444' : '#0f172a' }}>
                      {emp.workload}%
                    </span>
                  </div>
                </td>
                <td>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      backgroundColor: emp.workload > 100 ? '#fef2f2' : (emp.workload < 50 ? '#fffbeb' : '#ecfdf5'),
                      color: emp.workload > 100 ? '#dc2626' : (emp.workload < 50 ? '#d97706' : '#059669')
                    }}
                  >
                    {emp.availability}
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button className="icon-btn" style={{ width: '28px', height: '28px', marginLeft: 'auto' }} title="View profile">
                    <Eye size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedEmp && (
        <EmployeeDetailModal employee={selectedEmp} onClose={() => setSelectedEmp(null)} />
      )}
    </div>
  );
}
