import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCards from './components/StatCards';
import ProjectTeamBuilder from './components/ProjectTeamBuilder';
import WorkloadRebalancingCard from './components/WorkloadRebalancingCard';
import SkillGapRecommendationsCard from './components/SkillGapRecommendationsCard';
import AiAssistantPanel from './components/AiAssistantPanel';

// Modals
import WhyThisTeamModal from './components/modals/WhyThisTeamModal';
import RebalanceModal from './components/modals/RebalanceModal';
import EnrollTrainingModal from './components/modals/EnrollTrainingModal';
import EmployeeDetailModal from './components/modals/EmployeeDetailModal';

// Views
import AiAdvisorView from './components/views/AiAdvisorView';
import ProjectsView from './components/views/ProjectsView';
import TeamBuilderView from './components/views/TeamBuilderView';
import EmployeesView from './components/views/EmployeesView';
import WorkloadView from './components/views/WorkloadView';
import SkillsTrainingView from './components/views/SkillsTrainingView';
import ReportsView from './components/views/ReportsView';
import SettingsView from './components/views/SettingsView';

// Data & Logic
import { initialEmployees, initialProjects, initialSkillGaps } from './data/workforceData';
import {
  recommendOptimalTeam,
  analyzeWorkloadDistribution,
  simulateWorkloadReallocation
} from './utils/matchingEngine';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setEmployees] = useState(initialEmployees);
  const [projects, setProjects] = useState(initialProjects);
  const [selectedProject, setSelectedProject] = useState(initialProjects[0]); // Customer Analytics Platform
  const [skillGaps, setSkillGaps] = useState(initialSkillGaps);

  // Modals & Drawer state
  const [showAiDrawer, setShowAiDrawer] = useState(false);
  const [showWhyModal, setShowWhyModal] = useState(false);
  const [showRebalanceModal, setShowRebalanceModal] = useState(false);
  const [enrollGapTarget, setEnrollGapTarget] = useState(null);
  const [viewEmployeeTarget, setViewEmployeeTarget] = useState(null);

  // Rebalancing simulation state
  const [isRebalanced, setIsRebalanced] = useState(false);
  const [toast, setToast] = useState(null);

  // Derived state & algorithms
  const recommendation = recommendOptimalTeam(selectedProject, employees);
  const workloadStats = analyzeWorkloadDistribution(employees);
  const rebalanceSimulation = simulateWorkloadReallocation(employees);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Rebalance Handler
  const handleApplyRebalance = () => {
    setIsRebalanced(true);
    setShowRebalanceModal(false);
    showToast(`✓ Workload rebalancing applied! 104 weekly hours reallocated across 10 tasks. Overloaded staff reduced from 15% to 0% (Optimal: 96%).`);
  };

  // Confirm Team Handler
  const handleConfirmTeam = () => {
    showToast(`✓ Project team for "${selectedProject.name}" confirmed & locked!`);
  };

  // Recalculate Team
  const handleRecalculateTeam = () => {
    showToast(`AI Optimizer recalculated complementary team for "${selectedProject.name}".`);
  };

  // Training Enrollment Handler
  const handleEnrollTraining = (gap, employeeId) => {
    setSkillGaps(prev => prev.map(g => {
      if (g.id === gap?.id || g.skill === gap?.skill) {
        return { ...g, gap: Math.max(0, g.gap - 1), enrolledCount: (g.enrolledCount || 0) + 1 };
      }
      return g;
    }));
    showToast(`✓ Enrollment confirmed for ${gap?.skill}: ${gap?.suggestedTraining || 'Training'}!`);
  };

  return (
    <div className="app-container">
      {/* Dark Navy Sidebar with AI Assistant button */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showAiDrawer={showAiDrawer}
        onToggleAi={() => setShowAiDrawer(!showAiDrawer)}
      />

      {/* Main Wrapper */}
      <div className="main-wrapper">
        {/* Top Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelectEmployee={(emp) => setViewEmployeeTarget(emp)}
        />

        {/* Content Body: Center Main + Right AI Sidebar */}
        <div className="content-body">
          {/* Center Dashboard View */}
          <main className={`dashboard-center ${activeTab === 'ai-advisor' ? 'ai-advisor-mode' : ''}`}>
            {activeTab === 'overview' && (
              <>
                {/* Greeting */}
                <div className="greeting-section">
                  <h1 className="greeting-title">
                    Good Morning, Adithya 👋
                  </h1>
                  <p className="greeting-subtitle">
                    Here's your workforce overview and actionable insights.
                  </p>
                </div>

                {/* 4 Metric KPI Cards */}
                <StatCards
                  employeesCount={employees.length}
                  projectsCount={projects.length}
                  avgUtilization={workloadStats.avgUtilization}
                  skillGapsCount={skillGaps.reduce((acc, g) => acc + g.gap, 0)}
                />


                {/* Center Flagship Widget: Project Team Builder */}
                <ProjectTeamBuilder
                  projects={projects}
                  selectedProject={selectedProject}
                  setSelectedProject={setSelectedProject}
                  employees={employees}
                  recommendation={recommendation}
                  onRecalculateTeam={handleRecalculateTeam}
                  onConfirmTeam={handleConfirmTeam}
                  onViewEmployeeDetails={(emp) => setViewEmployeeTarget(emp)}
                />

                {/* Bottom Row: Workload Rebalancing & Allocation + Skill Gap & Training Recommendations */}
                <div className="bottom-grid">
                  <WorkloadRebalancingCard
                    stats={workloadStats}
                    isRebalanced={isRebalanced}
                    onOpenRebalance={() => setShowRebalanceModal(true)}
                    onSelectEmployee={(emp) => setViewEmployeeTarget(emp)}
                  />

                  <SkillGapRecommendationsCard
                    onEnrollTraining={(gap) => setEnrollGapTarget(gap)}
                  />
                </div>
              </>
            )}

            {/* AI Advisor Tab: Chat anything with the AI Assistant Agent */}
            {activeTab === 'ai-advisor' && (
              <AiAdvisorView
                projects={projects}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                employees={employees}
                recommendation={recommendation}
                workloadStats={workloadStats}
                skillGaps={skillGaps}
                onOpenRebalanceModal={() => setShowRebalanceModal(true)}
                onOpenWhyModal={() => setShowWhyModal(true)}
                onViewEmployee={(emp) => setViewEmployeeTarget(emp)}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}

            {/* Other Navigation Tabs */}
            {activeTab === 'projects' && (
              <ProjectsView
                projects={projects}
                employees={employees}
                onSelectProjectForTeamBuilder={(p) => {
                  setSelectedProject(p);
                  setActiveTab('overview');
                }}
              />
            )}

            {activeTab === 'team-builder' && (
              <TeamBuilderView
                projects={projects}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                employees={employees}
                onViewEmployeeDetails={(emp) => setViewEmployeeTarget(emp)}
              />
            )}

            {activeTab === 'employees' && (
              <EmployeesView employees={employees} />
            )}

            {activeTab === 'workload' && (
              <WorkloadView
                employees={employees}
                isRebalanced={isRebalanced}
                onApplyRebalance={handleApplyRebalance}
                onOpenRebalanceModal={() => setShowRebalanceModal(true)}
              />
            )}

            {activeTab === 'skills-training' && (
              <SkillsTrainingView
                gaps={skillGaps}
                employees={employees}
                onEnroll={handleEnrollTraining}
              />
            )}

            {activeTab === 'reports' && (
              <ReportsView stats={workloadStats} projects={projects} />
            )}

            {activeTab === 'settings' && (
              <SettingsView />
            )}
          </main>
        </div>
      </div>

      {/* AI Assistant Slide-over Drawer (toggled via Left Sidebar AI Assistant button) */}
      {showAiDrawer && (
        <>
          <div className="ai-drawer-overlay" onClick={() => setShowAiDrawer(false)}></div>
          <div className="ai-drawer">
            <AiAssistantPanel
              selectedProject={selectedProject}
              recommendation={recommendation}
              workloadStats={workloadStats}
              skillGaps={skillGaps}
              onSelectProject={(p) => setSelectedProject(p)}
              onOpenWhyModal={() => setShowWhyModal(true)}
              onOpenRebalanceModal={() => setShowRebalanceModal(true)}
              onOpenTrainingModal={() => setEnrollGapTarget(skillGaps[0])}
              onClose={() => setShowAiDrawer(false)}
            />
          </div>
        </>
      )}

      {/* Global Modals */}
      {showWhyModal && (
        <WhyThisTeamModal
          project={selectedProject}
          recommendation={recommendation}
          onClose={() => setShowWhyModal(false)}
        />
      )}

      {showRebalanceModal && (
        <RebalanceModal
          simulationData={rebalanceSimulation}
          onApply={handleApplyRebalance}
          onClose={() => setShowRebalanceModal(false)}
        />
      )}

      {enrollGapTarget && (
        <EnrollTrainingModal
          gap={enrollGapTarget}
          employees={employees}
          onClose={() => setEnrollGapTarget(null)}
          onConfirmEnroll={handleEnrollTraining}
        />
      )}

      {viewEmployeeTarget && (
        <EmployeeDetailModal
          employee={viewEmployeeTarget}
          onClose={() => setViewEmployeeTarget(null)}
        />
      )}

      {/* Notification Toast */}
      {toast && (
        <div className="toast-banner">
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
