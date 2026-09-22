import {
  NumberInput,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputLabel,
} from '@moduix/solid/number-input';
import { ChevronDown as ChevronDownIcon, ChevronUp as ChevronUpIcon } from 'lucide-solid';
import styles from '@/components/examples/number-input/number-input-advanced-customization.module.css';

export default function CustomIconsNumberInputDemo() {
  return (
    <NumberInput
      defaultValue="8"
      translations={{ decrementLabel: 'Decrease floors', incrementLabel: 'Increase floors' }}
    >
      <NumberInputLabel>Floors</NumberInputLabel>
      <NumberInputControl>
        <NumberInputDecrementTrigger class={styles.button}>
          <ChevronDownIcon />
        </NumberInputDecrementTrigger>
        <NumberInputInput class={styles.input} />
        <NumberInputIncrementTrigger class={styles.button}>
          <ChevronUpIcon />
        </NumberInputIncrementTrigger>
      </NumberInputControl>
    </NumberInput>
  );
}
