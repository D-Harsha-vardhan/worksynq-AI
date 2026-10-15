import React, { useState } from 'react';
import { Settings, Save, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function SettingsView() {
  const [workHours, setWorkHours] = useState(40);
  const [overloadThreshold, setOverloadThreshold] = useState(100);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ maxWidth: '680px' }}>
      <div style={{ marginBottom: '22px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0f172a' }}>Platform Settings</h2>
        <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
          Configure organizational optimization thresholds, working hour benchmarks, and algorithm heuristics.
        </p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', display: 'block', marginBottom: '6px' }}>
            Standard Weekly Work Hours (Per Full-Time Employee)
          </label>
          <input
            type="number"
            className="search-input"
            value={workHours}
            onChange={(e) => setWorkHours(Number(e.target.value))}
            style={{ width: '120px' }}
          />
          <span style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginTop: '4px' }}>
            Default standard capacity baseline (40.0 hours/week).
          </span>
        </div>

        <div>
          <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', display: 'block', marginBottom: '6px' }}>
            Burnout Warning Trigger Threshold (%)
          </label>
          <input
            type="number"
            className="search-input"
            value={overloadThreshold}
            onChange={(e) => setOverloadThreshold(Number(e.target.value))}
            style={{ width: '120px' }}
          />
          <span style={{ fontSize: '0.74rem', color: '#64748b', display: 'block', marginTop: '4px' }}>
            Employees allocated beyond this threshold will be flagged for task reallocation.
          </span>
        </div>

        <div>
          <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a', display: 'block', marginBottom: '6px' }}>
            Active AI Agent Engine
          </label>
          <select className="search-input" style={{ width: '280px' }}>
            <option>Multi-Agent Collaborative Heuristics (v2.4)</option>
            <option>Strict Seniority Weighted Solver</option>
            <option>Pure Availability Equalizer</option>
          </select>
        </div>

        <div style={{ paddingTop: '14px', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {saved ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '0.82rem', fontWeight: '600' }}>
              <CheckCircle2 size={16} /> Preferences successfully updated!
            </span>
          ) : <span></span>}

          <button className="btn-primary" onClick={handleSave}>
            <Save size={15} />
            <span>Save Configuration</span>
          </button>
        </div>
      </div>
    </div>
  );
}
