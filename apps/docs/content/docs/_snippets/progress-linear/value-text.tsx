/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ProgressLinear } from '@moduix/react';

export function ValueTextProgressLinearDemo() {
  return (
    <ProgressLinear
      translations={{
        value({ value, max }) {
          if (value === null) return 'Loading...';
          return `${value} of ${max} items loaded`;
        },
      }}
    >
      <ProgressLinear.Label>Migration</ProgressLinear.Label>
      <ProgressLinear.ValueText />
      <ProgressLinear.Track>
        <ProgressLinear.Range />
      </ProgressLinear.Track>
    </ProgressLinear>
  );
}

//#endregion