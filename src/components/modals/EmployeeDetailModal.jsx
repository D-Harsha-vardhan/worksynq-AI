import React from 'react';
import { X, Award, Briefcase, Clock, ShieldCheck, AlertTriangle, Star } from 'lucide-react';

export default function EmployeeDetailModal({ employee, onClose }) {
  if (!employee) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '620px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src={employee.avatar}
              alt={employee.name}
              style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #2563eb' }}
            />
            <div>
              <h3 className="modal-title">{employee.name}</h3>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                {employee.role} • {employee.department}
              </div>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Quick Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', backgroundColor: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Workload</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: employee.workload > 100 ? '#ef4444' : '#0f172a' }}>
                {employee.workload}%
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Experience</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a' }}>
                {employee.experienceYears}y
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Performance</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                <Star size={14} fill="#f59e0b" /> {employee.rating}
              </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Burnout Risk</div>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: employee.burnoutRisk === 'High' ? '#ef4444' : '#10b981', marginTop: '4px' }}>
                {employee.burnoutRisk}
              </div>
            </div>
          </div>

          {/* Skill Breakdown */}
          <div>
            <h4 style={{ fontSize: '0.86rem', fontWeight: '700', color: '#0f172a', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Award size={16} color="#2563eb" /> Verified Competencies &amp; Experience
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {employee.skills.map((s, idx) => (
                <div key={idx} style={{ padding: '8px 12px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>
                    <span>{s.name} ({s.years} yrs)</span>
                    <span style={{ color: '#2563eb' }}>{s.level} (Level {s.score}/5)</span>
                  </div>
                  <div className="skill-bar-track" style={{ height: '6px' }}>
                    <div
                      className="skill-bar-fill"
                      style={{ width: `${(s.score / 5) * 100}%`, backgroundColor: '#2563eb' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Projects */}
          <div>
            <h4 style={{ fontSize: '0.86rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Briefcase size={16} color="#64748b" /> Current Project Engagements
            </h4>
            {employee.currentProjects && employee.currentProjects.length > 0 ? (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {employee.currentProjects.map((p, i) => (
                  <span key={i} style={{ fontSize: '0.78rem', backgroundColor: '#eff6ff', color: '#1e40af', padding: '4px 10px', borderRadius: '6px', border: '1px solid #bfdbfe' }}>
                    {p}
                  </span>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: '0.78rem', color: '#10b981' }}>
                Currently available for new project allocations.
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
