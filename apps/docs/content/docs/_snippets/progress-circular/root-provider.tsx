/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useProgress } from '@ark-ui/react/progress';
import { ProgressCircular } from '@moduix/react';

const defaultValue = 58;

export function RootProviderProgressCircularDemo() {
  const progress = useProgress({
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

//#endregion