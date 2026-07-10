/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ProgressCircular } from '@moduix/react';

const defaultValue = 420;

const min = 200;

const max = 800;

export function MinMaxProgressCircularDemo() {
  return (
    <ProgressCircular defaultValue={420} min={200} max={800}>
      <ProgressCircular.Label>Requests per minute</ProgressCircular.Label>
      <div className="progress-circular-circle-container">
        <ProgressCircular.Ring />
        <ProgressCircular.ValueText />
      </div>
    </ProgressCircular>
  );
}

//#endregion