import React, { useState } from 'react';
import {
  Sparkles,
  PlayCircle,
  ShieldCheck,
  CheckCircle2,
  Users,
  DollarSign,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  Layers,
  Check
} from 'lucide-react';

export const STAGES = [
  {
    id: 'backlog',
    title: 'Backlog / Team Matching',
    description: 'Upcoming projects needing AI skill matching & staffing',
    icon: Sparkles,
    color: '#8b5cf6',
    bgColor: '#f5f3ff',
    borderColor: '#ddd6fe',
    badgeColor: '#7c3aed'
  },
  {
    id: 'active',
    title: 'Active Delivery',
    description: 'Active development sprint cycles',
    icon: PlayCircle,
    color: '#2563eb',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe',
    badgeColor: '#1d4ed8'
  },
  {
    id: 'testing',
    title: 'Testing & Review',
    description: 'Security audits, QA verification & client reviews',
    icon: ShieldCheck,
    color: '#f59e0b',
    bgColor: '#fffbeb',
    borderColor: '#fde68a',
    badgeColor: '#b45309'
  },
  {
    id: 'completed',
    title: 'Delivered / Completed',
    description: 'Successfully launched and closed projects',
    icon: CheckCircle2,
    color: '#10b981',
    bgColor: '#ecfdf5',
    borderColor: '#a7f3d0',
    badgeColor: '#047857'
  }
];

export const formatBudgetInLakhs = (budgetStr) => {
  if (!budgetStr) return '₹0.0L';
  if (typeof budgetStr === 'string' && budgetStr.endsWith('L')) return budgetStr;
  const num = parseInt(budgetStr.toString().replace(/[^\d]/g, ''), 10);
  if (isNaN(num)) return budgetStr;
  if (num >= 100000) {
    const lakhs = (num / 100000).toFixed(1);
    return `₹${lakhs}L`;
  }
  return `₹${num}`;
};

export default function KanbanBoard({
  projects,
  projectStages,
  onMoveStage,
  onSelectProjectForTeamBuilder
}) {
  const [draggedProjectId, setDraggedProjectId] = useState(null);
  const [dragOverStageId, setDragOverStageId] = useState(null);

  // Drag and Drop handlers
  const handleDragStart = (e, projectId) => {
    e.dataTransfer.setData('text/plain', projectId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedProjectId(projectId);
  };

  const handleDragEnd = () => {
    setDraggedProjectId(null);
    setDragOverStageId(null);
  };

  const handleDragOver = (e, stageId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverStageId !== stageId) {
      setDragOverStageId(stageId);
    }
  };

  const handleDragLeave = (e, stageId) => {
    // Prevent flickering when hovering over children
    if (e.currentTarget.contains(e.relatedTarget)) return;
    if (dragOverStageId === stageId) {
      setDragOverStageId(null);
    }
  };

  const handleDrop = (e, stageId) => {
    e.preventDefault();
    const projectId = e.dataTransfer.getData('text/plain') || draggedProjectId;
    if (projectId) {
      onMoveStage(projectId, stageId);
    }
    setDraggedProjectId(null);
    setDragOverStageId(null);
  };

  // Stage shifting helper (← Back / Next Stage →)
  const getStageIndex = (stageId) => STAGES.findIndex(s => s.id === stageId);

  const handleShiftStage = (projectId, currentStageId, direction) => {
    const currentIndex = getStageIndex(currentStageId);
    const targetIndex = currentIndex + direction;
    if (targetIndex >= 0 && targetIndex < STAGES.length) {
      onMoveStage(projectId, STAGES[targetIndex].id);
    }
  };

  const getPriorityStyle = (priority = '') => {
    const p = priority.toLowerCase();
    if (p.includes('critical') || p.includes('high')) {
      return {
        bg: '#fef2f2',
        color: '#dc2626',
        border: '#fecaca'
      };
    }
    if (p.includes('medium')) {
      return {
        bg: '#fffbeb',
        color: '#d97706',
        border: '#fde68a'
      };
    }
    return {
      bg: '#eff6ff',
      color: '#2563eb',
      border: '#bfdbfe'
    };
  };

  return (
    <div className="kanban-board-container">
      <div className="kanban-grid">
        {STAGES.map((stage, stageIndex) => {
          const StageIcon = stage.icon;
          const stageProjects = projects.filter(p => (projectStages[p.id] || 'backlog') === stage.id);
          const isDragOver = dragOverStageId === stage.id;

          return (
            <div
              key={stage.id}
              className={`kanban-column ${isDragOver ? 'is-drag-over' : ''}`}
              onDragOver={(e) => handleDragOver(e, stage.id)}
              onDragLeave={(e) => handleDragLeave(e, stage.id)}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              {/* Column Header */}
              <div className="kanban-column-header">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      className="kanban-column-icon"
                      style={{
                        backgroundColor: stage.bgColor,
                        color: stage.color,
                        borderColor: stage.borderColor
                      }}
                    >
                      <StageIcon size={16} />
                    </div>
                    <span className="kanban-column-title">{stage.title}</span>
                  </div>

                  <span
                    className="kanban-count-pill"
                    style={{
                      backgroundColor: stage.bgColor,
                      color: stage.badgeColor,
                      borderColor: stage.borderColor
                    }}
                  >
                    {stageProjects.length}
                  </span>
                </div>
                <p className="kanban-column-desc">{stage.description}</p>
              </div>

              {/* Cards Container */}
              <div className="kanban-cards-list">
                {stageProjects.length === 0 ? (
                  <div className="kanban-empty-dropzone">
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      {isDragOver ? 'Drop project here' : 'No projects in this stage'}
                    </span>
                  </div>
                ) : (
                  stageProjects.map((proj) => {
                    const isDragging = draggedProjectId === proj.id;
                    const pStyle = getPriorityStyle(proj.priority);
                    const isFirstStage = stageIndex === 0;
                    const isLastStage = stageIndex === STAGES.length - 1;

                    return (
                      <div
                        key={proj.id}
                        className={`kanban-card ${isDragging ? 'is-dragging' : ''}`}
                        draggable={true}
                        onDragStart={(e) => handleDragStart(e, proj.id)}
                        onDragEnd={handleDragEnd}
                      >
                        {/* Top Metadata: ID & Priority */}
                        <div className="kanban-card-top">
                          <span className="kanban-id-badge">{proj.id}</span>
                          <span
                            className="kanban-priority-pill"
                            style={{
                              backgroundColor: pStyle.bg,
                              color: pStyle.color,
                              borderColor: pStyle.border
                            }}
                          >
                            {proj.priority}
                          </span>
                        </div>

                        {/* Title & Department */}
                        <div className="kanban-card-main">
                          <h4 className="kanban-project-title" title={proj.name}>
                            {proj.name}
                          </h4>
                          <div className="kanban-dept-tag">
                            <Building2 size={12} color="#64748b" />
                            <span>{proj.department}</span>
                          </div>
                        </div>

                        {/* Required Skills Tags with Proficiency Levels */}
                        <div className="kanban-skills-section">
                          <div className="kanban-skills-label">Required Skills:</div>
                          <div className="kanban-skills-wrap">
                            {proj.requiredSkills && proj.requiredSkills.map((req, i) => (
                              <span key={i} className="kanban-skill-badge">
                                {req.name} <strong style={{ color: '#2563eb' }}>L{req.minLevel || 3}</strong>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Meta: Budget in Lakhs & Team Headcount */}
                        <div className="kanban-card-meta">
                          <div className="kanban-meta-item">
                            <span className="kanban-meta-label">Budget</span>
                            <span className="kanban-meta-val" style={{ color: '#0f172a', fontWeight: '700' }}>
                              {formatBudgetInLakhs(proj.budget)}
                            </span>
                          </div>
                          <div className="kanban-meta-item" style={{ textAlign: 'right' }}>
                            <span className="kanban-meta-label">Team Target</span>
                            <span className="kanban-meta-val" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                              <Users size={12} color="#64748b" />
                              {proj.teamSize} members
                            </span>
                          </div>
                        </div>

                        {/* Smart Action CTA */}
                        {stage.id === 'backlog' && (
                          <button
                            type="button"
                            className="kanban-cta-glow-btn"
                            onClick={() => onSelectProjectForTeamBuilder(proj)}
                          >
                            <Sparkles size={14} />
                            <span>✨ Form Team (AI)</span>
                          </button>
                        )}

                        {stage.id === 'completed' && (
                          <div className="kanban-completed-badge">
                            <CheckCircle2 size={14} color="#059669" />
                            <span>✓ Production Ready</span>
                          </div>
                        )}

                        {/* Manual Stage Shifter Controls */}
                        <div className="kanban-stage-shifter">
                          <button
                            type="button"
                            className="kanban-shifter-btn"
                            disabled={isFirstStage}
                            onClick={() => handleShiftStage(proj.id, stage.id, -1)}
                            title={isFirstStage ? 'At first stage' : 'Move to previous stage'}
                          >
                            <ChevronLeft size={13} />
                            <span>Back</span>
                          </button>

                          <div className="kanban-shifter-indicator">
                            {STAGES.map((s, idx) => (
                              <span
                                key={s.id}
                                className={`shifter-dot ${idx === stageIndex ? 'active' : ''}`}
                                style={{
                                  backgroundColor: idx === stageIndex ? stage.color : '#e2e8f0'
                                }}
                              />
                            ))}
                          </div>

                          <button
                            type="button"
                            className="kanban-shifter-btn primary-step"
                            disabled={isLastStage}
                            onClick={() => handleShiftStage(proj.id, stage.id, 1)}
                            title={isLastStage ? 'Completed' : 'Advance to next stage'}
                          >
                            <span>Next</span>
                            <ChevronRight size={13} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
