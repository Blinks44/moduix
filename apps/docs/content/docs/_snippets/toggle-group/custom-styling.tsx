/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { ToggleGroup } from '@moduix/react';
import styles from './toggle-group.module.css';

const defaultValue = ['day'];

export function CustomStylingToggleGroupDemo() {
  return (
    <ToggleGroup
      defaultValue={['day']}
      aria-label="Schedule density"
      className={styles.customGroup}
    >
      <ToggleGroup.Item value="day" className={styles.customItem}>
        Day
      </ToggleGroup.Item>
      <ToggleGroup.Item value="week" className={styles.customItem}>
        Week
      </ToggleGroup.Item>
      <ToggleGroup.Item value="month" className={styles.customItem}>
        Month
      </ToggleGroup.Item>
    </ToggleGroup>
  );
}

//#endregion