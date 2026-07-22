import { ProgressCircular } from '@moduix/react';

const progressCircularStateMessages = {
  indeterminate: 'Waiting for source data',
  loading: 'Transfer in progress',
  complete: 'Export complete',
};

export default function StateViewsProgressCircularDemo() {
  return (
    <ProgressCircular defaultValue={null}>
      <ProgressCircular.Label>Preparing report</ProgressCircular.Label>
      <div className="progress-circular-circle-container">
        <ProgressCircular.Circle>
          <ProgressCircular.CircleTrack />
          <ProgressCircular.CircleRange />
        </ProgressCircular.Circle>
        <ProgressCircular.ValueText />
      </div>
      <ProgressCircular.View className="progress-circular-state" state="indeterminate">
        {progressCircularStateMessages.indeterminate}
      </ProgressCircular.View>
      <ProgressCircular.View className="progress-circular-state" state="loading">
        {progressCircularStateMessages.loading}
      </ProgressCircular.View>
      <ProgressCircular.View className="progress-circular-state" state="complete">
        {progressCircularStateMessages.complete}
      </ProgressCircular.View>
    </ProgressCircular>
  );
}