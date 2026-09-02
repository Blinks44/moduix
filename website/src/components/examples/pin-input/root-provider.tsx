import { Button } from '@moduix/react/button';
import { PinInput, usePinInput } from '@moduix/react/pin-input';
import { useId } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/pin-input/pin-input-root-provider.module.css';

export default function RootProviderPinInput() {
  const id = useId();
  const pinInput = usePinInput({
    id,
    count: 6,
  });
  return (
    <div className={styles.root}>
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

      <PreviewMeta>
        <Button type="button" size="sm" variant="outline" onClick={pinInput.focus}>
          Focus
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={pinInput.clearValue}>
          Clear
        </Button>
      </PreviewMeta>
    </div>
  );
}