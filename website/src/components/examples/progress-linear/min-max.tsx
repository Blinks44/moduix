import {
  ProgressLinear,
  ProgressLinearLabel,
  ProgressLinearValueText,
  ProgressLinearTrack,
  ProgressLinearRange,
} from '@moduix/react/progress-linear';

export default function MinMaxProgressLinearDemo() {
  return (
    <ProgressLinear defaultValue={420} min={200} max={800}>
      <ProgressLinearLabel>Requests per minute</ProgressLinearLabel>
      <ProgressLinearValueText />
      <ProgressLinearTrack aria-label="Requests per minute">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>
  );
}