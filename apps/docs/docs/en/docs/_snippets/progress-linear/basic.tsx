import { ProgressLinear } from '@moduix/react/progress-linear';

export default function ProgressLinearDemo() {
  return (
    <ProgressLinear defaultValue={24}>
      <ProgressLinear.Label>Export data</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track aria-label="Export data">
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear>
  );
}