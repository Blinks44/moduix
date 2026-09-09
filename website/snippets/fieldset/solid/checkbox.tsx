import { Checkbox } from '@moduix/solid/checkbox';
import { Fieldset } from '@moduix/solid/fieldset';
import { For } from 'solid-js';
import styles from '@/components/examples/fieldset/fieldset-checkbox.module.css';

const preferences = [
  {
    label: 'Product updates',
    value: 'product',
  },
  {
    label: 'Marketing emails',
    value: 'marketing',
  },
];

export default function EmailPreferences() {
  return (
    <Fieldset class={styles.root}>
      <Fieldset.Legend>Email preferences</Fieldset.Legend>
      <For each={preferences}>
        {(preference) => (
          <Checkbox value={preference.value}>
            <Checkbox.Control />
            <Checkbox.Label>{preference.label}</Checkbox.Label>
            <Checkbox.HiddenInput />
          </Checkbox>
        )}
      </For>
    </Fieldset>
  );
}