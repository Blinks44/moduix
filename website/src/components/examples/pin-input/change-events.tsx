import { PinInput, PinInputLabel, PinInputControl, PinInputInputs } from '@moduix/react/pin-input';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/pin-input/pin-input-change-events.module.css';

export default function ChangeEventsPinInput() {
  const [value, setValue] = useState([] as string[]);
  return (
    <div className={styles.root}>
      <PinInput
        count={6}
        type="alphanumeric"
        value={value}
        onValueChange={(details) => {
          setValue(details.value);
        }}
      >
        <PinInputLabel>Invite code</PinInputLabel>
        <PinInputControl>
          <PinInputInputs />
        </PinInputControl>
      </PinInput>
      <PreviewMeta>
        <output>Current value: {value.join('') || 'empty'}</output>
      </PreviewMeta>
    </div>
  );
}