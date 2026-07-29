import { ProgressLinear } from '@moduix/react';

export default function MinMaxProgressLinearDemo() {
  return (
    <ProgressLinear defaultValue={420} min={200} max={800}>
      <ProgressLinear.Label>Requests per minute</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track aria-label="Requests per minute">
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear>
  );
}