/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { NumberInput } from '@moduix/react';

export function MinMaxNumberInputDemo() {
  return (
    <NumberInput defaultValue="10" min={0} max={20} step={2}>
      <NumberInput.Label>Quantity (0-20, step 2)</NumberInput.Label>
      <NumberInput.Control>
        <NumberInput.DecrementTrigger />
        <NumberInput.Input />
        <NumberInput.IncrementTrigger />
      </NumberInput.Control>
    </NumberInput>
  );
}

//#endregion