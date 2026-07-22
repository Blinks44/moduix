import { ToggleGroup, useToggleGroup } from '@moduix/react';
import styles from '@/components/examples/toggle-group.module.css';

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
    <div className={styles.stack}>
      <span className={styles.hint}>Current value: {toggleGroup.value.join(', ') || 'empty'}</span>
      <ToggleGroup.RootProvider value={toggleGroup} aria-label="Text alignment">
        {alignmentItems.map((item) => (
          <ToggleGroup.Item key={item.value} value={item.value}>
            {item.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.RootProvider>
    </div>
  );
}