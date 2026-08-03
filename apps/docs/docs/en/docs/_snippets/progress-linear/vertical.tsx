import { ProgressLinear } from '@moduix/react/progress-linear';

export default function VerticalProgressLinearDemo() {
  return (
    <ProgressLinear defaultValue={42} orientation="vertical">
      <ProgressLinear.Label>Indexing files</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track aria-label="Indexing files">
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear>
  );
}