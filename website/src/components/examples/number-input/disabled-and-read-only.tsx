import { NumberInput } from '@moduix/react/number-input';
import styles from '@/components/examples/number-input/number-input-disabled-and-read-only.module.css';

export default function DisabledAndReadOnlyNumberInputDemo() {
  return (
    <div className={styles.root}>
      <NumberInput defaultValue="4" disabled>
        <NumberInput.Label>Disabled quantity</NumberInput.Label>
        <NumberInput.Field />
      </NumberInput>
      <NumberInput defaultValue="8" readOnly>
        <NumberInput.Label>Read-only quantity</NumberInput.Label>
        <NumberInput.Field />
      </NumberInput>
    </div>
  );
}