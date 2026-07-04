/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Tabs } from '@moduix/react';
import styles from './custom-styling-tabs-demo.module.css';

const fields = [
  {
    value: 'name',
    label: 'Name',
    placeholder: 'Full name',
  },
  {
    value: 'email',
    label: 'Email',
    placeholder: 'Email',
  },
];

export function CustomStylingTabsDemo() {
  return (
    <Tabs defaultValue="name" className={styles.inlineRoot}>
      <Tabs.List className={styles.inlineList}>
        {fields.map((field) => (
          <Tabs.Trigger key={field.value} value={field.value} className={styles.inlineTrigger}>
            {field.label}
          </Tabs.Trigger>
        ))}
        <Tabs.Indicator className={styles.inlineIndicator} />
      </Tabs.List>
      {fields.map((field) => (
        <Tabs.Content key={field.value} value={field.value} className={styles.inlineContent}>
          <input
            className={styles.inlineInput}
            placeholder={field.placeholder}
            aria-label={field.placeholder}
          />
        </Tabs.Content>
      ))}
    </Tabs>
  );
}

//#endregion