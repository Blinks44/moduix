import { ToggleGroup, ToggleGroupItem } from '@moduix/solid/toggle-group';
import { For } from 'solid-js';
import styles from '@/components/examples/toggle-group/toggle-group-sizes.module.css';

const sizes = ['xs', 'sm', 'md', 'lg'] as const;
const alignmentItems = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

export default function SizesToggleGroupDemo() {
  return (
    <div class={styles.stack}>
      <For each={sizes}>
        {(size) => (
          <ToggleGroup size={size} defaultValue={['left']} aria-label={`Text alignment, ${size}`}>
            <For each={alignmentItems}>
              {(item) => <ToggleGroupItem value={item.value}>{item.label}</ToggleGroupItem>}
            </For>
          </ToggleGroup>
        )}
      </For>
    </div>
  );
}