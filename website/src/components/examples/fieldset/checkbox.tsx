import { Checkbox } from '@moduix/react/checkbox';
import { Fieldset } from '@moduix/react/fieldset';
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
    <Fieldset className={styles.root}>
      <Fieldset.Legend>Email preferences</Fieldset.Legend>
      {preferences.map((preference) => (
        <Checkbox key={preference.value} value={preference.value}>
          <Checkbox.Control />
          <Checkbox.Label>{preference.label}</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox>
      ))}
    </Fieldset>
  );
}