import { ProgressCircular } from '@moduix/react';

export default function RootProviderProgressCircularDemo() {
  const progress = ProgressCircular.useProgress({
    defaultValue: 58,
  });
  return (
    <ProgressCircular.RootProvider value={progress}>
      <ProgressCircular.Label>Team rollout</ProgressCircular.Label>
      <div className="progress-circular-circle-container">
        <ProgressCircular.Circle>
          <ProgressCircular.CircleTrack />
          <ProgressCircular.CircleRange />
        </ProgressCircular.Circle>
        <ProgressCircular.ValueText />
      </div>
    </ProgressCircular.RootProvider>
  );
}