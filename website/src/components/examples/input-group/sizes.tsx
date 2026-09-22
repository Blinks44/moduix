import { InputGroup, InputGroupAddon, InputGroupInput } from '@moduix/react/input-group';
import styles from '@/components/examples/input-group/input-group-sizes.module.css';

const inputGroupSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function InputGroupSizesDemo() {
  return (
    <div className={styles.stack}>
      {inputGroupSizes.map((size) => (
        <InputGroup key={size} size={size}>
          <InputGroupAddon>@</InputGroupAddon>
          <InputGroupInput aria-label={size + ' workspace'} />
        </InputGroup>
      ))}
    </div>
  );
}