import { ToggleGroup, useToggleGroup } from '@moduix/solid/toggle-group';
import styles from '@/components/examples/toggle-group/toggle-group-advanced-customization.module.css';

const alignmentItems = [
  {
    value: 'left',
    label: 'Left',
  },
  {
    value: 'center',
    label: 'Center',
  },
  {
    value: 'right',
    label: 'Right',
  },
];

export default function RootProviderToggleGroupDemo() {
  const toggleGroup = useToggleGroup({
    defaultValue: ['left'],
  });

  return (
    <div class={styles.stack}>
      <ToggleGroup.RootProvider value={toggleGroup} aria-label="Text alignment">
        {alignmentItems.map((item) => (
          <ToggleGroup.Item value={item.value}>{item.label}</ToggleGroup.Item>
        ))}
      </ToggleGroup.RootProvider>
      <div data-preview-meta>
        <output>Selected: {toggleGroup().value.join(', ') || 'empty'}</output>
      </div>
    </div>
  );
}