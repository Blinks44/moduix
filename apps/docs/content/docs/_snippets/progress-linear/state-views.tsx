/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ProgressLinear } from '@moduix/react';

const defaultValue = null;

export function StateViewsProgressLinearDemo() {
  return (
    <ProgressLinear defaultValue={null}>
      <ProgressLinear.Label>Preparing report</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track>
        <ProgressLinear.Range />
      </ProgressLinear.Track>
      <ProgressLinear.View state="indeterminate">Waiting for source data</ProgressLinear.View>
      <ProgressLinear.View state="loading">Transfer in progress</ProgressLinear.View>
      <ProgressLinear.View state="complete">Export complete</ProgressLinear.View>
    </ProgressLinear>
  );
}

//#endregion