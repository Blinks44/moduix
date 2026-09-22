import {
  ProgressLinear,
  ProgressLinearLabel,
  ProgressLinearValueText,
  ProgressLinearTrack,
  ProgressLinearRange,
} from '@moduix/react/progress-linear';

export default function InitialValueProgressLinearDemo() {
  return (
    <ProgressLinear defaultValue={70}>
      <ProgressLinearLabel>Import data</ProgressLinearLabel>
      <ProgressLinearValueText />
      <ProgressLinearTrack aria-label="Import data">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>
  );
}
