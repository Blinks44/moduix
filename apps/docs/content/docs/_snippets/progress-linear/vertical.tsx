/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ProgressLinear } from '@moduix/react';

const defaultValue = 42;

const orientation = 'vertical';

export function VerticalProgressLinearDemo() {
  return (
    <ProgressLinear defaultValue={42} orientation="vertical" className="progress-linear-vertical">
      <ProgressLinear.Label>Indexing files</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track>
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear>
  );
}

//#endregion