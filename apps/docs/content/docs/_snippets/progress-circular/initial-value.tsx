/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ProgressCircular } from '@moduix/react';

const defaultValue = 70;

export function InitialValueProgressCircularDemo() {
  return (
    <ProgressCircular defaultValue={70}>
      <ProgressCircular.Label>Import data</ProgressCircular.Label>
      <div className="progress-circular-circle-container">
        <ProgressCircular.Ring />
        <ProgressCircular.ValueText />
      </div>
    </ProgressCircular>
  );
}

//#endregion