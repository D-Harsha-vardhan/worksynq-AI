import React, { useState } from 'react';
import { GraduationCap, Award, BookOpen, AlertCircle, CheckCircle2, DollarSign, Clock } from 'lucide-react';
import EnrollTrainingModal from '../modals/EnrollTrainingModal';

export default function SkillsTrainingView({ gaps, employees, onEnroll }) {
  const [selectedGap, setSelectedGap] = useState(null);

  return (
    <div>
      <div style={{ marginBottom: '22px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a' }}>
          Skills Matrix &amp; Upskilling Academy
        </h2>
        <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
          Identify organizational capability gaps and sponsor targeted training courses for rapid skill uplift.
        </p>
      </div>

      {/* Gaps Catalog Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
        {gaps.map(gap => (
          <div key={gap.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a' }}>{gap.skill}</h3>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Provider: {gap.courseProvider}</div>
                </div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: '700',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    backgroundColor: gap.urgency === 'High' ? '#fef2f2' : '#fffbeb',
                    color: gap.urgency === 'High' ? '#ef4444' : '#d97706'
                  }}
                >
                  {gap.urgency} Urgency
                </span>
              </div>

              {/* Stats Bar */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', padding: '10px', backgroundColor: '#f8fafc', borderRadius: '8px', marginBottom: '14px', textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Required</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a' }}>{gap.required}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Available</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a' }}>{gap.available}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#ef4444' }}>Deficit Gap</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ef4444' }}>{gap.gap}</div>
                </div>
              </div>

              {/* Recommended Course */}
              <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', fontWeight: '700', color: '#1e40af', marginBottom: '4px' }}>
                  <BookOpen size={16} />
                  <span>{gap.suggestedTraining}</span>
                </div>
                <div style={{ display: 'flex', gap: '14px', fontSize: '0.74rem', color: '#3b82f6', marginTop: '6px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {gap.duration}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><DollarSign size={12} /> {gap.cost}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Award size={12} /> Level +1 Uplift</span>
                </div>
              </div>
            </div>

            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem' }}
              onClick={() => setSelectedGap(gap)}
            >
              <GraduationCap size={15} />
              <span>Enroll Workforce Member</span>
            </button>
          </div>
        ))}
      </div>

      {selectedGap && (
        <EnrollTrainingModal
          gap={selectedGap}
          employees={employees}
          onClose={() => setSelectedGap(null)}
          onConfirmEnroll={(g, empId) => {
            if (onEnroll) onEnroll(g, empId);
            setSelectedGap(null);
          }}
        />
      )}
    </div>
  );
}
