/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { NumberInput } from '@moduix/react';

export function MouseWheelNumberInputDemo() {
  return (
    <NumberInput defaultValue="5" allowMouseWheel>
      <NumberInput.Label>Mouse wheel enabled</NumberInput.Label>
      <NumberInput.Field />
    </NumberInput>
  );
}

//#endregion