import { Button } from '@moduix/solid/button';
import { PinInput, usePinInput } from '@moduix/solid/pin-input';
import styles from '@/components/examples/pin-input/pin-input-root-provider.module.css';

export default function RootProviderPinInput() {
  const pinInput = usePinInput({ count: 6 });

  return (
    <div class={styles.root}>
      <PinInput.RootProvider value={pinInput}>
        <PinInput.Label>Verification code</PinInput.Label>
        <PinInput.Control>
          {Array.from({ length: 6 }, (_, index) => (
            <PinInput.Input index={index} />
          ))}
        </PinInput.Control>
      </PinInput.RootProvider>

      <div>
        <Button type="button" size="sm" variant="outline" onClick={() => pinInput().focus()}>
          Focus
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => pinInput().clearValue()}>
          Clear
        </Button>
      </div>
    </div>
  );
}