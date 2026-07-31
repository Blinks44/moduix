import { ProgressCircular } from '@moduix/react/progress-circular';

export default function ProgressCircularDemo() {
  return (
    <ProgressCircular defaultValue={42}>
      <ProgressCircular.Label>Export data</ProgressCircular.Label>
      <div className="progress-circular-circle-container">
        <ProgressCircular.Ring aria-label="Export data" />
        <ProgressCircular.ValueText />
      </div>
    </ProgressCircular>
  );
}