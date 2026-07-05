/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ToggleGroup } from '@moduix/react';
import { useState } from 'react';
import styles from './toggle-group.module.css';

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

export function ControlledToggleGroupDemo() {
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
      <span className={styles.hint}>Current value: {value.join(', ') || 'empty'}</span>
    </div>
  );
}

//#endregion