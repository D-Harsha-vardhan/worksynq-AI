import React, { useState } from 'react';
import { Plus, Briefcase, Calendar, Users, DollarSign, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ProjectsView({ projects, employees, onSelectProjectForTeamBuilder }) {
  const [filterDept, setFilterDept] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const availableDepts = ['All', ...new Set(projects.map(p => p.department).filter(Boolean))];

  const filtered = filterDept === 'All'
    ? projects
    : projects.filter(p => p.department === filterDept);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
        <div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a' }}>Active Projects Portfolio</h2>
          <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
            Monitor project requirements, allocated personnel, and skill demands across {projects.length} active initiatives.
          </p>
        </div>
        <button
          className="btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={16} />
          <span>New Project</span>
        </button>
      </div>

      {/* Department Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {availableDepts.map(dept => (
          <button
            key={dept}
            onClick={() => setFilterDept(dept)}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: '600',
              border: `1px solid ${filterDept === dept ? '#2563eb' : '#e2e8f0'}`,
              backgroundColor: filterDept === dept ? '#eff6ff' : '#ffffff',
              color: filterDept === dept ? '#2563eb' : '#64748b'
            }}
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {filtered.map(proj => (
          <div key={proj.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0f172a' }}>{proj.name}</h3>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>{proj.department}</div>
                </div>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    backgroundColor: proj.priority.includes('Critical') ? '#fef2f2' : (proj.priority.includes('High') ? '#fffbeb' : '#f0f9ff'),
                    color: proj.priority.includes('Critical') ? '#ef4444' : (proj.priority.includes('High') ? '#d97706' : '#0284c7')
                  }}
                >
                  {proj.priority}
                </span>
              </div>

              <p style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '14px', lineHeight: 1.45 }}>
                {proj.description}
              </p>

              {/* Required Skills */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '0.74rem', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>
                  Required Skills:
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {proj.requiredSkills.map((req, i) => (
                    <span key={i} className="skill-tag skill-tag-primary" style={{ fontSize: '0.72rem' }}>
                      {req.name} ({req.minLevel}+)
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.76rem', color: '#64748b', padding: '10px', backgroundColor: '#f8fafc', borderRadius: '8px', marginBottom: '14px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Calendar size={13} /> {proj.startDate} - {proj.endDate}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Users size={13} /> Target Size: {proj.teamSize}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <DollarSign size={13} /> {proj.budget}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Briefcase size={13} /> {proj.progress}% Completed
                </span>
              </div>
            </div>

            {/* Action */}
            <button
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem' }}
              onClick={() => onSelectProjectForTeamBuilder(proj)}
            >
              <Sparkles size={14} color="#2563eb" />
              <span>Optimize Team in Builder →</span>
            </button>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-dialog" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Create New Project</h3>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>Project Name</label>
                <input type="text" className="search-input" defaultValue="AI Customer Retention Agent" style={{ marginTop: '4px' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>Department</label>
                  <select className="search-input" style={{ marginTop: '4px' }}>
                    <option>Data & AI</option>
                    <option>Cloud & DevOps</option>
                    <option>Engineering</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>Priority</label>
                  <select className="search-input" style={{ marginTop: '4px' }}>
                    <option>High Priority</option>
                    <option>Critical</option>
                    <option>Medium</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '600' }}>Required Core Skills</label>
                <input type="text" className="search-input" defaultValue="Python, Cloud Computing, PyTorch" style={{ marginTop: '4px' }} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={() => setShowCreateModal(false)}>Create Project</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
