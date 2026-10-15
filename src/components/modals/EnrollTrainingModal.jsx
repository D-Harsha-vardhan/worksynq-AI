import React, { useState } from 'react';
import { X, GraduationCap, CheckCircle2, Clock, DollarSign, Award, Users, BookOpen, ExternalLink } from 'lucide-react';
import { getCourseUrl } from '../../utils/courseLinks';

export default function EnrollTrainingModal({ gap, employees = [], onClose, onConfirmEnroll }) {
  const [selectedEmpId, setSelectedEmpId] = useState(gap?.eligibleEmployees?.[0] || employees[0]?.id || 'E001');
  const [isSuccess, setIsSuccess] = useState(false);

  const eligible = employees.filter(e =>
    gap?.eligibleEmployees?.includes(e.id) || e.workload < 80
  ).slice(0, 5);

  const handleEnroll = () => {
    setIsSuccess(true);
    setTimeout(() => {
      if (onConfirmEnroll) onConfirmEnroll(gap, selectedEmpId);
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '580px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={20} />
            </div>
            <div>
              <h3 className="modal-title">Assign Targeted Upskilling</h3>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Close skill deficit for {gap?.skill}
              </div>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '30px 0' }}>
              <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 12px auto' }} />
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a' }}>Employee Enrolled!</h4>
              <p style={{ fontSize: '0.84rem', color: '#64748b', marginTop: '4px' }}>
                Training has been dispatched. Expected skill readiness upon course completion.
              </p>
            </div>
          ) : (
            <>
              {/* Course Overview Card */}
              <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '0.96rem', fontWeight: '700', color: '#0f172a' }}>
                      {gap?.suggestedTraining}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                      Provider: {gap?.courseProvider || 'Certified Cloud Native Academy'}
                    </div>
                  </div>
                  <a
                    href={getCourseUrl(gap?.skill, gap?.suggestedTraining)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open interactive course in a new tab"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '6px 12px',
                      backgroundColor: '#eff6ff',
                      color: '#1d4ed8',
                      borderRadius: '6px',
                      fontSize: '0.76rem',
                      fontWeight: '600',
                      textDecoration: 'none',
                      border: '1px solid #bfdbfe',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#dbeafe';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#eff6ff';
                    }}
                  >
                    <BookOpen size={13} />
                    <span>Open Course</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
                <div style={{ display: 'flex', gap: '18px', marginTop: '12px', fontSize: '0.78rem', color: '#334155' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} color="#64748b" /> {gap?.duration || '1 week'}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <DollarSign size={14} color="#64748b" /> {gap?.cost || '$499'}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={14} color="#10b981" /> +1 Skill Level Uplift
                  </span>
                </div>
              </div>

              {/* Select Eligible Employee */}
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px', display: 'block' }}>
                  Select Employee for Course Enrollment
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {eligible.map(emp => {
                    const isSelected = selectedEmpId === emp.id;
                    return (
                      <div
                        key={emp.id}
                        onClick={() => setSelectedEmpId(emp.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 14px',
                          borderRadius: '8px',
                          border: `1px solid ${isSelected ? '#2563eb' : '#e2e8f0'}`,
                          backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={emp.avatar} alt={emp.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                          <div>
                            <div style={{ fontSize: '0.84rem', fontWeight: '600', color: '#0f172a' }}>{emp.name}</div>
                            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{emp.role} • Capacity: {emp.capacity}%</div>
                          </div>
                        </div>
                        <input
                          type="radio"
                          name="emp-enroll"
                          checked={isSelected}
                          onChange={() => setSelectedEmpId(emp.id)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {!isSuccess && (
          <div className="modal-footer">
            <button className="btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn-primary" onClick={handleEnroll}>
              <GraduationCap size={15} />
              <span>Confirm Enrollment</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
