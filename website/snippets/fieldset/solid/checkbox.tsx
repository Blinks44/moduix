import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/solid/checkbox';
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
            <CheckboxControl />
            <CheckboxLabel>{preference.label}</CheckboxLabel>
            <CheckboxHiddenInput />
          </Checkbox>
        )}
      </For>
    </Fieldset>
  );
}