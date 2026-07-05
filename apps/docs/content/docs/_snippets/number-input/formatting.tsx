/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { NumberInput } from '@moduix/react';

export function FormattedNumberInputDemo() {
  return (
    <NumberInput
      defaultValue="1250"
      min={0}
      step={50}
      formatOptions={{
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }}
    >
      <NumberInput.Label>Price</NumberInput.Label>
      <NumberInput.Control>
        <NumberInput.DecrementTrigger />
        <NumberInput.Input />
        <NumberInput.IncrementTrigger />
      </NumberInput.Control>
    </NumberInput>
  );
}

//#endregion