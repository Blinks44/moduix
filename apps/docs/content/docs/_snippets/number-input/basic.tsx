/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { NumberInput } from '@moduix/react';

export function NumberInputDemo() {
  return (
    <NumberInput defaultValue="100">
      <NumberInput.Label>Amount</NumberInput.Label>
      <NumberInput.Field />
    </NumberInput>
  );
}

//#endregion