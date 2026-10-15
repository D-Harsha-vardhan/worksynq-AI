import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  UserCheck,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Award
} from 'lucide-react';
import { additionalSkillGapsSummary } from '../data/additionalWorkforceData';

export default function SkillGapRecommendationsCard({ onEnrollTraining }) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'critical', 'high', 'mentorship'
  const [searchQuery, setSearchQuery] = useState('');
  const [enrolledSkills, setEnrolledSkills] = useState({});

  // Filter skills based on tab and search
  const filteredGaps = additionalSkillGapsSummary.filter(item => {
    const matchesSearch = item.skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.recommendedCourse.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeFilter === 'critical') return item.criticalGaps > 0;
    if (activeFilter === 'high') return item.priority === 'High';
    if (activeFilter === 'mentorship') return item.action === 'Assign Mentor';
    return true;
  });

  const handleAction = (item) => {
    // Track local enrollment state
    setEnrolledSkills(prev => ({
      ...prev,
      [item.skill]: (prev[item.skill] || 0) + 1
    }));

    if (onEnrollTraining) {
      onEnrollTraining({
        id: `gap-${item.skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        skill: item.skill,
        gapText: item.gapText,
        gap: item.openGaps,
        suggestedTraining: item.recommendedCourse,
        courseProvider: item.action === 'Assign Mentor' ? 'Internal Mentorship' : 'Certified Academy',
        duration: '4-6 Weeks',
        cost: item.action === 'Assign Mentor' ? '₹0 (Internal)' : '₹14,999'
      });
    }
  };

  return (
    <div className="card skill-gap-recommendations-card" style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column' }}>
      {/* Title & Stats */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.08rem',
            fontWeight: '700',
            color: '#0f172a',
            margin: 0
          }}>
            Skill Gap &amp; Training Recommendations
          </h3>
          <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
            18 active technology gaps mapped to verified certification courses &amp; internal mentors
          </div>
        </div>

        <span style={{
          fontSize: '0.7rem',
          fontWeight: '700',
          backgroundColor: '#eff6ff',
          color: '#1d4ed8',
          border: '1px solid #bfdbfe',
          padding: '2px 8px',
          borderRadius: '9999px'
        }}>
          {filteredGaps.length} Gaps Listed
        </span>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '10px',
        marginBottom: '12px',
        flexWrap: 'wrap'
      }}>
        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {[
            { id: 'all', label: 'All Gaps (18)' },
            { id: 'critical', label: 'Critical Gaps (6)' },
            { id: 'high', label: 'High Priority (5)' },
            { id: 'mentorship', label: 'Mentorship (4)' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              style={{
                padding: '4px 9px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: activeFilter === f.id ? '700' : '500',
                backgroundColor: activeFilter === f.id ? '#1d4ed8' : '#f1f5f9',
                color: activeFilter === f.id ? '#ffffff' : '#475569',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Quick Search */}
        <div style={{ position: 'relative', width: '160px' }}>
          <Search size={12} style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '4px 8px 4px 26px',
              fontSize: '0.74rem',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Table Structure */}
      <div style={{ width: '100%', overflowX: 'auto', maxHeight: '310px', overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          {/* Header Row */}
          <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
            <tr style={{ backgroundColor: '#f1f5f9', borderRadius: '6px' }}>
              <th style={{
                padding: '8px 10px',
                fontSize: '0.8rem',
                fontWeight: '700',
                color: '#334155',
                borderTopLeftRadius: '6px',
                borderBottomLeftRadius: '6px'
              }}>
                Table
              </th>
              <th style={{
                padding: '8px 10px',
                fontSize: '0.8rem',
                fontWeight: '700',
                color: '#334155',
                width: '110px'
              }}>
                Gap
              </th>
              <th style={{
                padding: '8px 10px',
                fontSize: '0.8rem',
                fontWeight: '700',
                color: '#334155'
              }}>
                Recommended
              </th>
              <th style={{
                padding: '8px 10px',
                fontSize: '0.8rem',
                fontWeight: '700',
                color: '#334155',
                textAlign: 'center',
                width: '180px',
                borderTopRightRadius: '6px',
                borderBottomRightRadius: '6px'
              }}>
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredGaps.map((item, idx) => {
              const enrolledCount = enrolledSkills[item.skill] || item.inTraining;
              const isMentorship = item.action === 'Assign Mentor';
              return (
                <tr
                  key={item.skill}
                  style={{
                    borderBottom: idx < filteredGaps.length - 1 ? '1px solid #f1f5f9' : 'none',
                    transition: 'background-color 0.15s ease'
                  }}
                >
                  {/* Skill Name & Priority */}
                  <td style={{
                    padding: '12px 10px',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    color: '#0f172a'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>{item.skill}</span>
                      {item.criticalGaps > 0 && (
                        <span style={{
                          fontSize: '0.62rem',
                          padding: '1px 5px',
                          backgroundColor: '#fef2f2',
                          color: '#dc2626',
                          borderRadius: '4px',
                          fontWeight: '700'
                        }}>
                          Critical
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Gap Count */}
                  <td style={{
                    padding: '12px 10px',
                    fontSize: '0.8rem',
                    color: '#334155',
                    fontWeight: '500'
                  }}>
                    <span>{item.gapText}</span>
                    {enrolledCount > 0 && (
                      <span style={{ fontSize: '0.68rem', color: '#059669', display: 'block', fontWeight: '600' }}>
                        ✓ {enrolledCount} enrolled
                      </span>
                    )}
                  </td>

                  {/* Recommended Course / Mentor */}
                  <td style={{
                    padding: '12px 10px',
                    fontSize: '0.8rem',
                    color: isMentorship ? '#4f46e5' : '#1e293b',
                    fontWeight: isMentorship ? '600' : '500'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      {isMentorship ? (
                        <UserCheck size={13} color="#4f46e5" style={{ flexShrink: 0 }} />
                      ) : (
                        <BookOpen size={13} color="#2563eb" style={{ flexShrink: 0 }} />
                      )}
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '170px' }} title={item.recommendedCourse}>
                        {item.recommendedCourse}
                      </span>
                    </div>
                  </td>

                  {/* Action Button */}
                  <td style={{
                    padding: '12px 10px',
                    textAlign: 'center'
                  }}>
                    <button
                      className="btn-assign-course"
                      onClick={() => handleAction(item)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: isMentorship ? '#faf5ff' : '#ffffff',
                        color: isMentorship ? '#7c3aed' : '#1d4ed8',
                        border: isMentorship ? '1px solid #d8b4fe' : '1px solid #bfdbfe',
                        borderRadius: '6px',
                        fontSize: '0.74rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.15s ease'
                      }}
                      title={`Assign ${item.recommendedCourse}`}
                    >
                      {item.action}
                    </button>
                  </td>
                </tr>
              );
            })}

            {filteredGaps.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: 'center', padding: '24px 0', color: '#64748b', fontSize: '0.82rem' }}>
                  No matching skill gaps found for "{searchQuery}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
