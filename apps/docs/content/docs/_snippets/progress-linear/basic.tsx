/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ProgressLinear } from '@moduix/react';

const defaultValue = 24;

export function ProgressLinearDemo() {
  return (
    <ProgressLinear defaultValue={24}>
      <ProgressLinear.Label>Export data</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track>
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear>
  );
}

//#endregion