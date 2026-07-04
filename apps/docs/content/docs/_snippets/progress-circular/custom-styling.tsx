/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ProgressCircular } from '@moduix/react';

const defaultValue = 72;

export function CustomStylingProgressCircularDemo() {
  return (
    <ProgressCircular defaultValue={72} className="progress-circular-custom">
      <ProgressCircular.Label>Monthly quota</ProgressCircular.Label>
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