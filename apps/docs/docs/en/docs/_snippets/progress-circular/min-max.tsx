import { ProgressCircular } from '@moduix/react/progress-circular';

export default function MinMaxProgressCircularDemo() {
  return (
    <ProgressCircular defaultValue={420} min={200} max={800}>
      <ProgressCircular.Label>Requests per minute</ProgressCircular.Label>
      <div className="progress-circular-circle-container">
        <ProgressCircular.Ring aria-label="Requests per minute" />
        <ProgressCircular.ValueText />
      </div>
    </ProgressCircular>
  );
}