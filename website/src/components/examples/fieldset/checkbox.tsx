import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';
import { Fieldset, FieldsetLegend } from '@moduix/react/fieldset';
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
      <FieldsetLegend>Email preferences</FieldsetLegend>
      {preferences.map((preference) => (
        <Checkbox key={preference.value} value={preference.value}>
          <CheckboxControl />
          <CheckboxLabel>{preference.label}</CheckboxLabel>
          <CheckboxHiddenInput />
        </Checkbox>
      ))}
    </Fieldset>
  );
}
