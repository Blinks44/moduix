import { Menu } from '@moduix/solid/menu';
import { SplitButton } from '@moduix/solid/split-button';
import styles from '@/components/examples/split-button/split-button-sizes.module.css';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function SplitButtonSizesDemo() {
  return (
    <div class={styles.row}>
      {sizes.map((size) => (
        <SplitButton aria-label={`${size} create actions`} size={size} variant="outline">
          <SplitButton.Action>{size}</SplitButton.Action>
          <SplitButton.Trigger />
          <SplitButton.Positioner>
            <SplitButton.Content>
              <Menu.Item value={`${size}-create`}>Create</Menu.Item>
              <Menu.Item value={`${size}-create-open`}>Create and Open</Menu.Item>
            </SplitButton.Content>
          </SplitButton.Positioner>
        </SplitButton>
      ))}
    </div>
  );
}