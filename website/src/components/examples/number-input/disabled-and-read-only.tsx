import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/react/number-input';
import styles from '@/components/examples/number-input/number-input-disabled-and-read-only.module.css';

export default function DisabledAndReadOnlyNumberInputDemo() {
  return (
    <div className={styles.root}>
      <NumberInput defaultValue="4" disabled>
        <NumberInputLabel>Disabled quantity</NumberInputLabel>
        <NumberInputField />
      </NumberInput>
      <NumberInput defaultValue="8" readOnly>
        <NumberInputLabel>Read-only quantity</NumberInputLabel>
        <NumberInputField />
      </NumberInput>
    </div>
  );
}