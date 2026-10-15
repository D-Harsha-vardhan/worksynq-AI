import React from 'react';
import { GraduationCap, ArrowRight, BookOpen } from 'lucide-react';

export default function SkillGapsTable({ gaps, onEnrollTraining }) {
  const displayGaps = gaps.slice(0, 4);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Skill Gaps & Training</h3>
        <span className="card-action-link" onClick={() => onEnrollTraining && onEnrollTraining(displayGaps[0])}>
          View All
        </span>
      </div>

      <table className="custom-table" style={{ fontSize: '0.76rem', marginBottom: 0 }}>
        <thead>
          <tr>
            <th style={{ padding: '6px 6px' }}>Skill</th>
            <th style={{ padding: '6px 4px', textAlign: 'center' }}>Req</th>
            <th style={{ padding: '6px 4px', textAlign: 'center' }}>Avail</th>
            <th style={{ padding: '6px 4px', textAlign: 'center' }}>Gap</th>
            <th style={{ padding: '6px 6px' }}>Suggested Training</th>
          </tr>
        </thead>
        <tbody>
          {displayGaps.map(g => (
            <tr
              key={g.id}
              style={{ cursor: 'pointer' }}
              onClick={() => onEnrollTraining && onEnrollTraining(g)}
              title="Click to view course & enroll eligible candidates"
            >
              <td style={{ padding: '8px 6px', fontWeight: '600', color: '#0f172a' }}>
                {g.skill}
              </td>
              <td style={{ padding: '8px 4px', textAlign: 'center', color: '#475569' }}>
                {g.required}
              </td>
              <td style={{ padding: '8px 4px', textAlign: 'center', color: '#475569' }}>
                {g.available}
              </td>
              <td style={{ padding: '8px 4px', textAlign: 'center' }}>
                <span
                  style={{
                    backgroundColor: g.gap > 1 ? '#fef2f2' : '#fffbeb',
                    color: g.gap > 1 ? '#ef4444' : '#d97706',
                    fontWeight: '700',
                    padding: '1px 6px',
                    borderRadius: '9999px',
                    fontSize: '0.7rem'
                  }}
                >
                  {g.gap}
                </span>
              </td>
              <td style={{ padding: '8px 6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#2563eb', fontWeight: '500' }}>
                  <BookOpen size={12} style={{ flexShrink: 0 }} />
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px' }}>
                    {g.suggestedTraining}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
