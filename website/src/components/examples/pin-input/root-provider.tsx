import { Button } from '@moduix/react/button';
import { usePinInput, PinInputRootProvider, PinInputLabel, PinInputControl, PinInputInput } from '@moduix/react/pin-input';
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
      <PinInputRootProvider value={pinInput}>
        <PinInputLabel>Verification code</PinInputLabel>
        <PinInputControl>
          {Array.from(
            {
              length: 6,
            },
            (_, index) => (
              <PinInputInput key={index} index={index} />
            ),
          )}
        </PinInputControl>
      </PinInputRootProvider>

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
