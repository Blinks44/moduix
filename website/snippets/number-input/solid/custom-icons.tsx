import { NumberInput } from '@moduix/solid/number-input';
import { ChevronDown as ChevronDownIcon, ChevronUp as ChevronUpIcon } from 'lucide-solid';
import styles from '@/components/examples/number-input/number-input-advanced-customization.module.css';

export default function CustomIconsNumberInputDemo() {
  return (
    <NumberInput
      defaultValue="8"
      translations={{ decrementLabel: 'Decrease floors', incrementLabel: 'Increase floors' }}
    >
      <NumberInput.Label>Floors</NumberInput.Label>
      <NumberInput.Control>
        <NumberInput.DecrementTrigger class={styles.button}>
          <ChevronDownIcon />
        </NumberInput.DecrementTrigger>
        <NumberInput.Input class={styles.input} />
        <NumberInput.IncrementTrigger class={styles.button}>
          <ChevronUpIcon />
        </NumberInput.IncrementTrigger>
      </NumberInput.Control>
    </NumberInput>
  );
}