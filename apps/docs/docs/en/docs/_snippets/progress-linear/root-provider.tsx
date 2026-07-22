import { ProgressLinear } from '@moduix/react';

export default function RootProviderProgressLinearDemo() {
  const progress = ProgressLinear.useProgress({
    defaultValue: 58,
  });
  return (
    <ProgressLinear.RootProvider value={progress}>
      <ProgressLinear.Label>Team rollout</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track>
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear.RootProvider>
  );
}