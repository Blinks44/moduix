/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useNumberInput } from '@ark-ui/react/number-input';
import { NumberInput } from '@moduix/react';

export function RootProviderNumberInputDemo() {
  const numberInput = useNumberInput({
    defaultValue: '3',
    min: 1,
    max: 10,
  });
  return (
    <div>
      <NumberInput.RootProvider value={numberInput}>
        <NumberInput.Label>Guests</NumberInput.Label>
        <NumberInput.Control>
          <NumberInput.DecrementTrigger />
          <NumberInput.Input />
          <NumberInput.IncrementTrigger />
        </NumberInput.Control>
      </NumberInput.RootProvider>
      <div className="number-input-root-provider-actions">
        <button type="button" onClick={() => numberInput.setToMin()}>
          Min
        </button>
        <button type="button" onClick={() => numberInput.setToMax()}>
          Max
        </button>
      </div>
    </div>
  );
}

//#endregion