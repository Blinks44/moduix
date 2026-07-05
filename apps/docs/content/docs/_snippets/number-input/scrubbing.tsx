/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { NumberInput } from '@moduix/react';

export function NumberInputScrubberDemo() {
  return (
    <NumberInput defaultValue="250">
      <NumberInput.Label>Drag to scrub</NumberInput.Label>
      <NumberInput.Control>
        <NumberInput.Scrubber>Drag</NumberInput.Scrubber>
        <NumberInput.DecrementTrigger />
        <NumberInput.Input />
        <NumberInput.IncrementTrigger />
      </NumberInput.Control>
    </NumberInput>
  );
}

//#endregion