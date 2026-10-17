# ⚡ WorkSynq AI
### Autonomous Talent Planning, Squad Optimization & Workforce Intelligence Copilot

[![Workforce Intelligence](https://img.shields.io/badge/WorkSynq_AI-Enterprise_v2.4-1d4ed8?style=for-the-badge&logo=react&logoColor=white)](https://github.com/D-Harsha-vardhan/worksynq-AI)
[![Autonomous Agent](https://img.shields.io/badge/AI_Agent-DronaHQ_Webhook-0284c7?style=for-the-badge)](https://github.com/D-Harsha-vardhan/worksynq-AI)
[![Voice Copilot](https://img.shields.io/badge/Voice-ElevenLabs_ConvAI-3b82f6?style=for-the-badge)](https://github.com/D-Harsha-vardhan/worksynq-AI)

A state-of-the-art enterprise workforce intelligence copilot and talent optimization platform built with **React 19** and **Vite 6**. WorkSynq AI unifies combinatorial team assembly, automated sprint workload rebalancing, document quotation auditing, Kanban lifecycle telemetry, and autonomous multi-agent reasoning.

---

## 🌟 Executive Overview

In modern engineering and technology consulting organizations, high-impact project delivery hinges on three critical operational factors:
1. **Precise Skill Alignment**: Ensuring required technologies (React, Flutter, Python, Kubernetes, REST API) are staffed by certified in-house engineers.
2. **Burnout Prevention & Capacity Safety**: Identifying overallocated engineers (>100% capacity) and smoothly shifting movable tasks to available peers.
3. **Commercial Feasibility & Margin Protection**: Auditing client quotations against estimated internal engineering sprint hours to guarantee profit margins before signing delivery contracts.

**WorkSynq AI** eliminates operational bottlenecks by providing an autonomous, explainable workforce operating system for delivery managers, engineering leads, and resource planning directors.

---

## 🔄 End-to-End System Workflow Flowchart

```mermaid
flowchart TD
    subgraph Ingestion["1. Document Ingestion & Quotation Parsing"]
        A[Client RFP / Quotation Document] --> B[Document Intelligence Uploader]
        B --> C[Multi-Layer Document Parser\nRegex • Structure Extraction • JSON]
        C --> D[Standardized Project Definition\nBudget, Timeline, Tech Stack, Headcount]
    end

    subgraph Kanban["2. Lifecycle Telemetry & Kanban Board"]
        D --> E[Backlog / Intake]
        E -->|Team Formation Approved| F[Planning & Design]
        F -->|Sprint Launch| G[Active Delivery]
        G -->|Quality Acceptance| H[Completed & Delivered]
        E <-.->|Native Drag & Drop| F
        F <-.->|Stage Shifter Controls| G
        G <-.-> H
    end

    subgraph Matching["3. Combinatorial Squad Optimization"]
        E --> I[AI Squad Matching Engine]
        I --> J[Evaluate Multi-Factor Fit Scores\nTechnical Competency • Experience • Current Bandwidth %]
        J --> K[Select Primary SME & Complementary Squad]
        J --> L[Flag Identified Skill Bottlenecks]
        K --> M[Explainable AI Executive Squad Briefing]
    end

    subgraph Balancing["4. Workload Rebalancing Engine"]
        K --> N[Workforce Capacity Audit]
        N --> O{Engineers Overloaded?\nBandwidth > 100%}
        O -- Yes --> P[Interactive Workload Rebalancing Flow]
        P --> Q[Transfer Movable Sprint Tasks to Underutilized Peers]
        Q --> R[Recalculate Organization Balance Index\n72% to 96% Optimal]
        O -- No --> S[Optimal Deployment State]
        R --> S
    end

    subgraph Agent["5. Autonomous AI Advisor Copilot"]
        S --> T[Workforce Intelligence Copilot\nPowered by DronaHQ Agent Webhook]
        T --> U[Project Quotation Feasibility & Margin Audit\nRevenue vs. Internal Cost]
        T --> V[Interactive Squad Formation & Role Mapping]
        T --> W[One-Click Email Notification Dispatch to Squad]
        T --> X[Voice Copilot Interaction via ElevenLabs]
    end
```

---

## 🧠 Multi-Agent Architecture & Decision Cycle

```mermaid
sequenceDiagram
    autonumber
    actor User as Delivery Manager / Lead
    participant UI as WorkSynq AI Interface
    participant Engine as Talent Matching Engine
    participant Agent as DronaHQ Autonomous AI Agent
    participant Balancer as Workload Balancing Flow

    User->>UI: Selects project / enters RFP quotation
    UI->>Engine: Request optimal squad calculation
    Engine-->>UI: Returns candidates (Match Scores: 94%, 86%, 82%...)
    User->>UI: Clicks "Why This Team?" / asks question in AI Advisor
    UI->>Agent: Dispatches prompt & workforce payload to DronaHQ Webhook
    Agent-->>UI: Returns strategic executive rationale & financial audit
    UI-->>User: Renders interactive Feasibility Card (38.5% Gross Margin)
    User->>UI: Flags overloaded engineers (Raju Reddy 118%, Divya Menon 125%)
    UI->>Balancer: Launches Rebalance Simulator
    Balancer-->>UI: Reallocates 104 sprint hours to available engineers
    UI-->>User: Displays Balance Index increased to 96% (Burnout Eliminated)
```

---

## 🚀 Key Platform Features

### 1. 🔍 Omnisearch & Real-Time Talent Discovery
- **Floating Omnisearch Bar**: Type any developer name, skill, role, or project to instantly view matched candidates with active load indicators (`Ctrl+K` shortcut).
- **Comprehensive Profile Inspector**: Inspect employee technical levels (1-5), total experience years, certifications, and project rosters.

### 2. ⚡ AI Team Builder & Combinatorial Matching
- **Multi-Factor Scoring**: Evaluates candidate fit based on verified technical level vs. project minimum level, domain seniority, and weekly hours remaining.
- **Explainable AI Rationale**: Detailed briefing breaking down skill synergies, delivery risks, and mentor-mentee pairing recommendations.
- **1-Click Candidate Swapping**: Swap any team member in real-time with automatically calculated alternative candidates.

### 3. ⚖️ Interactive Workload Rebalancing Flow
- **Capacity Risk Detection**: Identifies developers exceeding 100% capacity to prevent delivery crunch and burnout.
- **Movable Task Reallocation**: Reassigns sprint deliverables from overloaded leads to verified peers with available bandwidth.
- **Dynamic Balance Index**: Real-time gauge tracking organizational capacity balance from baseline (72%) to optimal (96%).

### 4. 📊 Project Lifecycle & Interactive Kanban Board
- **4 Lifecycle Columns**: `Backlog`, `Planning`, `In Progress`, and `Review / Delivered`.
- **Drag & Drop + Shift Controls**: Effortlessly transition cards across columns with smooth feedback and budget tracking.
- **Dual View Support**: Instantly toggle between Kanban Board and Card Grid views.

### 5. 🤖 Autonomous AI Advisor Copilot
- **DronaHQ Agent Webhook Integration**: Pure webhook agent execution without vendor lock-in.
- **Commercial Feasibility Audit**: Audits client quotations against estimated developer hours (e.g. ₹35 Lakh quote vs. ₹21.6 Lakh internal cost = 38.5% gross margin).
- **One-Click Team Dispatch**: Composes and dispatches project kickoff emails to all recommended squad members simultaneously.
- **ElevenLabs Conversational Voice**: Talk directly with the AI copilot using natural voice interaction.

### 6. 🎓 Skill Gap & Training Pathways
- **18 Mapped Technology Bottlenecks**: Critical deficits mapped to accredited online certification courses.
- **Mentorship Pairing**: Automatically assigns in-house senior architects as mentors for junior engineers.

### 7. 📈 Executive Reporting
- **PDF & CSV Export**: Export comprehensive talent utilization, staffing velocity, and project health snapshots.

---

## 📁 Repository Structure

```
worksynq-AI/
├── index.html                           # App entry point with Google Fonts & Voice Widget
├── vite.config.js                       # Vite build configuration with DronaHQ proxy
├── package.json                         # Project dependencies and npm scripts
├── .env.example                         # Example environment configuration (Safe & Clean)
├── .gitignore                           # Git ignore rules for credentials, keys, and build files
├── README.md                            # Comprehensive project documentation & flowcharts
└── src/
    ├── main.jsx                         # React 19 application bootstrapping
    ├── App.jsx                          # Main application layout, state orchestration, and tabs
    ├── index.css                        # Complete enterprise design system tokens and utilities
    ├── components/
    │   ├── Header.jsx                   # Omnisearch bar, live search dropdown, notifications
    │   ├── Sidebar.jsx                  # Navigation tabs, live copilot status indicator
    │   ├── StatCards.jsx                # Metric cards with micro-progress and trend analytics
    │   ├── ProjectTeamBuilder.jsx       # Centerpiece squad recommendation table
    │   ├── KanbanBoard.jsx              # Drag-and-drop 4-stage project lifecycle board
    │   ├── DocumentOcrUploader.jsx      # Document ingestion and project extraction
    │   ├── WorkloadRebalancingCard.jsx  # Overview workload distribution summary
    │   ├── WorkloadRebalancingFlow.jsx  # Multi-step interactive task reallocation flow
    │   ├── SkillGapRecommendationsCard.jsx # Skill gap recommendations & course enrollment
    │   └── modals/                      # Modals (Explainability, Swap, Enroll, Profile)
    ├── views/
    │   ├── AiAdvisorView.jsx            # Autonomous DronaHQ chat copilot & feasibility audit
    │   ├── ProjectsView.jsx             # Project management, Kanban board & OCR modal
    │   ├── TeamBuilderView.jsx          # Dedicated squad assembly view
    │   ├── EmployeesView.jsx            # Workforce directory (Grid & Table switcher)
    │   ├── WorkloadView.jsx             # Dedicated workload rebalancing hub
    │   ├── SkillsTrainingView.jsx       # Skill gap matrix & training courses
    │   ├── ReportsView.jsx              # Executive utilization reports with PDF/CSV export
    │   └── SettingsView.jsx             # Configuration & team preferences
    ├── utils/
    │   ├── dronaHqService.js            # DronaHQ Autonomous AI Agent webhook service
    │   ├── matchingEngine.js            # Combinatorial multi-factor talent matching algorithm
    │   ├── courseLinks.js               # Accredited course registry & direct URL resolver
    │   └── nvidiaAiService.js           # Forwarding bridge to DronaHQ autonomous agent
    └── data/
        ├── workforceData.js             # Initial 60 employees, active projects, skill gaps
        └── additionalWorkforceData.js   # 18 skill gap bottlenecks & training definitions
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/D-Harsha-vardhan/worksynq-AI.git
   cd worksynq-AI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Add your DronaHQ Agent webhook URL and API key (optional for local mock execution):
   ```env
   VITE_DRONAHQ_WEBHOOK_URL=https://agents-backend.dronahq.com/webhook/your-webhook-id
   VITE_DRONAHQ_API_KEY=your_api_key_here
   ```

4. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000` (or the port indicated in your terminal).

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🔒 Security & Credential Management

- **Zero Credentials in Git**: All sensitive API keys, webhook URLs, and secrets are strictly excluded via `.gitignore`.
- **Environment Driven**: Production deployments read credentials exclusively from environment variables (`import.meta.env`).
- **Safe Fallbacks**: If external webhooks are unavailable or in draft state, WorkSynq AI continues operating seamlessly using deterministic internal domain algorithms without throwing unhandled exceptions.

---

## 👨‍💻 Author & Maintainer

- **Damarasinghu Harsha vardhan** ([@D-Harsha-vardhan](https://github.com/D-Harsha-vardhan))
  - GitHub: [https://github.com/D-Harsha-vardhan](https://github.com/D-Harsha-vardhan)
  - Project Repository: [https://github.com/D-Harsha-vardhan/worksynq-AI](https://github.com/D-Harsha-vardhan/worksynq-AI)

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.