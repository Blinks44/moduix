import { ProgressCircular } from '@moduix/react/progress-circular';

export default function RootProviderProgressCircularDemo() {
  const progress = ProgressCircular.useProgress({
    defaultValue: 58,
  });
  return (
    <ProgressCircular.RootProvider value={progress}>
      <ProgressCircular.Label>Team rollout</ProgressCircular.Label>
      <div className="progress-circular-circle-container">
        <ProgressCircular.Circle aria-label="Team rollout">
          <ProgressCircular.CircleTrack />
          <ProgressCircular.CircleRange />
        </ProgressCircular.Circle>
        <ProgressCircular.ValueText />
      </div>
    </ProgressCircular.RootProvider>
  );
}