import { ProgressCircular } from '@moduix/react';

export default function ProgressCircularDemo() {
  return (
    <ProgressCircular defaultValue={42}>
      <ProgressCircular.Label>Export data</ProgressCircular.Label>
      <div className="progress-circular-circle-container">
        <ProgressCircular.Ring />
        <ProgressCircular.ValueText />
      </div>
    </ProgressCircular>
  );
}