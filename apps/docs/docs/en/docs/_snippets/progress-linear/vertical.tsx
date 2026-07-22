import { ProgressLinear } from '@moduix/react';

export default function VerticalProgressLinearDemo() {
  return (
    <ProgressLinear defaultValue={42} orientation="vertical" className="progress-linear-vertical">
      <ProgressLinear.Label>Indexing files</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track>
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear>
  );
}