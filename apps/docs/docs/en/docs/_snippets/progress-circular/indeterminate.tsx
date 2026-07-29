import { ProgressCircular } from '@moduix/react';

export default function IndeterminateProgressCircularDemo() {
  return (
    <ProgressCircular defaultValue={null}>
      <ProgressCircular.Label>Preparing report</ProgressCircular.Label>
      <div className="progress-circular-circle-container">
        <ProgressCircular.Ring aria-label="Preparing report" />
        <ProgressCircular.ValueText />
      </div>
    </ProgressCircular>
  );
}