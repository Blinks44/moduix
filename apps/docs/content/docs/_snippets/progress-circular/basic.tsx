/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ProgressCircular } from '@moduix/react';

const defaultValue = 42;

export function ProgressCircularDemo() {
  return (
    <ProgressCircular defaultValue={42}>
      <ProgressCircular.Label>Export data</ProgressCircular.Label>
      <div className="progress-circular-circle-container">
        <ProgressCircular.Circle>
          <ProgressCircular.CircleTrack />
          <ProgressCircular.CircleRange />
        </ProgressCircular.Circle>
        <ProgressCircular.ValueText />
      </div>
    </ProgressCircular>
  );
}

//#endregion