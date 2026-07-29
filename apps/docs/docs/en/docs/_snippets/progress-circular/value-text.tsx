import { ProgressCircular } from '@moduix/react';

export default function ValueTextProgressCircularDemo() {
  return (
    <ProgressCircular
      translations={{
        value({ value, max }) {
          if (value === null) return 'Loading...';
          return `${value} of ${max}`;
        },
      }}
    >
      <ProgressCircular.Label>Migration</ProgressCircular.Label>
      <div className="progress-circular-circle-container">
        <ProgressCircular.Ring aria-label="Migration" />
        <ProgressCircular.ValueText />
      </div>
    </ProgressCircular>
  );
}