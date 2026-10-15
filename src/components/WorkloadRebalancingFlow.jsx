import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Clock,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  Users,
  Search,
  Info,
  Lightbulb,
  ArrowRight,
  Code2,
  Layers,
  BarChart3,
  RefreshCw,
  Gauge
} from 'lucide-react';

export const initialRebalanceTasks = [
  {
    id: 'T1',
    taskName: 'Report Automation',
    skill: 'Python',
    hours: 8,
    skillMatch: 92,
    iconType: 'code',
    from: {
      id: 'E001',
      name: 'Ravi Shankar',
      role: 'Lead Backend Engineer',
      utilBefore: 118,
      utilAfter: 98,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    to: {
      id: 'E002',
      name: 'Anita Rao',
      role: 'Senior Backend Engineer',
      utilBefore: 40,
      utilAfter: 60,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
    },
    reason: 'Recipient has Python skills and spare capacity. Reduces overload and improves balance.',
    detailedReason: 'The recipient has the required Python skills and enough available capacity, while the transfer reduces the overloaded employee\'s workload.',
    status: 'accepted' // 'accepted' | 'rejected' | 'pending'
  },
  {
    id: 'T2',
    taskName: 'API Integration Support',
    skill: 'Python',
    hours: 6,
    skillMatch: 85,
    iconType: 'layers',
    from: {
      id: 'E001',
      name: 'Ravi Shankar',
      role: 'Lead Backend Engineer',
      utilBefore: 98,
      utilAfter: 83,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    to: {
      id: 'E026',
      name: 'Priya Nair',
      role: 'Backend Engineer',
      utilBefore: 50,
      utilAfter: 65,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    reason: 'Recipient has Python skills and spare capacity. Offloads API maintenance to available engineer.',
    detailedReason: 'Priya possesses full Python API framework proficiency and is operating at 50% capacity, leaving ample runway for integration endpoints.',
    status: 'accepted'
  },
  {
    id: 'T3',
    taskName: 'UI Dashboard Enhancements',
    skill: 'React',
    hours: 5,
    skillMatch: 78,
    iconType: 'dashboard',
    from: {
      id: 'E003',
      name: 'Karthik Subramanian',
      role: 'Lead Frontend Engineer',
      utilBefore: 113,
      utilAfter: 100,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    to: {
      id: 'E012',
      name: 'Vikram Seth',
      role: 'Frontend Engineer',
      utilBefore: 45,
      utilAfter: 58,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    reason: 'Transfers secondary UI refinement sprints to unburden lead developer.',
    detailedReason: 'Vikram has strong React and component architecture experience to handle dashboard enhancements independently.',
    status: 'accepted'
  },
  {
    id: 'T4',
    taskName: 'Sales Dashboards & Reporting',
    skill: 'Tableau',
    hours: 10,
    skillMatch: 88,
    iconType: 'analytics',
    from: {
      id: 'E028',
      name: 'Divya Menon',
      role: 'Senior Data Scientist',
      utilBefore: 125,
      utilAfter: 100,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    to: {
      id: 'E036',
      name: 'Zoya Ansari',
      role: 'Data Engineer',
      utilBefore: 35,
      utilAfter: 60,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
    },
    reason: 'Zoya Ansari has Tableau Level 3 skills with 65% capacity buffer to absorb reporting pipelines.',
    detailedReason: 'Transfers high-frequency executive dashboard queries to Zoya, who has validated Tableau expertise and available delivery bandwidth.',
    status: 'pending'
  },
  {
    id: 'T5',
    taskName: 'Ingestion Framework Pipeline',
    skill: 'Data Engineering',
    hours: 7,
    skillMatch: 81,
    iconType: 'layers',
    from: {
      id: 'E028',
      name: 'Divya Menon',
      role: 'Senior Data Scientist',
      utilBefore: 100,
      utilAfter: 83,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    to: {
      id: 'E031',
      name: 'Rajesh Pandey',
      role: 'Data Engineer',
      utilBefore: 60,
      utilAfter: 78,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    reason: 'Redistributes heavy ETL tasks within same data pod to maintain technical continuity.',
    detailedReason: 'Rajesh has deep knowledge of the pipeline schema and capacity to manage the streaming ingestion workers.',
    status: 'pending'
  },
  {
    id: 'T6',
    taskName: 'Database Schema Optimization',
    skill: 'SQL',
    hours: 14,
    skillMatch: 76,
    iconType: 'code',
    from: {
      id: 'E003',
      name: 'Karthik Subramanian',
      role: 'Lead Backend Engineer',
      utilBefore: 100,
      utilAfter: 78,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    to: {
      id: 'E055',
      name: 'Harsha Vardhan',
      role: 'Database Administrator',
      utilBefore: 40,
      utilAfter: 75,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    reason: 'Harsha specializes in SQL performance profiling and possesses ample delivery runway.',
    detailedReason: 'Harsha is certified in PostgreSQL indexing and query optimization, perfectly suited to take over relational migrations.',
    status: 'pending'
  },
  {
    id: 'T7',
    taskName: 'Cloud Security Audit & Policies',
    skill: 'AWS DevOps',
    hours: 12,
    skillMatch: 89,
    iconType: 'layers',
    from: {
      id: 'E016',
      name: 'Suresh Reddy',
      role: 'Staff DevOps Engineer',
      utilBefore: 115,
      utilAfter: 85,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    to: {
      id: 'E017',
      name: 'Nikhil Agarwal',
      role: 'Senior DevOps Engineer',
      utilBefore: 30,
      utilAfter: 60,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    reason: 'Nikhil has current AWS Solution Architect credential and available weekly bandwidth.',
    detailedReason: 'Nikhil holds AWS Security Specialty credentials and operates at only 30% weekly load, making this a zero-risk transfer.',
    status: 'pending'
  },
  {
    id: 'T8',
    taskName: 'Automated E2E Test Suite',
    skill: 'Cypress',
    hours: 16,
    skillMatch: 94,
    iconType: 'code',
    from: {
      id: 'E040',
      name: 'Meera Patel',
      role: 'Lead QA Engineer',
      utilBefore: 120,
      utilAfter: 80,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
    },
    to: {
      id: 'E042',
      name: 'Ananya Sharma',
      role: 'QA Engineer',
      utilBefore: 40,
      utilAfter: 80,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
    },
    reason: 'Ananya has high test automation proficiency and reduces Meera\'s sprint burden.',
    detailedReason: 'Ananya maintains the Cypress staging pipeline and has 24 hours of available bandwidth per week.',
    status: 'pending'
  },
  {
    id: 'T9',
    taskName: 'Event Streaming Consumer',
    skill: 'Node.js',
    hours: 9,
    skillMatch: 83,
    iconType: 'layers',
    from: {
      id: 'E044',
      name: 'Arun Kumar',
      role: 'Senior Systems Engineer',
      utilBefore: 110,
      utilAfter: 88,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    to: {
      id: 'E048',
      name: 'Deepak Verma',
      role: 'Backend Engineer',
      utilBefore: 45,
      utilAfter: 68,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    reason: 'Delegates asynchronous notification consumers to backend squad without delivery risk.',
    detailedReason: 'Deepak has demonstrated Node.js microservice experience and ample headroom to support asynchronous worker queues.',
    status: 'pending'
  },
  {
    id: 'T10',
    taskName: 'Mobile Client Performance Polish',
    skill: 'React Native',
    hours: 17,
    skillMatch: 90,
    iconType: 'dashboard',
    from: {
      id: 'E050',
      name: 'Rohan Joshi',
      role: 'Lead Mobile Engineer',
      utilBefore: 122,
      utilAfter: 80,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    to: {
      id: 'E052',
      name: 'Neha Gupta',
      role: 'Mobile Developer',
      utilBefore: 38,
      utilAfter: 80,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    reason: 'Direct 1:1 mobile stack alignment that eliminates single-point-of-failure on client release.',
    detailedReason: 'Neha has specialized React Native memory profiling experience, directly taking pressure off the lead engineer before launch.',
    status: 'pending'
  }
];

export default function WorkloadRebalancingFlow({
  initialScreen = 'overview', // 'overview' | 'analyze' | 'recommendations' | 'details' | 'confirm' | 'success'
  isRebalanced = false,
  onApplySuccess,
  onBackToOverview,
  isEmbeddedCard = false
}) {
  const [currentScreen, setCurrentScreen] = useState(isRebalanced ? 'success' : initialScreen);
  const [tasks, setTasks] = useState(initialRebalanceTasks);
  const [expandedTaskId, setExpandedTaskId] = useState('T1');
  const [selectedTaskForDetails, setSelectedTaskForDetails] = useState(initialRebalanceTasks[0]);
  const [showAllTasks, setShowAllTasks] = useState(false);

  // Analysis screen simulation stage
  const [analysisStage, setAnalysisStage] = useState(1);
  const [analysisProgress, setAnalysisProgress] = useState(25);

  useEffect(() => {
    if (isRebalanced) {
      setCurrentScreen('success');
    }
  }, [isRebalanced]);

  // Handle analysis progression
  useEffect(() => {
    if (currentScreen === 'analyze') {
      const timer1 = setTimeout(() => {
        setAnalysisStage(2);
        setAnalysisProgress(50);
      }, 600);

      const timer2 = setTimeout(() => {
        setAnalysisStage(3);
        setAnalysisProgress(75);
      }, 1200);

      const timer3 = setTimeout(() => {
        setAnalysisStage(4);
        setAnalysisProgress(100);
      }, 1800);

      const timer4 = setTimeout(() => {
        setCurrentScreen('recommendations');
      }, 2400);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [currentScreen]);

  const handleStartAnalysis = () => {
    setAnalysisStage(1);
    setAnalysisProgress(25);
    setCurrentScreen('analyze');
  };

  const handleAcceptTask = (taskId, e) => {
    if (e) e.stopPropagation();
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'accepted' } : t));
  };

  const handleRejectTask = (taskId, e) => {
    if (e) e.stopPropagation();
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: 'rejected' } : t));
  };

  const handleOpenDetails = (task) => {
    setSelectedTaskForDetails(task);
    setCurrentScreen('details');
  };

  const handleConfirmApply = () => {
    setCurrentScreen('success');
    if (onApplySuccess) {
      onApplySuccess({
        acceptedCount: acceptedTasks.length,
        hoursMoved: totalHoursAccepted
      });
    }
  };

  const acceptedTasks = tasks.filter(t => t.status === 'accepted');
  const totalHoursAccepted = acceptedTasks.reduce((sum, t) => sum + t.hours, 0);

  // Dynamic calculations for confirmation and success
  const affectedEmployeesCount = Math.min(10, Math.max(3, acceptedTasks.length * 2));
  const expectedBalanceScore = Math.min(88, 40 + Math.round((totalHoursAccepted / 104) * 46));

  // ==========================================
  // PANEL 1: Workload Rebalancing & Allocation (Overview Card)
  // ==========================================
  if (currentScreen === 'overview') {
    return (
      <div
        className="card"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          maxWidth: isEmbeddedCard ? '100%' : '760px',
          margin: isEmbeddedCard ? '0' : '0 auto'
        }}
      >
        {/* Header Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ffffff' }} />
          </div>
          <span style={{ fontSize: '0.84rem', fontWeight: '700', color: '#0f172a' }}>Workforce Intelligence</span>
          <span style={{ color: '#cbd5e1' }}>|</span>
          <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Workload Rebalancing &amp; Allocation</span>
        </div>

        {/* Card Title */}
        <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '14px' }}>
          Workload Rebalancing &amp; Allocation
        </h2>

        {/* Multi-segment Progress Bar */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a' }}>
              Overloaded (15%)
            </span>
            <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
              9 Engineers Overloaded
            </span>
          </div>

          <div style={{ display: 'flex', width: '100%', height: '10px', borderRadius: '9999px', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
            <div style={{ width: '15%', backgroundColor: '#ea580c' }} title="Overloaded (15%)" />
            <div style={{ width: '12%', backgroundColor: '#2563eb', marginLeft: '2px' }} title="Underutilized (12%)" />
            <div style={{ width: '73%', backgroundColor: '#10b981', marginLeft: '2px' }} title="Optimal (73%)" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '0.8rem', color: '#334155', fontWeight: '600' }}>
            <span>Underutilized (12%)</span>
            <span>Optimal (73%)</span>
          </div>
        </div>

        {/* CTA Button: Auto-Rebalance Tasks */}
        <button
          onClick={handleStartAnalysis}
          style={{
            width: '100%',
            padding: '11px 18px',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)',
            marginBottom: '18px',
            transition: 'background-color 0.15s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
        >
          <Sparkles size={16} />
          <span>Auto-Rebalance Tasks</span>
        </button>

        {/* Over-utilized staff section */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: '700', color: '#0f172a' }}>Over-utilized staff</span>
            <span style={{ fontSize: '0.74rem', fontWeight: '600', color: '#ea580c' }}>At Risk (&gt;100% Load)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', borderRadius: '6px', backgroundColor: '#ffffff', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80" alt="Divya Menon" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0f172a' }}>Divya Menon (125%)</div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Senior Data Scientist</div>
                </div>
              </div>
              <div style={{ width: '74px', height: '7px', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', backgroundColor: '#ea580c', borderRadius: '9999px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', borderRadius: '6px', backgroundColor: '#ffffff', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" alt="Ravi Shankar" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0f172a' }}>Ravi Shankar (118%)</div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Lead Backend Engineer</div>
                </div>
              </div>
              <div style={{ width: '74px', height: '7px', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: '92%', height: '100%', backgroundColor: '#ea580c', borderRadius: '9999px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Under-utilized staff section */}
        <div style={{ marginBottom: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: '700', color: '#0f172a' }}>Under-utilized staff</span>
            <span style={{ fontSize: '0.74rem', fontWeight: '600', color: '#2563eb' }}>Available Bandwidth</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', borderRadius: '6px', backgroundColor: '#ffffff', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80" alt="Zoya Ansari" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0f172a' }}>Zoya Ansari (35%)</div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Data Engineer</div>
                </div>
              </div>
              <div style={{ width: '74px', height: '7px', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: '35%', height: '100%', backgroundColor: '#10b981', borderRadius: '9999px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', borderRadius: '6px', backgroundColor: '#ffffff', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" alt="Anita Rao" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0f172a' }}>Anita Rao (40%)</div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Senior Backend Engineer</div>
                </div>
              </div>
              <div style={{ width: '74px', height: '7px', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: '40%', height: '100%', backgroundColor: '#10b981', borderRadius: '9999px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Link to Proposals */}
        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
          <button
            onClick={() => setCurrentScreen('recommendations')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              fontSize: '0.78rem',
              color: '#2563eb',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>View 10 Proposed Task Reallocations (104 hrs)</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // PANEL 2: Auto-Rebalance Tasks (Analyze Step / Progress Screen)
  // ==========================================
  if (currentScreen === 'analyze') {
    return (
      <div
        className="card"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          maxWidth: '760px',
          margin: '0 auto'
        }}
      >
        {/* Top Header with Back */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
          <button
            onClick={() => setCurrentScreen('overview')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              color: '#0f172a'
            }}
          >
            <ArrowLeft size={18} />
          </button>
          <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
            Auto-Rebalance Tasks
          </h2>
        </div>

        {/* 4-Step Stepper Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', padding: '0 8px' }}>
          {/* Step 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#2563eb', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '700' }}>
              1
            </div>
            <span style={{ fontSize: '0.74rem', fontWeight: '700', color: '#2563eb' }}>Analyze</span>
          </div>

          <div style={{ flex: 1, height: '2px', backgroundColor: '#e2e8f0', margin: '0 8px', marginBottom: '18px' }} />

          {/* Step 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #cbd5e1', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '700' }}>
              2
            </div>
            <span style={{ fontSize: '0.74rem', color: '#64748b' }}>Find Reallocations</span>
          </div>

          <div style={{ flex: 1, height: '2px', backgroundColor: '#e2e8f0', margin: '0 8px', marginBottom: '18px' }} />

          {/* Step 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #cbd5e1', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '700' }}>
              3
            </div>
            <span style={{ fontSize: '0.74rem', color: '#64748b' }}>Review &amp; Approve</span>
          </div>

          <div style={{ flex: 1, height: '2px', backgroundColor: '#e2e8f0', margin: '0 8px', marginBottom: '18px' }} />

          {/* Step 4 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '2px solid #cbd5e1', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '700' }}>
              4
            </div>
            <span style={{ fontSize: '0.74rem', color: '#64748b' }}>Apply Changes</span>
          </div>
        </div>

        {/* Hero Illustration / Icon & Title */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '22px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Search size={24} color="#2563eb" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', margin: '0 0 6px 0' }}>
              Analyzing Your Workforce...
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0, lineHeight: 1.45 }}>
              We're analyzing employee skills, availability, project assignments and current workload to find the best reallocation opportunities.
            </p>
          </div>
        </div>

        {/* Progress Bar Track */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.74rem', color: '#64748b' }}>Optimization Progress</span>
            <span style={{ fontSize: '0.74rem', fontWeight: '600', color: '#2563eb' }}>Step 1 of 4</span>
          </div>
          <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${analysisProgress}%`,
                height: '100%',
                backgroundColor: '#2563eb',
                borderRadius: '9999px',
                transition: 'width 0.5s ease'
              }}
            />
          </div>
        </div>

        {/* Checklist of Analysis Stages */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px', backgroundColor: '#fafafa', padding: '16px', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
          {/* Item 1 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a' }}>
              <CheckCircle2 size={16} color="#16a34a" />
              <span>Checking employee utilization &amp; capacity</span>
            </div>
            <span style={{ color: '#16a34a', fontWeight: '600' }}>Complete</span>
          </div>

          {/* Item 2 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a' }}>
              <CheckCircle2 size={16} color="#16a34a" />
              <span>Analyzing skills and compatibility</span>
            </div>
            <span style={{ color: '#16a34a', fontWeight: '600' }}>Complete</span>
          </div>

          {/* Item 3 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a' }}>
              <CheckCircle2 size={16} color="#16a34a" />
              <span>Reviewing leave dates and commitments</span>
            </div>
            <span style={{ color: '#16a34a', fontWeight: '600' }}>Complete</span>
          </div>

          {/* Item 4 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a' }}>
              {analysisStage >= 4 ? (
                <CheckCircle2 size={16} color="#16a34a" />
              ) : (
                <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid #2563eb', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }} />
              )}
              <span>Evaluating task dependencies and deadlines</span>
            </div>
            <span style={{ color: analysisStage >= 4 ? '#16a34a' : '#2563eb', fontWeight: '600' }}>
              {analysisStage >= 4 ? 'Complete' : 'In progress'}
            </span>
          </div>
        </div>

        {/* Bottom Info Banner */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 14px', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe', marginBottom: '16px' }}>
          <Info size={18} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.78rem', color: '#1e40af', lineHeight: 1.45 }}>
            This may take a few moments. You'll be redirected to the recommendations once the analysis is complete.
          </div>
        </div>

        {/* Quick Skip Button */}
        <div style={{ textAlign: 'right' }}>
          <button
            onClick={() => setCurrentScreen('recommendations')}
            style={{
              background: 'none',
              border: 'none',
              color: '#2563eb',
              fontSize: '0.78rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Skip to Recommendations →
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // PANEL 3: Rebalance Recommendations (Review & Approve)
  // ==========================================
  if (currentScreen === 'recommendations') {
    return (
      <div
        className="card"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          maxWidth: '780px',
          margin: '0 auto'
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={() => setCurrentScreen('overview')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                color: '#0f172a'
              }}
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h2 style={{ fontSize: '1.18rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                Rebalance Recommendations
              </h2>
              <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0 0' }}>
                Workforce Balancer • Preview changes before applying
              </p>
            </div>
          </div>

          {/* Top Right Badge */}
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            backgroundColor: '#fffbeb',
            color: '#b45309',
            border: '1px solid #fde68a',
            borderRadius: '9999px',
            fontSize: '0.72rem',
            fontWeight: '700'
          }}>
            <Clock size={13} />
            Awaiting review
          </span>
        </div>

        {/* KPI Metric Summary (4 Cards Grid) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '8px' }}>
          <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Proposed transfers</div>
            <div style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>10</div>
          </div>

          <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Hours to redistribute</div>
            <div style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>104 hrs</div>
          </div>

          <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Current balance score</div>
            <div style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>40 / 100</div>
          </div>

          <div style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Projected balance score</div>
            <div style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>79 / 100</div>
          </div>
        </div>

        <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginBottom: '20px' }}>
          Illustrative values only. The application must calculate actual figures from the database.
        </div>

        {/* Section Heading */}
        <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a', marginBottom: '12px' }}>
          Proposed task transfers
        </h3>

        {/* List of Transfer Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
          {(showAllTasks ? tasks : tasks.slice(0, 3)).map((task) => {
            const isExpanded = expandedTaskId === task.id;
            const isAccepted = task.status === 'accepted';
            const isRejected = task.status === 'rejected';

            return (
              <div
                key={task.id}
                style={{
                  borderRadius: '10px',
                  border: isAccepted ? '1px solid #bbf7d0' : isRejected ? '1px solid #fecaca' : '1px solid #e2e8f0',
                  backgroundColor: isAccepted ? '#fcfdfd' : isRejected ? '#fefefe' : '#ffffff',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                  overflow: 'hidden'
                }}
              >
                {/* Header Row of Transfer */}
                <div
                  onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}
                  style={{
                    padding: '14px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    borderBottom: isExpanded ? '1px solid #f1f5f9' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}>
                      {task.iconType === 'code' && <Code2 size={18} />}
                      {task.iconType === 'layers' && <Layers size={18} />}
                      {task.iconType === 'dashboard' && <BarChart3 size={18} />}
                      {task.iconType === 'analytics' && <TrendingUp size={18} />}
                    </div>
                    <div>
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDetails(task);
                        }}
                        style={{ fontSize: '0.88rem', fontWeight: '700', color: '#0f172a', cursor: 'pointer' }}
                        title="Click to view detailed metrics"
                      >
                        {task.taskName}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                        {task.skill} • {task.hours} hrs/week
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      color: '#15803d',
                      backgroundColor: '#dcfce7',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}>
                      {task.skillMatch}% skill match
                    </span>
                    {isExpanded ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
                  </div>
                </div>

                {/* Expanded Details View */}
                {isExpanded && (
                  <div style={{ padding: '16px', backgroundColor: '#fafbfc' }}>
                    {/* 3-Part Box: From, To, Why this helps */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.3fr', gap: '14px', marginBottom: '16px' }}>
                      {/* From */}
                      <div style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '6px' }}>From</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <img src={task.from.avatar} alt={task.from.name} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                          <div>
                            <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#0f172a' }}>{task.from.name}</div>
                            <div style={{ fontSize: '0.72rem', color: '#ea580c', fontWeight: '700' }}>
                              ↑ {task.from.utilBefore}% → <span style={{ color: '#16a34a' }}>{task.from.utilAfter}%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* To */}
                      <div style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '6px' }}>To</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <img src={task.to.avatar} alt={task.to.name} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                          <div>
                            <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#0f172a' }}>{task.to.name}</div>
                            <div style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: '700' }}>
                              ↗ {task.to.utilBefore}% → <span style={{ color: '#16a34a' }}>{task.to.utilAfter}%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Why this helps */}
                      <div style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0' }}>
                        <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '4px', fontWeight: '600' }}>Why this helps</div>
                        <p style={{ fontSize: '0.73rem', color: '#334155', margin: 0, lineHeight: 1.35 }}>
                          {task.reason}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons: Reject & Accept */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
                      <button
                        onClick={(e) => handleOpenDetails(task)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#2563eb',
                          fontSize: '0.76rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          marginRight: 'auto'
                        }}
                      >
                        Deep-dive Details →
                      </button>

                      <button
                        onClick={(e) => handleRejectTask(task.id, e)}
                        style={{
                          padding: '7px 16px',
                          backgroundColor: isRejected ? '#fef2f2' : '#ffffff',
                          color: '#dc2626',
                          border: '1px solid #fecaca',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <X size={14} />
                        <span>Reject</span>
                      </button>

                      <button
                        onClick={(e) => handleAcceptTask(task.id, e)}
                        style={{
                          padding: '7px 18px',
                          backgroundColor: isAccepted ? '#15803d' : '#2563eb',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Check size={14} />
                        <span>{isAccepted ? 'Accepted' : 'Accept'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Toggle remaining tasks if any */}
        {tasks.length > 3 && (
          <div style={{ textAlign: 'center', marginBottom: '18px' }}>
            <button
              onClick={() => setShowAllTasks(!showAllTasks)}
              style={{
                background: 'none',
                border: 'none',
                color: '#2563eb',
                fontSize: '0.78rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>{showAllTasks ? 'Show fewer recommendations' : `View remaining ${tasks.length - 3} proposed transfers`}</span>
              {showAllTasks ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>
        )}

        {/* Bottom Review & Apply Banner */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div>
            <div style={{ fontSize: '0.86rem', fontWeight: '700', color: '#0f172a' }}>
              {acceptedTasks.length} of {tasks.length} transfers selected
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
              Redistributing {totalHoursAccepted} weekly hours across team pods
            </div>
          </div>

          <button
            onClick={() => setCurrentScreen('confirm')}
            disabled={acceptedTasks.length === 0}
            style={{
              padding: '10px 22px',
              backgroundColor: acceptedTasks.length === 0 ? '#94a3b8' : '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.88rem',
              fontWeight: '600',
              cursor: acceptedTasks.length === 0 ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: acceptedTasks.length === 0 ? 'none' : '0 2px 6px rgba(37, 99, 235, 0.25)'
            }}
          >
            <span>Review &amp; Apply Selected Changes</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // PANEL 4: Transfer Details (Deep-dive comparison view)
  // ==========================================
  if (currentScreen === 'details') {
    const task = selectedTaskForDetails;
    const isAccepted = task.status === 'accepted';

    return (
      <div
        className="card"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          maxWidth: '740px',
          margin: '0 auto'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={() => setCurrentScreen('recommendations')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              color: '#0f172a'
            }}
          >
            <ArrowLeft size={18} />
          </button>
          <h2 style={{ fontSize: '1.18rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
            Transfer Details
          </h2>
        </div>

        {/* Task Header Box */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
              {task.taskName}
            </h3>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
              {task.skill} • {task.hours} hrs/week
            </div>
          </div>

          <span style={{
            fontSize: '0.78rem',
            fontWeight: '700',
            color: '#15803d',
            backgroundColor: '#dcfce7',
            padding: '4px 10px',
            borderRadius: '6px'
          }}>
            {task.skillMatch}% skill match
          </span>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginBottom: '22px' }}>
          {/* Left Column: From Employee */}
          <div style={{ padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <img src={task.from.avatar} alt={task.from.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: '700', color: '#0f172a' }}>
                  {task.from.name} (From)
                </div>
                <div style={{ fontSize: '0.74rem', color: '#ea580c', fontWeight: '700' }}>
                  ↑ {task.from.utilBefore}% → <span style={{ color: '#16a34a' }}>{task.from.utilAfter}%</span>
                </div>
              </div>
            </div>

            {/* Current Utilization Bar */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#64748b', marginBottom: '4px' }}>
                <span>Current utilization</span>
                <span style={{ fontWeight: '700', color: '#dc2626' }}>{task.from.utilBefore}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', backgroundColor: '#ef4444' }} />
              </div>
            </div>

            {/* After Transfer Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#64748b', marginBottom: '4px' }}>
                <span>After transfer</span>
                <span style={{ fontWeight: '700', color: '#16a34a' }}>{task.from.utilAfter}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: `${task.from.utilAfter}%`, height: '100%', backgroundColor: '#10b981' }} />
              </div>
            </div>
          </div>

          {/* Right Column: To Employee */}
          <div style={{ padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <img src={task.to.avatar} alt={task.to.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: '700', color: '#0f172a' }}>
                  {task.to.name} (To)
                </div>
                <div style={{ fontSize: '0.74rem', color: '#16a34a', fontWeight: '700' }}>
                  ↗ {task.to.utilBefore}% → <span style={{ color: '#16a34a' }}>{task.to.utilAfter}%</span>
                </div>
              </div>
            </div>

            {/* Current Utilization Bar */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#64748b', marginBottom: '4px' }}>
                <span>Current utilization</span>
                <span style={{ fontWeight: '700', color: '#2563eb' }}>{task.to.utilBefore}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: `${task.to.utilBefore}%`, height: '100%', backgroundColor: '#2563eb' }} />
              </div>
            </div>

            {/* After Transfer Bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#64748b', marginBottom: '4px' }}>
                <span>After transfer</span>
                <span style={{ fontWeight: '700', color: '#16a34a' }}>{task.to.utilAfter}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: `${task.to.utilAfter}%`, height: '100%', backgroundColor: '#10b981' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Why this helps callout */}
        <div style={{ display: 'flex', gap: '12px', padding: '16px', backgroundColor: '#eff6ff', borderRadius: '10px', border: '1px solid #bfdbfe', marginBottom: '24px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Lightbulb size={18} color="#2563eb" />
          </div>
          <div>
            <div style={{ fontSize: '0.84rem', fontWeight: '700', color: '#1e3a8a', marginBottom: '4px' }}>
              Why this helps
            </div>
            <p style={{ fontSize: '0.8rem', color: '#1e40af', margin: 0, lineHeight: 1.45 }}>
              {task.detailedReason || task.reason}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            onClick={() => {
              handleRejectTask(task.id);
              setCurrentScreen('recommendations');
            }}
            style={{
              padding: '9px 20px',
              backgroundColor: '#ffffff',
              color: '#dc2626',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              fontSize: '0.84rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <X size={16} />
            <span>Reject</span>
          </button>

          <button
            onClick={() => {
              handleAcceptTask(task.id);
              setCurrentScreen('recommendations');
            }}
            style={{
              padding: '9px 24px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.84rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)'
            }}
          >
            <Check size={16} />
            <span>{isAccepted ? 'Accepted' : 'Accept'}</span>
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // PANEL 5: Apply Selected Changes (Confirm step)
  // ==========================================
  if (currentScreen === 'confirm') {
    return (
      <div
        className="card"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          maxWidth: '700px',
          margin: '0 auto'
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
          <button
            onClick={() => setCurrentScreen('recommendations')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              color: '#0f172a'
            }}
          >
            <ArrowLeft size={18} />
          </button>
          <h2 style={{ fontSize: '1.18rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
            Apply Selected Changes
          </h2>
        </div>

        {/* Hero Check & Title */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '22px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#059669', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Check size={24} strokeWidth={3} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
              Confirm Changes
            </h3>
            <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
              You're about to apply {acceptedTasks.length} selected transfers (out of {tasks.length}).
            </p>
          </div>
        </div>

        {/* Summary of Selected Changes Box */}
        <div style={{ backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '16px', marginBottom: '18px' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>
            Summary of selected changes
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Total hours to redistribute</span>
              <span style={{ fontWeight: '700', color: '#0f172a' }}>{totalHoursAccepted} hrs</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Employees affected</span>
              <span style={{ fontWeight: '700', color: '#0f172a' }}>{affectedEmployeesCount}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Expected balance score</span>
              <span style={{ fontWeight: '700', color: '#059669' }}>40 → {expectedBalanceScore}</span>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 14px', backgroundColor: '#eff6ff', borderRadius: '8px', border: '1px solid #bfdbfe', marginBottom: '24px' }}>
          <Info size={18} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.78rem', color: '#1e40af', lineHeight: 1.45 }}>
            These changes will be saved to the database and the workload metrics will be refreshed.
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button
            onClick={() => setCurrentScreen('recommendations')}
            style={{
              padding: '10px 22px',
              backgroundColor: '#ffffff',
              color: '#334155',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              fontSize: '0.86rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmApply}
            style={{
              padding: '10px 24px',
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.86rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 6px rgba(37, 99, 235, 0.25)'
            }}
          >
            <Check size={16} />
            <span>Apply Changes</span>
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // PANEL 6: Workload Rebalancing & Allocation — Success / Updated State
  // ==========================================
  if (currentScreen === 'success') {
    return (
      <div
        className="card"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          maxWidth: isEmbeddedCard ? '100%' : '760px',
          margin: isEmbeddedCard ? '0' : '0 auto'
        }}
      >
        {/* Top Header with Back */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
          <button
            onClick={() => {
              if (onBackToOverview) {
                onBackToOverview();
              } else {
                setCurrentScreen('overview');
              }
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              color: '#0f172a'
            }}
          >
            <ArrowLeft size={18} />
          </button>
          <h2 style={{ fontSize: '1.18rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
            Workload Rebalancing &amp; Allocation
          </h2>
        </div>

        {/* Success Banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          backgroundColor: '#ecfdf5',
          borderRadius: '8px',
          border: '1px solid #a7f3d0',
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle2 size={20} color="#059669" />
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: '800', color: '#065f46' }}>
                Changes Applied Successfully
              </div>
              <div style={{ fontSize: '0.74rem', color: '#047857' }}>
                {acceptedTasks.length} transfers have been applied. Workload metrics have been updated.
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentScreen('recommendations')}
            style={{
              background: 'none',
              border: 'none',
              color: '#065f46',
              fontSize: '0.76rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '2px'
            }}
          >
            <span>View Changes</span>
            <span>&gt;</span>
          </button>
        </div>

        {/* Updated Workforce Overview Card */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
            Updated Workforce Overview
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a' }}>
              Overloaded (8%)
            </span>
            <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
              5 Engineers Overloaded
            </span>
          </div>

          <div style={{ display: 'flex', width: '100%', height: '10px', borderRadius: '9999px', overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
            <div style={{ width: '8%', backgroundColor: '#ea580c' }} title="Overloaded (8%)" />
            <div style={{ width: '10%', backgroundColor: '#2563eb', marginLeft: '2px' }} title="Underutilized (10%)" />
            <div style={{ width: '82%', backgroundColor: '#10b981', marginLeft: '2px' }} title="Optimal (82%)" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '0.8rem', color: '#334155', fontWeight: '600' }}>
            <span>Underutilized (10%)</span>
            <span style={{ color: '#059669', fontWeight: '700' }}>Optimal (82%)</span>
          </div>
        </div>

        {/* Key Improvements (3 Cards Row) */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '0.84rem', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>
            Key Improvements
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {/* Card 1 */}
            <div style={{ padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Gauge size={18} color="#059669" />
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Load balance improved</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#059669' }}>+28%</div>
              </div>
            </div>

            {/* Card 2 */}
            <div style={{ padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={18} color="#059669" />
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Overloaded employees</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#059669' }}>-4</div>
              </div>
            </div>

            {/* Card 3 */}
            <div style={{ padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BarChart3 size={18} color="#059669" />
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Hours redistributed</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#059669' }}>104 hrs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Benefit Highlight Banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '14px 16px',
          backgroundColor: '#f0fdf4',
          borderRadius: '8px',
          border: '1px solid #bbf7d0',
          marginBottom: '16px'
        }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <TrendingUp size={18} color="#16a34a" />
          </div>
          <div style={{ fontSize: '0.8rem', color: '#166534', lineHeight: 1.4, fontWeight: '500' }}>
            A more balanced team leads to better productivity, higher engagement and on-time project delivery.
          </div>
        </div>

        {/* Re-simulate / Reset Action */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
          <button
            onClick={() => {
              setTasks(initialRebalanceTasks);
              setCurrentScreen('overview');
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#64748b',
              fontSize: '0.76rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <RefreshCw size={13} />
            <span>Reset Simulation</span>
          </button>

          <button
            onClick={() => setCurrentScreen('recommendations')}
            style={{
              padding: '6px 14px',
              backgroundColor: '#eff6ff',
              border: '1px solid #bfdbfe',
              color: '#1d4ed8',
              borderRadius: '6px',
              fontSize: '0.76rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Modify Transfers
          </button>
        </div>
      </div>
    );
  }

  return null;
}
