import { ProgressLinear } from '@moduix/react';

export default function IndeterminateProgressLinearDemo() {
  return (
    <ProgressLinear defaultValue={null}>
      <ProgressLinear.Label>Preparing report</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track aria-label="Preparing report">
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear>
  );
}