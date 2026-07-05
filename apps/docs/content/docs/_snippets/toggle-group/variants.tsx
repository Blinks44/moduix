/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ToggleGroup } from '@moduix/react';
import styles from './toggle-group.module.css';

const items = [
  {
    value: 'one',
    label: 'One',
  },
  {
    value: 'two',
    label: 'Two',
  },
  {
    value: 'three',
    label: 'Three',
  },
];

export function ToggleGroupVariantsDemo() {
  return (
    <div className={styles.stack}>
      <ToggleGroup defaultValue={['one']} aria-label="Default variant">
        {items.map((item) => (
          <ToggleGroup.Item key={item.value} value={item.value}>
            {item.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup>
      <ToggleGroup defaultValue={['one']} aria-label="Outline variant" variant="outline">
        {items.map((item) => (
          <ToggleGroup.Item key={item.value} value={item.value}>
            {item.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup>
      <ToggleGroup defaultValue={['one']} aria-label="Ghost variant" variant="ghost">
        {items.map((item) => (
          <ToggleGroup.Item key={item.value} value={item.value}>
            {item.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup>
    </div>
  );
}

//#endregion