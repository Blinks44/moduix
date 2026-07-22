import { NumberInput, useNumberInput } from '@moduix/react';

export default function RootProviderNumberInputDemo() {
  const numberInput = useNumberInput({
    defaultValue: '3',
    min: 1,
    max: 10,
  });
  return (
    <div>
      <NumberInput.RootProvider value={numberInput}>
        <NumberInput.Label>Guests</NumberInput.Label>
        <NumberInput.Field />
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