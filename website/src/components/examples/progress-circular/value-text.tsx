import {
  ProgressCircular,
  ProgressCircularContext,
  ProgressCircularLabel,
  ProgressCircularRing,
  ProgressCircularValueText,
} from '@moduix/react/progress-circular';

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
      <ProgressCircularLabel>Migration</ProgressCircularLabel>
      <ProgressCircularRing />
      <ProgressCircularContext>
        {(progress) => (
          <ProgressCircularValueText>{progress.valueAsString}</ProgressCircularValueText>
        )}
      </ProgressCircularContext>
    </ProgressCircular>
  );
}
