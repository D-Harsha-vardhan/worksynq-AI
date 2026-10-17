import React, { useState } from 'react';
import {
  Plus,
  Briefcase,
  Calendar,
  Users,
  DollarSign,
  Sparkles,
  CheckCircle2,
  Kanban,
  LayoutGrid,
  Search,
  Filter,
  X,
  Building2,
  ShieldAlert
} from 'lucide-react';
import KanbanBoard, { STAGES, formatBudgetInLakhs } from '../KanbanBoard';
import DocumentOcrUploader from '../DocumentOcrUploader';

const EMPTY_PROJECT_FORM = {
  name: '',
  department: 'Retail Banking',
  priority: 'High',
  budget: '',
  teamSize: '',
  skills: '',
  description: ''
};

export default function ProjectsView({ projects: initialProjectsList, employees, onSelectProjectForTeamBuilder }) {
  const [projectsList, setProjectsList] = useState(initialProjectsList);
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'grid'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDept, setFilterDept] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [extractedDocName, setExtractedDocName] = useState(null);
  const [isOcrHighlighted, setIsOcrHighlighted] = useState(false);

  // Initial stage mapping across the 4 lifecycle stages
  const [projectStages, setProjectStages] = useState({
    P08: 'backlog',
    P09: 'backlog',
    P10: 'backlog',
    P01: 'active',
    P02: 'active',
    P05: 'active',
    P03: 'testing',
    P06: 'testing',
    P07: 'testing',
    P04: 'completed',
    P11: 'completed'
  });

  // New Project Form State (starts completely empty, no pre-filled dummy data)
  const [newProject, setNewProject] = useState(EMPTY_PROJECT_FORM);

  const handleClearForm = () => {
    setNewProject(EMPTY_PROJECT_FORM);
    setExtractedDocName(null);
  };

  const handleOpenCreateModal = () => {
    handleClearForm();
    setShowCreateModal(true);
  };

  const availableDepts = ['All', ...new Set(projectsList.map(p => p.department).filter(Boolean))];

  // Stage transition handler
  const handleMoveStage = (projectId, newStageId) => {
    setProjectStages(prev => ({
      ...prev,
      [projectId]: newStageId
    }));
  };

  // Filtered projects
  const filtered = projectsList.filter(proj => {
    // Department Filter
    if (filterDept !== 'All' && proj.department !== filterDept) {
      return false;
    }
    // Priority Filter
    if (filterPriority !== 'All') {
      const p = (proj.priority || '').toLowerCase();
      if (!p.includes(filterPriority.toLowerCase())) {
        return false;
      }
    }
    // Search Query Filter (Title, Description, ID, Department)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = proj.name?.toLowerCase().includes(q);
      const matchDesc = proj.description?.toLowerCase().includes(q);
      const matchId = proj.id?.toLowerCase().includes(q);
      const matchDept = proj.department?.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchId && !matchDept) {
        return false;
      }
    }
    return true;
  });

  const hasActiveFilters = filterDept !== 'All' || filterPriority !== 'All' || searchQuery.trim() !== '';

  const handleClearFilters = () => {
    setFilterDept('All');
    setFilterPriority('All');
    setSearchQuery('');
  };

  const handleOcrExtracted = (extracted, fileName) => {
    setExtractedDocName(fileName);
    setNewProject({
      name: extracted.name || '',
      department: extracted.department || 'Retail Banking',
      priority: extracted.priority || 'High',
      budget: extracted.budget || '',
      teamSize: extracted.teamSize || '',
      skills: extracted.skills || '',
      description: extracted.summary || ''
    });
    setIsOcrHighlighted(true);
    setTimeout(() => setIsOcrHighlighted(false), 3000);
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.name.trim()) return;

    const newId = `P${String(projectsList.length + 1).padStart(2, '0')}`;
    const skillsArray = newProject.skills
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map((skillName, idx) => ({
        skillId: `S_${idx}`,
        name: skillName,
        minLevel: 3,
        weight: 1.0,
        isCritical: idx === 0,
        count: 1
      }));

    const created = {
      id: newId,
      name: newProject.name,
      description: `New initiative under ${newProject.department}`,
      status: 'Planning',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      teamSize: Number(newProject.teamSize) || 4,
      estimatedHoursPerPerson: 160,
      priority: newProject.priority,
      budget: newProject.budget || '₹3,500,000',
      department: newProject.department,
      requiredSkills: skillsArray.length > 0 ? skillsArray : [
        { skillId: 'S01', name: 'Python', minLevel: 3 },
        { skillId: 'S07', name: 'React', minLevel: 3 }
      ],
      progress: 0
    };

    setProjectsList(prev => [created, ...prev]);
    setProjectStages(prev => ({ ...prev, [newId]: 'backlog' }));
    setShowCreateModal(false);
    handleClearForm();
  };

  return (
    <div className="projects-view-page">
      {/* Header with Title and Mode Switcher */}
      <div className="projects-header-bar">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 className="projects-page-title">Active Projects Portfolio</h2>
            <span className="projects-total-pill">
              {projectsList.length} Initiatives
            </span>
          </div>
          <p className="projects-page-subtext">
            Monitor requirements, sprint lifecycle stages, and AI skill staffing across enterprise projects.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* View Mode Switcher (Shadcn aesthetic) */}
          <div className="view-mode-switcher">
            <button
              type="button"
              className={`view-mode-btn ${viewMode === 'kanban' ? 'active' : ''}`}
              onClick={() => setViewMode('kanban')}
              title="Kanban Board View"
            >
              <Kanban size={15} />
              <span>Kanban</span>
            </button>
            <button
              type="button"
              className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid Cards View"
            >
              <LayoutGrid size={15} />
              <span>Grid</span>
            </button>
          </div>

          <button
            type="button"
            className="btn-primary"
            onClick={handleOpenCreateModal}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={16} />
            <span>New Project</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Real-time Search, Priority Dropdown, Clear Filters */}
      <div className="projects-control-bar">
        {/* Search Input */}
        <div className="projects-search-wrap">
          <Search size={16} className="projects-search-icon" />
          <input
            type="text"
            className="projects-search-input"
            placeholder="Search by title, description, ID (e.g. P01), department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="projects-search-clear"
              onClick={() => setSearchQuery('')}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Priority Filter Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="priority-select-wrap">
            <Filter size={14} color="#64748b" />
            <select
              className="priority-select"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              className="projects-reset-btn"
              onClick={handleClearFilters}
              title="Reset all search filters"
            >
              <X size={13} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Department Filter Pills */}
      <div className="dept-pills-row">
        {availableDepts.map(dept => (
          <button
            key={dept}
            type="button"
            onClick={() => setFilterDept(dept)}
            className={`dept-pill-btn ${filterDept === dept ? 'active' : ''}`}
          >
            {dept}
          </button>
        ))}
        {hasActiveFilters && (
          <span className="results-count-badge">
            Showing {filtered.length} of {projectsList.length}
          </span>
        )}
      </div>

      {/* VIEW RENDER: Kanban Board or Grid Cards */}
      {viewMode === 'kanban' ? (
        <KanbanBoard
          projects={filtered}
          projectStages={projectStages}
          onMoveStage={handleMoveStage}
          onSelectProjectForTeamBuilder={onSelectProjectForTeamBuilder}
        />
      ) : (
        /* Traditional Grid Cards View (Updated with stage badges, Lakhs format, skill levels) */
        <div className="projects-grid-container">
          {filtered.length === 0 ? (
            <div className="projects-empty-state">
              <ShieldAlert size={36} color="#94a3b8" />
              <h3>No initiatives matched your filters</h3>
              <p>Try adjusting your search keywords, priority selection, or department filters.</p>
              <button className="btn-secondary" onClick={handleClearFilters}>Clear Filters</button>
            </div>
          ) : (
            filtered.map(proj => {
              const currentStageId = projectStages[proj.id] || 'backlog';
              const currentStage = STAGES.find(s => s.id === currentStageId) || STAGES[0];
              const isBacklog = currentStageId === 'backlog';

              return (
                <div key={proj.id} className="card project-card-modern">
                  <div>
                    {/* Header: ID, Title, Stage, Priority */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="kanban-id-badge">{proj.id}</span>
                        <span
                          className="kanban-count-pill"
                          style={{
                            fontSize: '0.68rem',
                            padding: '2px 8px',
                            backgroundColor: currentStage.bgColor,
                            color: currentStage.badgeColor,
                            borderColor: currentStage.borderColor
                          }}
                        >
                          {currentStage.title.split('/')[0]}
                        </span>
                      </div>
                      <span
                        className="kanban-priority-pill"
                        style={{
                          fontSize: '0.7rem',
                          backgroundColor: proj.priority?.includes('High') || proj.priority?.includes('Critical') ? '#eff6ff' : (proj.priority?.includes('Medium') ? '#f0f9ff' : '#f8fafc'),
                          color: proj.priority?.includes('High') || proj.priority?.includes('Critical') ? '#1d4ed8' : (proj.priority?.includes('Medium') ? '#0284c7' : '#475569'),
                          borderColor: proj.priority?.includes('High') || proj.priority?.includes('Critical') ? '#bfdbfe' : (proj.priority?.includes('Medium') ? '#bae6fd' : '#e2e8f0')
                        }}
                      >
                        {proj.priority}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.08rem', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                      {proj.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: '#64748b', marginBottom: '12px' }}>
                      <Building2 size={13} color="#94a3b8" />
                      <span>{proj.department}</span>
                    </div>

                    <p style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '14px', lineHeight: 1.45 }}>
                      {proj.description}
                    </p>

                    {/* Required Skills with L Levels */}
                    <div style={{ marginBottom: '14px' }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: '600', color: '#64748b', marginBottom: '6px' }}>
                        Required Skills:
                      </div>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {proj.requiredSkills && proj.requiredSkills.map((req, i) => (
                          <span key={i} className="kanban-skill-badge">
                            {req.name} <strong style={{ color: '#2563eb' }}>L{req.minLevel || 3}</strong>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="grid-card-meta-box">
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={13} color="#64748b" /> {proj.startDate} - {proj.endDate}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Users size={13} color="#64748b" /> Target Size: {proj.teamSize}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <DollarSign size={13} color="#64748b" /> {formatBudgetInLakhs(proj.budget)}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Briefcase size={13} color="#64748b" /> {proj.progress || 0}% Completed
                      </span>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div style={{ marginTop: '16px' }}>
                    {isBacklog ? (
                      <button
                        type="button"
                        className="kanban-cta-glow-btn"
                        onClick={() => onSelectProjectForTeamBuilder(proj)}
                      >
                        <Sparkles size={14} />
                        <span>✨ Form Team (AI)</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn-secondary"
                        style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem' }}
                        onClick={() => onSelectProjectForTeamBuilder(proj)}
                      >
                        <Sparkles size={14} color="#2563eb" />
                        <span>Optimize Team in Builder →</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Create New Project Modal with DronaHQ Document Intelligence Auto-Fill */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-dialog" onClick={e => e.stopPropagation()} style={{ maxWidth: '620px', maxHeight: '92vh', overflowY: 'auto' }}>
            <div className="modal-header">
              <h3 className="modal-title">Create New Project Initiative</h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                Upload an RFP or project document to auto-fill fields via DronaHQ Document Agent, or enter details manually.
              </p>
            </div>
            <form onSubmit={handleCreateProject}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Document OCR Auto-Fill Component */}
                <DocumentOcrUploader
                  onExtracted={handleOcrExtracted}
                  onClear={handleClearForm}
                  currentFileName={extractedDocName}
                />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '4px 0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: '700' }}>
                    <span>Review & Finalize Parameters</span>
                  </div>
                  {(newProject.name || newProject.budget || newProject.skills || newProject.teamSize || extractedDocName) && (
                    <button
                      type="button"
                      onClick={handleClearForm}
                      style={{
                        background: '#fef2f2',
                        border: '1px solid #fecaca',
                        color: '#dc2626',
                        fontSize: '0.72rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.15s ease'
                      }}
                      title="Clear all prefilled fields"
                    >
                      <X size={12} />
                      Clear Fields
                    </button>
                  )}
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1e293b' }}>Project Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Connect2Future - Custom Web & Mobile Platform"
                    className={`search-input ${isOcrHighlighted ? 'ocr-highlighted-field' : ''}`}
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    style={{ marginTop: '4px', width: '100%' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1e293b' }}>Client Department</label>
                    <select
                      className={`search-input ${isOcrHighlighted ? 'ocr-highlighted-field' : ''}`}
                      value={newProject.department}
                      onChange={(e) => setNewProject({ ...newProject, department: e.target.value })}
                      style={{ marginTop: '4px', width: '100%' }}
                    >
                      <option value="Retail Banking">Retail Banking</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Data Office">Data Office</option>
                      <option value="Risk">Risk</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Logistics">Logistics</option>
                      <option value="Compliance">Compliance</option>
                      <option value="AI Office">AI Office</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1e293b' }}>Priority</label>
                    <select
                      className={`search-input ${isOcrHighlighted ? 'ocr-highlighted-field' : ''}`}
                      value={newProject.priority}
                      onChange={(e) => setNewProject({ ...newProject, priority: e.target.value })}
                      style={{ marginTop: '4px', width: '100%' }}
                    >
                      <option value="High">High Priority</option>
                      <option value="Medium">Medium Priority</option>
                      <option value="Low">Low Priority</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1e293b' }}>Budget (INR)</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹31,86,000"
                      className={`search-input ${isOcrHighlighted ? 'ocr-highlighted-field' : ''}`}
                      value={newProject.budget}
                      onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                      style={{ marginTop: '4px', width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1e293b' }}>Target Headcount</label>
                    <input
                      type="number"
                      min="1"
                      max="15"
                      placeholder="e.g. 5"
                      className={`search-input ${isOcrHighlighted ? 'ocr-highlighted-field' : ''}`}
                      value={newProject.teamSize}
                      onChange={(e) => setNewProject({ ...newProject, teamSize: e.target.value })}
                      style={{ marginTop: '4px', width: '100%' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#1e293b' }}>Required Skills (comma separated)</label>
                  <input
                    type="text"
                    className={`search-input ${isOcrHighlighted ? 'ocr-highlighted-field' : ''}`}
                    value={newProject.skills}
                    onChange={(e) => setNewProject({ ...newProject, skills: e.target.value })}
                    placeholder="e.g. Flutter, Android, iOS, UI/UX (Figma), React, Node.js"
                    style={{ marginTop: '4px', width: '100%' }}
                  />
                </div>
              </div>
              <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleClearForm}
                  style={{ color: '#64748b' }}
                >
                  Clear Fields
                </button>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => {
                      setShowCreateModal(false);
                      handleClearForm();
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">Add to Backlog</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
