import React from 'react';
import WorkloadRebalancingFlow from '../WorkloadRebalancingFlow';

export default function WorkloadView({ employees, onOpenRebalanceModal, isRebalanced, onApplyRebalance }) {
  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', paddingBottom: '32px' }}>
      <WorkloadRebalancingFlow
        initialScreen={isRebalanced ? 'success' : 'overview'}
        isRebalanced={isRebalanced}
        onApplySuccess={(data) => {
          if (onApplyRebalance) {
            onApplyRebalance(data);
          }
        }}
        onBackToOverview={() => {}}
      />
    </div>
  );
}
