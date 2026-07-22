import { ProgressLinear } from '@moduix/react';

export default function InitialValueProgressLinearDemo() {
  return (
    <ProgressLinear defaultValue={70}>
      <ProgressLinear.Label>Import data</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track>
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear>
  );
}