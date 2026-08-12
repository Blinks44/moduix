import { ProgressCircular } from '@moduix/react/progress-circular';

export default function IndeterminateProgressCircularDemo() {
  return (
    <ProgressCircular className="progress-circular-indeterminate" defaultValue={null}>
      <ProgressCircular.Label>Preparing report</ProgressCircular.Label>
      <div className="progress-circular-circle-container">
        <ProgressCircular.Ring aria-label="Preparing report" />
        <ProgressCircular.ValueText />
      </div>
    </ProgressCircular>
  );
}