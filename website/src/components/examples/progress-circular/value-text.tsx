import { ProgressCircular } from '@moduix/react/progress-circular';

export default function ValueTextProgressCircularDemo() {
  return (
    <ProgressCircular
      translations={{
        value({ value, max }) {
          if (value === null) return 'Migration: loading';
          return `Migration: ${value} of ${max}`;
        },
      }}
    >
      <ProgressCircular.Label>Migration</ProgressCircular.Label>
      <ProgressCircular.Ring />
      <ProgressCircular.Context>
        {(progress) => (
          <ProgressCircular.ValueText>{progress.valueAsString}</ProgressCircular.ValueText>
        )}
      </ProgressCircular.Context>
    </ProgressCircular>
  );
}