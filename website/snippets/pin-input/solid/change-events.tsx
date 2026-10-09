import { PinInput, PinInputLabel, PinInputControl, PinInputInputs } from '@moduix/solid/pin-input';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/pin-input/pin-input-change-events.module.css';

export default function ChangeEventsPinInput() {
  const [value, setValue] = createSignal<string[]>([]);

  return (
    <div class={styles.root}>
      <PinInput
        count={6}
        type="alphanumeric"
        value={value()}
        onValueChange={(details) => setValue(details.value)}
      >
        <PinInputLabel>Invite code</PinInputLabel>
        <PinInputControl>
          <PinInputInputs />
        </PinInputControl>
      </PinInput>
      <output>Current value: {value().join('') || 'empty'}</output>
    </div>
  );
}