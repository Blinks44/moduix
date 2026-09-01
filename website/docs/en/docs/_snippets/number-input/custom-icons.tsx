import { NumberInput } from '@moduix/react/number-input';
import { ChevronDown as ChevronDownIcon, ChevronUp as ChevronUpIcon } from 'lucide-react';
import styles from '@/components/examples/number-input/number-input-advanced-customization.module.css';

export default function CustomIconsNumberInputDemo() {
  return (
    <NumberInput
      defaultValue="8"
      translations={{ decrementLabel: 'Decrease floors', incrementLabel: 'Increase floors' }}
    >
      <NumberInput.Label>Floors</NumberInput.Label>
      <NumberInput.Control>
        <NumberInput.DecrementTrigger className={styles.button}>
          <ChevronDownIcon />
        </NumberInput.DecrementTrigger>
        <NumberInput.Input className={styles.input} />
        <NumberInput.IncrementTrigger className={styles.button}>
          <ChevronUpIcon />
        </NumberInput.IncrementTrigger>
      </NumberInput.Control>
    </NumberInput>
  );
}