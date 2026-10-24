import { RadioGroup, RadioGroupOption } from '@moduix/react/radio-group';
import styles from '@/components/examples/radio-group/radio-group-sizes.module.css';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function RadioGroupSizesDemo() {
  return (
    <div className={styles.row}>
      {sizes.map((size) => (
        <RadioGroup key={size} size={size} defaultValue={size} aria-label={`Size ${size}`}>
          <RadioGroupOption value={size}>{size.toUpperCase()}</RadioGroupOption>
        </RadioGroup>
      ))}
    </div>
  );
}