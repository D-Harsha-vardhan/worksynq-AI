import React from 'react';
import { Users, Activity, AlertTriangle, GraduationCap } from 'lucide-react';
import { initialActivities } from '../data/workforceData';

export default function RecentActivityCard() {
  const getIcon = (type) => {
    switch (type) {
      case 'team': return <Users size={16} />;
      case 'workload': return <Activity size={16} />;
      case 'skills': return <AlertTriangle size={16} />;
      case 'training': return <GraduationCap size={16} />;
      default: return <Users size={16} />;
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Recent Activity</h3>
        <span className="card-action-link">View All</span>
      </div>

      <div className="activity-feed">
        {initialActivities.map((act) => (
          <div key={act.id} className="activity-item">
            <div className="activity-icon">
              {getIcon(act.type)}
            </div>
            <div className="activity-content">
              <div className="activity-title">{act.title}</div>
              <div className="activity-time">{act.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
