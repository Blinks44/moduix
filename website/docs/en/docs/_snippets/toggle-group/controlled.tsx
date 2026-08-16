import { ToggleGroup } from '@moduix/react/toggle-group';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
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

export default function ControlledToggleGroupDemo() {
  const [value, setValue] = useState(['left'] as string[]);
  return (
    <div className={styles.stack}>
      <ToggleGroup
        value={value}
        onValueChange={(details) => setValue(details.value)}
        aria-label="Text alignment"
      >
        {alignmentItems.map((item) => (
          <ToggleGroup.Item key={item.value} value={item.value}>
            {item.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup>
      <PreviewMeta>
        <output>Selected: {value.join(', ') || 'empty'}</output>
      </PreviewMeta>
    </div>
  );
}