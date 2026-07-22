import { ProgressCircular } from '@moduix/react';

export default function InitialValueProgressCircularDemo() {
  return (
    <ProgressCircular defaultValue={70}>
      <ProgressCircular.Label>Import data</ProgressCircular.Label>
      <div className="progress-circular-circle-container">
        <ProgressCircular.Ring />
        <ProgressCircular.ValueText />
      </div>
    </ProgressCircular>
  );
}