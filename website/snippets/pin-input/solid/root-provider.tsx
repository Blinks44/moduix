import { Button } from '@moduix/solid/button';
import {
  usePinInput,
  PinInputRootProvider,
  PinInputLabel,
  PinInputControl,
  PinInputInput,
} from '@moduix/solid/pin-input';
import { Stack } from '@moduix/solid/stack';

export default function RootProviderPinInput() {
  const pinInput = usePinInput({ count: 6 });

  return (
    <Stack align="center" gap="4">
      <PinInputRootProvider value={pinInput}>
        <PinInputLabel>Verification code</PinInputLabel>
        <PinInputControl>
          {Array.from({ length: 6 }, (_, index) => (
            <PinInputInput index={index} />
          ))}
        </PinInputControl>
      </PinInputRootProvider>

      <div>
        <Button type="button" size="sm" variant="outline" onClick={() => pinInput().focus()}>
          Focus
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => pinInput().clearValue()}>
          Clear
        </Button>
      </div>
    </Stack>
  );
}