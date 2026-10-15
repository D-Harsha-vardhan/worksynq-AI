import React, { useState } from 'react';
import { skillCoverageData } from '../data/workforceData';
import { X, Award, CheckCircle } from 'lucide-react';

export default function SkillCoverageCard() {
  const [showAllModal, setShowAllModal] = useState(false);

  // Show top 4 on card matching screenshot
  const displaySkills = skillCoverageData.slice(0, 4);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Skill Coverage</h3>
        <span className="card-action-link" onClick={() => setShowAllModal(true)}>
          View All
        </span>
      </div>

      <div className="skill-coverage-list">
        {displaySkills.map((skill, idx) => (
          <div key={idx} className="skill-bar-item">
            <div className="skill-bar-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: skill.color }}></span>
                {skill.name}
              </span>
              <span>{skill.percentage}%</span>
            </div>
            <div className="skill-bar-track">
              <div
                className="skill-bar-fill"
                style={{ width: `${skill.percentage}%`, backgroundColor: skill.color }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {showAllModal && (
        <div className="modal-overlay" onClick={() => setShowAllModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Award size={22} color="#2563eb" />
                <h3 className="modal-title">Organization Skill Inventory</h3>
              </div>
              <button className="icon-btn" onClick={() => setShowAllModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.84rem', color: '#64748b', marginBottom: '18px' }}>
                Aggregated capability coverage across all 60 technical workforce members.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {skillCoverageData.map((s, idx) => (
                  <div key={idx} style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: s.color }}></span>
                        {s.name}
                      </span>
                      <span>{s.count} / {s.total} employees ({s.percentage}%)</span>
                    </div>
                    <div className="skill-bar-track" style={{ height: '8px' }}>
                      <div className="skill-bar-fill" style={{ width: `${s.percentage}%`, backgroundColor: s.color }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowAllModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
