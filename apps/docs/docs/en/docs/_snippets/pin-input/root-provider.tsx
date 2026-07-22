import { Button, PinInput, usePinInput } from '@moduix/react';
import { useId } from 'react';

export default function RootProviderPinInput() {
  const id = useId();
  const pinInput = usePinInput({
    id,
    count: 6,
  });
  return (
    <div className="pin-input-provider-demo">
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

      <div className="actions">
        <Button type="button" size="sm" variant="outline" onClick={pinInput.focus}>
          Focus
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={pinInput.clearValue}>
          Clear
        </Button>
      </div>
    </div>
  );
}