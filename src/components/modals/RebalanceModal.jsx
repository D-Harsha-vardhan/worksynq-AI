import React from 'react';
import { X } from 'lucide-react';
import WorkloadRebalancingFlow from '../WorkloadRebalancingFlow';

export default function RebalanceModal({ simulationData, onApply, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100, backgroundColor: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)', padding: '20px' }}>
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '820px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            color: '#64748b'
          }}
          title="Close"
        >
          <X size={16} />
        </button>

        <div style={{ padding: '8px' }}>
          <WorkloadRebalancingFlow
            initialScreen="analyze"
            onApplySuccess={(data) => {
              if (onApply) onApply(data);
            }}
            onBackToOverview={onClose}
          />
        </div>
      </div>
    </div>
  );
}
