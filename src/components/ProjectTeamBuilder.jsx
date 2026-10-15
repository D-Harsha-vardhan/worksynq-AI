import React, { useState } from 'react';
import {
  FolderKanban,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  HelpCircle,
  MoreVertical,
  ArrowRight,
  RefreshCw,
  UserCheck
} from 'lucide-react';
import WhyThisTeamModal from './modals/WhyThisTeamModal';
import SwapMemberModal from './modals/SwapMemberModal';

export default function ProjectTeamBuilder({
  projects,
  selectedProject,
  setSelectedProject,
  employees,
  recommendation,
  onRecalculateTeam,
  onConfirmTeam,
  onViewEmployeeDetails
}) {
  const [showWhyModal, setShowWhyModal] = useState(false);
  const [swapTarget, setSwapTarget] = useState(null);

  const team = recommendation?.recommendedMembers || [];
  const gaps = recommendation?.identifiedGaps || [];
  const currentProject = selectedProject || projects[0];

  return (
    <div className="team-builder-card">
      {/* Top Row: Project Header, Skills, and Actions */}
      <div className="builder-top-row">
        <div className="project-meta-left">
          <div className="project-icon-box">
            <FolderKanban size={24} />
          </div>
          <div>
            <div className="project-title-row">
              <select
                className="project-name-dropdown"
                value={currentProject?.id}
                onChange={(e) => {
                  const proj = projects.find(p => p.id === e.target.value);
                  if (proj) setSelectedProject(proj);
                }}
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <span className="priority-pill priority-high">
                {currentProject?.priority || 'High Priority'}
              </span>
            </div>
            <div className="project-details-sub">
              <span>{currentProject?.startDate} - {currentProject?.endDate}</span>
              <span>•</span>
              <span>Team Size: {team.length || currentProject?.teamSize || 3}</span>
              <span>•</span>
              <span>Est. {currentProject?.estimatedHoursPerPerson || 160} hrs/person</span>
            </div>
          </div>
        </div>

        {/* Required Skills & Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div className="req-skills-wrapper">
            <span className="req-skills-label">Required Skills</span>
            {currentProject?.requiredSkills?.slice(0, 3).map((req, idx) => (
              <span key={idx} className="skill-tag skill-tag-primary">
                {req.name} ({req.minLevel})
              </span>
            ))}
            {currentProject?.requiredSkills?.length > 3 && (
              <span className="skill-tag">
                +{currentProject.requiredSkills.length - 3} more
              </span>
            )}
          </div>

          <button
            className="btn-primary"
            onClick={onRecalculateTeam}
            title="Run AI Combinatorial Optimization"
          >
            <Sparkles size={16} />
            <span>Recommend Team</span>
          </button>
        </div>
      </div>

      {/* Recommended Team Table */}
      <table className="custom-table">
        <thead>
          <tr>
            <th style={{ width: '40px' }}>#</th>
            <th>Employee</th>
            <th>Role</th>
            <th>Skills (Top 3)</th>
            <th>Match Score</th>
            <th>Availability</th>
            <th>Capacity</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {team.map((member, index) => {
            const emp = member.employee;
            const topSkills = emp.skills.slice(0, 3).map(s => s.name).join(', ');
            const isMatchHigh = member.matchScore >= 85;

            return (
              <tr key={emp.id}>
                <td style={{ color: '#94a3b8', fontWeight: '600' }}>{index + 1}</td>
                <td>
                  <div
                    className="emp-cell"
                    style={{ cursor: 'pointer' }}
                    onClick={() => onViewEmployeeDetails(emp)}
                  >
                    <img src={emp.avatar} alt={emp.name} className="emp-avatar" />
                    <div>
                      <div className="emp-name">{emp.name}</div>
                      <div className="emp-role-sub">{emp.role}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="role-badge">{emp.role}</span>
                </td>
                <td style={{ color: '#334155', fontWeight: '500' }}>
                  {topSkills}
                </td>
                <td>
                  <div className={`match-score-badge ${isMatchHigh ? 'match-high' : 'match-med'}`}>
                    <span className="score-indicator-circle">
                      <CheckCircle2 size={14} />
                    </span>
                    <span>{member.matchScore}%</span>
                  </div>
                </td>
                <td>
                  <div className="status-indicator">
                    <span
                      className="status-dot"
                      style={{ backgroundColor: emp.workload > 100 ? '#ef4444' : '#10b981' }}
                    ></span>
                    <span style={{ color: emp.workload > 100 ? '#dc2626' : '#059669', fontWeight: '600' }}>
                      {emp.workload > 100 ? 'Overallocated' : 'Available'}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="capacity-meter">
                    <div className="capacity-track">
                      <div
                        className="capacity-bar"
                        style={{
                          width: `${Math.min(100, emp.capacity)}%`,
                          backgroundColor: emp.capacity > 90 ? '#10b981' : '#3b82f6'
                        }}
                      ></div>
                    </div>
                    <span className="capacity-text">{emp.capacity}%</span>
                  </div>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    className="icon-btn"
                    style={{ width: '28px', height: '28px', marginLeft: 'auto' }}
                    onClick={() => setSwapTarget(member)}
                    title="Swap team member"
                  >
                    <RefreshCw size={13} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Bottom Bar: Identified Gaps & Explainability Trigger */}
      <div className="builder-bottom-bar">
        <div className="gaps-container">
          <div className="gaps-label">
            <AlertTriangle size={15} color="#ef4444" />
            <span>Identified Gaps:</span>
          </div>
          {gaps.length > 0 ? (
            gaps.map((gap, i) => (
              <span key={i} className="gap-pill">
                {gap.skill} ({gap.missingCount})
              </span>
            ))
          ) : (
            <span style={{ fontSize: '0.76rem', color: '#10b981', fontWeight: '600' }}>
              ✓ All required skills fully covered!
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            className="btn-why-team"
            onClick={() => setShowWhyModal(true)}
            title="Explainable AI reasoning breakdown"
          >
            <Sparkles size={14} />
            <span>Why this Team?</span>
          </button>

          <button
            className="btn-primary"
            style={{ padding: '6px 14px', fontSize: '0.8rem' }}
            onClick={onConfirmTeam}
          >
            <UserCheck size={14} />
            <span>Confirm Team</span>
          </button>
        </div>
      </div>

      {/* Explainable AI Modal */}
      {showWhyModal && (
        <WhyThisTeamModal
          project={currentProject}
          recommendation={recommendation}
          onClose={() => setShowWhyModal(false)}
        />
      )}

      {/* Swap Candidate Modal */}
      {swapTarget && (
        <SwapMemberModal
          targetMember={swapTarget}
          allEmployees={employees}
          project={currentProject}
          onClose={() => setSwapTarget(null)}
          onSwap={(newEmp) => {
            // Replaces candidate in the team
            setSwapTarget(null);
          }}
        />
      )}
    </div>
  );
}
