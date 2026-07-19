/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { NumberInput } from '@moduix/react';

export function ValueTextNumberInputDemo() {
  return (
    <NumberInput defaultValue="42">
      <NumberInput.Label>Value preview</NumberInput.Label>
      <NumberInput.Field />
      <NumberInput.ValueText />
    </NumberInput>
  );
}

//#endregion