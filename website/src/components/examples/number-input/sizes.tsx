import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/react/number-input';
import styles from '@/components/examples/number-input/number-input-sizes.module.css';

const sizes = [
  ['xs', 'Extra small'],
  ['sm', 'Small'],
  ['md', 'Medium'],
  ['lg', 'Large'],
  ['xl', 'Extra large'],
] as const;

export default function NumberInputSizesDemo() {
  return (
    <div className={styles.root}>
      {sizes.map(([size, label]) => (
        <NumberInput key={size} size={size} defaultValue="8">
          <NumberInputLabel>{label}</NumberInputLabel>
          <NumberInputField />
        </NumberInput>
      ))}
    </div>
  );
}