/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ChevronDownIcon, ChevronUpIcon, NumberInput } from '@moduix/react';

export function CustomIconsNumberInputDemo() {
  return (
    <NumberInput defaultValue="8">
      <NumberInput.Label>Floors</NumberInput.Label>
      <NumberInput.Control>
        <NumberInput.DecrementTrigger className="number-input-custom-button">
          <ChevronDownIcon />
        </NumberInput.DecrementTrigger>
        <NumberInput.Input className="number-input-custom-input" />
        <NumberInput.IncrementTrigger className="number-input-custom-button">
          <ChevronUpIcon />
        </NumberInput.IncrementTrigger>
      </NumberInput.Control>
    </NumberInput>
  );
}

//#endregion