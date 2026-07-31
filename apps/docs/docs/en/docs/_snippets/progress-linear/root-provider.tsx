import { ProgressLinear } from '@moduix/react/progress-linear';

export default function RootProviderProgressLinearDemo() {
  const progress = ProgressLinear.useProgress({
    defaultValue: 58,
  });
  return (
    <ProgressLinear.RootProvider value={progress}>
      <ProgressLinear.Label>Team rollout</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track aria-label="Team rollout">
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear.RootProvider>
  );
}