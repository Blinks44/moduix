/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { NumberInput } from '@moduix/react';
import { useState } from 'react';

export function ControlledNumberInputDemo() {
  const [value, setValue] = useState('24');
  return (
    <div>
      <NumberInput value={value} onValueChange={(details) => setValue(details.value)}>
        <NumberInput.Label>Controlled value</NumberInput.Label>
        <NumberInput.Field />
      </NumberInput>
      <div className="number-input-state">Current value: {value || 'empty'}</div>
    </div>
  );
}

//#endregion