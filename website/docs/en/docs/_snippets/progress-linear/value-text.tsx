import { ProgressLinear } from '@moduix/react/progress-linear';

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
      <ProgressLinear.Context>
        {(state) => <ProgressLinear.ValueText>{state.valueAsString}</ProgressLinear.ValueText>}
      </ProgressLinear.Context>
      <ProgressLinear.Track aria-label="Migration">
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear>
  );
}