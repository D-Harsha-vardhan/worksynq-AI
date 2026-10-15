import React, { useState } from 'react';
import { X, RefreshCw, CheckCircle2, UserCheck } from 'lucide-react';
import { calculateEmployeeMatchScore } from '../../utils/matchingEngine';

export default function SwapMemberModal({ targetMember, allEmployees, project, onClose, onSwap }) {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const currentEmp = targetMember?.employee;

  // Filter out employees who are currently in the team
  const candidates = allEmployees
    .filter(e => e.id !== currentEmp?.id)
    .map(emp => ({
      employee: emp,
      ...calculateEmployeeMatchScore(emp, project)
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 6);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RefreshCw size={18} />
            </div>
            <div>
              <h3 className="modal-title">Swap Team Member</h3>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Replace {currentEmp?.name} ({targetMember?.matchScore}% Match)
              </div>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
            Select an alternative candidate evaluated by the multi-criteria matching engine:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '360px', overflowY: 'auto' }}>
            {candidates.map(c => {
              const emp = c.employee;
              const isSelected = selectedCandidate?.id === emp.id;
              return (
                <div
                  key={emp.id}
                  onClick={() => setSelectedCandidate(emp)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: `1px solid ${isSelected ? '#2563eb' : '#e2e8f0'}`,
                    backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={emp.avatar} alt={emp.name} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontSize: '0.86rem', fontWeight: '700', color: '#0f172a' }}>{emp.name}</div>
                      <div style={{ fontSize: '0.74rem', color: '#64748b' }}>{emp.role}</div>
                      <div style={{ fontSize: '0.7rem', color: '#3b82f6', marginTop: '2px' }}>
                        {emp.skills.slice(0, 3).map(s => s.name).join(', ')}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.86rem', fontWeight: '800', color: c.matchScore >= 80 ? '#059669' : '#0284c7' }}>
                      {c.matchScore}%
                    </div>
                    <div style={{ fontSize: '0.72rem', color: emp.workload > 100 ? '#ef4444' : '#10b981' }}>
                      {emp.workload}% allocated
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button
            className="btn-primary"
            disabled={!selectedCandidate}
            onClick={() => onSwap(selectedCandidate)}
            style={{ opacity: selectedCandidate ? 1 : 0.6 }}
          >
            <UserCheck size={15} />
            <span>Confirm Swap</span>
          </button>
        </div>
      </div>
    </div>
  );
}
