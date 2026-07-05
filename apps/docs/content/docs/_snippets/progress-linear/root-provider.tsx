/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useProgress } from '@ark-ui/react/progress';
import { ProgressLinear } from '@moduix/react';

const defaultValue = 58;

export function RootProviderProgressLinearDemo() {
  const progress = useProgress({
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

//#endregion