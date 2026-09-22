import {
  ProgressLinear,
  ProgressLinearContext,
  ProgressLinearLabel,
  ProgressLinearValueText,
  ProgressLinearTrack,
  ProgressLinearRange,
} from '@moduix/solid/progress-linear';

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
      <ProgressLinearLabel>Migration</ProgressLinearLabel>
      <ProgressLinearContext>
        {(state) => <ProgressLinearValueText>{state().valueAsString}</ProgressLinearValueText>}
      </ProgressLinearContext>
      <ProgressLinearTrack aria-label="Migration">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinear>
  );
}
