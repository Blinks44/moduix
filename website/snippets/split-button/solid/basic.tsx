import { Menu } from '@moduix/solid/menu';
import { SplitButton } from '@moduix/solid/split-button';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/split-button/split-button-basic.module.css';

const items = [
  {
    value: 'save-draft',
    label: 'Save as Draft',
  },
  {
    value: 'duplicate',
    label: 'Duplicate',
  },
  {
    value: 'publish',
    label: 'Publish Now',
  },
];

export default function SplitButtonDemo() {
  const [status, setStatus] = createSignal('Ready to save.');

  return (
    <div class={styles.stack}>
      <SplitButton aria-label="Save actions">
        <SplitButton.Action onClick={() => setStatus('Changes saved.')}>
          Save Changes
        </SplitButton.Action>
        <SplitButton.Trigger />
        <SplitButton.Positioner>
          <SplitButton.Content>
            {items.slice(0, 2).map((item) => (
              <Menu.Item value={item.value}>{item.label}</Menu.Item>
            ))}
            <Menu.Separator />
            <Menu.Item value={items[2].value}>{items[2].label}</Menu.Item>
          </SplitButton.Content>
        </SplitButton.Positioner>
      </SplitButton>
      <output aria-live="polite">{status()}</output>
    </div>
  );
}