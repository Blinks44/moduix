import { ProgressLinear } from '@moduix/react';

export default function ValueTextProgressLinearDemo() {
  return (
    <ProgressLinear
      translations={{
        value({ value, max }) {
          if (value === null) return 'Loading...';
          return `${value} of ${max} items loaded`;
        },
      }}
    >
      <ProgressLinear.Label>Migration</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track aria-label="Migration">
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear>
  );
}