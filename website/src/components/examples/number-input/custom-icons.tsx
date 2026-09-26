import {
  NumberInput,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputLabel,
} from '@moduix/react/number-input';
import { ChevronDown as ChevronDownIcon, ChevronUp as ChevronUpIcon } from 'lucide-react';
import styles from '@/components/examples/number-input/number-input-advanced-customization.module.css';

export default function CustomIconsNumberInputDemo() {
  return (
    <NumberInput
      defaultValue="8"
      translations={{ decrementLabel: 'Decrease floors', incrementLabel: 'Increase floors' }}
    >
      <NumberInputLabel>Floors</NumberInputLabel>
      <NumberInputControl>
        <NumberInputDecrementTrigger className={styles.button}>
          <ChevronDownIcon />
        </NumberInputDecrementTrigger>
        <NumberInputInput className={styles.input} />
        <NumberInputIncrementTrigger className={styles.button}>
          <ChevronUpIcon />
        </NumberInputIncrementTrigger>
      </NumberInputControl>
    </NumberInput>
  );
}