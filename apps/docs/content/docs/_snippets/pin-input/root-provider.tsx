/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { PinInput, usePinInput } from '@moduix/react';
import { useId } from 'react';

export function RootProviderPinInput() {
  const id = useId();
  const pinInput = usePinInput({
    id,
    count: 6,
  });
  return (
    <div>
      <div className="actions">
        <button type="button" onClick={pinInput.focus}>
          Focus
        </button>
        <button type="button" onClick={pinInput.clearValue}>
          Clear
        </button>
      </div>

      <PinInput.RootProvider value={pinInput}>
        <PinInput.Label>Verification code</PinInput.Label>
        <PinInput.Control>
          {Array.from(
            {
              length: 6,
            },
            (_, index) => (
              <PinInput.Input key={index} index={index} />
            ),
          )}
        </PinInput.Control>
      </PinInput.RootProvider>
    </div>
  );
}

//#endregion