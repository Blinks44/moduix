/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ProgressLinear } from '@moduix/react';

const defaultValue = 72;

export function CustomStylingProgressLinearDemo() {
  return (
    <ProgressLinear defaultValue={72} className="progress-linear-custom">
      <ProgressLinear.Label>Monthly quota</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track>
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear>
  );
}

//#endregion