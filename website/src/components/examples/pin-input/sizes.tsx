import { PinInput, PinInputControl, PinInputInputs, PinInputLabel } from '@moduix/react/pin-input';
import styles from '@/components/examples/pin-input/pin-input-sizes.module.css';

const sizes = [
  ['xs', 'Extra small'],
  ['sm', 'Small'],
  ['md', 'Medium'],
  ['lg', 'Large'],
  ['xl', 'Extra large'],
] as const;

export default function PinInputSizesDemo() {
  return (
    <div className={styles.root}>
      {sizes.map(([size, label]) => (
        <PinInput key={size} count={4} size={size}>
          <PinInputLabel>{label}</PinInputLabel>
          <PinInputControl>
            <PinInputInputs />
          </PinInputControl>
        </PinInput>
      ))}
    </div>
  );
}