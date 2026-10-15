import React, { useState } from 'react';
import { Sparkles, Sliders, Users, AlertTriangle, CheckCircle2, RefreshCw, Award } from 'lucide-react';
import { recommendOptimalTeam } from '../../utils/matchingEngine';
import WhyThisTeamModal from '../modals/WhyThisTeamModal';
import SwapMemberModal from '../modals/SwapMemberModal';

export default function TeamBuilderView({
  projects,
  selectedProject,
  setSelectedProject,
  employees,
  onViewEmployeeDetails
}) {
  const currentProj = selectedProject || projects[0];
  const [teamSize, setTeamSize] = useState(currentProj?.teamSize || 3);
  const [skillWeight, setSkillWeight] = useState(55);
  const [availWeight, setAvailWeight] = useState(25);
  const [expWeight, setExpWeight] = useState(20);
  const [showWhyModal, setShowWhyModal] = useState(false);
  const [swapTarget, setSwapTarget] = useState(null);

  // Compute recommendation with custom weights
  const customWeights = {
    skillProficiency: skillWeight / 100,
    availability: availWeight / 100,
    experience: expWeight / 100
  };

  const recommendation = recommendOptimalTeam(currentProj, employees, teamSize, customWeights);
  const team = recommendation.recommendedMembers;
  const gaps = recommendation.identifiedGaps;

  return (
    <div>
      <div style={{ marginBottom: '22px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a' }}>
          Smart Team Optimization Studio
        </h2>
        <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
          Evaluate combinatorial skill sets, enforce bandwidth safety, and form optimal project-ready squads.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px' }}>
        {/* Left: Configuration & Optimization Sliders */}
        <div className="card" style={{ height: 'fit-content' }}>
          <div className="card-header">
            <h3 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sliders size={16} color="#2563eb" />
              Optimization Parameters
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#0f172a' }}>Target Project</label>
              <select
                className="search-input"
                style={{ marginTop: '6px', width: '100%' }}
                value={currentProj.id}
                onChange={(e) => {
                  const p = projects.find(item => item.id === e.target.value);
                  if (p) setSelectedProject(p);
                }}
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: '600' }}>
                <span>Team Size</span>
                <span style={{ color: '#2563eb', fontWeight: '700' }}>{teamSize} members</span>
              </div>
              <input
                type="range"
                min="2"
                max="6"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                style={{ width: '100%', marginTop: '6px' }}
              />
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
              <div style={{ fontSize: '0.74rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>
                Objective Weighting
              </div>

              {/* Skill Proficiency */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <span>Skill Competency</span>
                  <span style={{ fontWeight: '700' }}>{skillWeight}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={skillWeight}
                  onChange={(e) => setSkillWeight(Number(e.target.value))}
                  style={{ width: '100%', marginTop: '4px' }}
                />
              </div>

              {/* Availability & Bandwidth */}
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <span>Availability Buffer</span>
                  <span style={{ fontWeight: '700' }}>{availWeight}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={availWeight}
                  onChange={(e) => setAvailWeight(Number(e.target.value))}
                  style={{ width: '100%', marginTop: '4px' }}
                />
              </div>

              {/* Seniority */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <span>Seniority / Experience</span>
                  <span style={{ fontWeight: '700' }}>{expWeight}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={expWeight}
                  onChange={(e) => setExpWeight(Number(e.target.value))}
                  style={{ width: '100%', marginTop: '4px' }}
                />
              </div>
            </div>

            <button
              className="btn-why-team"
              style={{ justifyContent: 'center', padding: '10px' }}
              onClick={() => setShowWhyModal(true)}
            >
              <Sparkles size={14} />
              <span>Why this Team? (AI Explanation)</span>
            </button>
          </div>
        </div>

        {/* Right: Recommended Team Cards & Gaps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Header Summary */}
          <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#1e40af', fontWeight: '700' }}>
                Optimal Recommendation for {currentProj.name}
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1e3a8a', marginTop: '2px' }}>
                {recommendation.avgMatchScore}% Composite Fit Score
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ backgroundColor: '#ffffff', color: '#1e40af', fontSize: '0.75rem', fontWeight: '700', padding: '6px 12px', borderRadius: '6px', border: '1px solid #bfdbfe' }}>
                {team.length} Members Selected
              </span>
            </div>
          </div>

          {/* Member Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {team.map((member, idx) => {
              const emp = member.employee;
              return (
                <div key={emp.id} className="card" style={{ position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={emp.avatar} alt={emp.name} className="emp-avatar" />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0f172a' }}>{emp.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{emp.role}</div>
                      </div>
                    </div>
                    <span className="match-score-badge match-high" style={{ fontSize: '0.8rem' }}>
                      {member.matchScore}%
                    </span>
                  </div>

                  <div style={{ fontSize: '0.74rem', color: '#64748b', marginBottom: '8px' }}>
                    Key Skills:
                  </div>
                  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    {emp.skills.slice(0, 3).map((s, i) => (
                      <span key={i} className="skill-tag" style={{ fontSize: '0.7rem' }}>
                        {s.name} ({s.level})
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #f1f5f9', fontSize: '0.75rem' }}>
                    <span style={{ color: emp.workload > 100 ? '#ef4444' : '#10b981', fontWeight: '600' }}>
                      ● {emp.workload}% Allocated
                    </span>
                    <button
                      className="icon-btn"
                      style={{ width: '28px', height: '28px' }}
                      onClick={() => setSwapTarget(member)}
                      title="Swap candidate"
                    >
                      <RefreshCw size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Gaps Banner */}
          <div className="card" style={{ backgroundColor: '#fffbeb', borderColor: '#fde68a' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#b45309', fontWeight: '700', fontSize: '0.86rem', marginBottom: '6px' }}>
              <AlertTriangle size={16} />
              <span>Identified Skill Gaps for this Squad</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#78350f', lineHeight: 1.45 }}>
              {gaps.length > 0 ? (
                <span>
                  The squad lacks sufficient coverage for: <strong>{gaps.map(g => `${g.skill} (${g.missingCount})`).join(', ')}</strong>.
                  Enroll team members in targeted training to fulfill 100% project readiness.
                </span>
              ) : (
                <span>✓ All project skill requirements are completely fulfilled by this team composition!</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {showWhyModal && (
        <WhyThisTeamModal
          project={currentProj}
          recommendation={recommendation}
          onClose={() => setShowWhyModal(false)}
        />
      )}

      {swapTarget && (
        <SwapMemberModal
          targetMember={swapTarget}
          allEmployees={employees}
          project={currentProj}
          onClose={() => setSwapTarget(null)}
          onSwap={() => setSwapTarget(null)}
        />
      )}
    </div>
  );
}
