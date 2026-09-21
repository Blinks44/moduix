import { MenuItem } from '@moduix/react/menu';
import { SplitButton } from '@moduix/react/split-button';
import styles from '@/components/examples/split-button/split-button-sizes.module.css';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function SplitButtonSizesDemo() {
  return (
    <div className={styles.row}>
      {sizes.map((size) => (
        <SplitButton key={size} aria-label={`${size} create actions`} size={size} variant="outline">
          <SplitButton.Action>{size}</SplitButton.Action>
          <SplitButton.Trigger />
          <SplitButton.Positioner>
            <SplitButton.Content>
              <MenuItem value={`${size}-create`}>Create</MenuItem>
              <MenuItem value={`${size}-create-open`}>Create and Open</MenuItem>
            </SplitButton.Content>
          </SplitButton.Positioner>
        </SplitButton>
      ))}
    </div>
  );
}
