import { ToggleGroup, ToggleGroupItem } from '@moduix/react/toggle-group';
import styles from '@/components/examples/toggle-group/toggle-group-sizes.module.css';

const sizes = ['xs', 'sm', 'md', 'lg'] as const;
const alignmentItems = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

export default function SizesToggleGroupDemo() {
  return (
    <div className={styles.stack}>
      {sizes.map((size) => (
        <ToggleGroup
          key={size}
          size={size}
          defaultValue={['left']}
          aria-label={`Text alignment, ${size}`}
        >
          {alignmentItems.map((item) => (
            <ToggleGroupItem key={item.value} value={item.value}>
              {item.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      ))}
    </div>
  );
}