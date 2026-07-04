/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ProgressCircular } from '@moduix/react';

export function ValueTextProgressCircularDemo() {
  return (
    <ProgressCircular
      translations={{
        value({ value, max }) {
          if (value === null) return 'Loading...';
          return `${value} of ${max}`;
        },
      }}
    >
      <ProgressCircular.Label>Migration</ProgressCircular.Label>
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