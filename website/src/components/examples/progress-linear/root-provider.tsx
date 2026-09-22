import {
  ProgressLinearLabel,
  ProgressLinearValueText,
  ProgressLinearTrack,
  ProgressLinearRange,
  ProgressLinearRootProvider,
  useProgress,
} from '@moduix/react/progress-linear';

export default function RootProviderProgressLinearDemo() {
  const progress = useProgress({
    defaultValue: 58,
  });
  return (
    <ProgressLinearRootProvider value={progress}>
      <ProgressLinearLabel>Team rollout</ProgressLinearLabel>
      <ProgressLinearValueText />
      <ProgressLinearTrack aria-label="Team rollout">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </ProgressLinearRootProvider>
  );
}
