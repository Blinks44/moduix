import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/solid/checkbox';
import { Field, FieldErrorText, FieldHelperText } from '@moduix/solid/field';
import styles from '@/components/examples/field/field-checkbox.module.css';

export default function CheckboxFieldDemo() {
  return (
    <Field class={styles.root} invalid>
      <Checkbox invalid required name="support-access" value="enabled">
        <CheckboxControl />
        <CheckboxLabel>Accept support access</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
      <FieldHelperText>Required before the team can inspect workspace data.</FieldHelperText>
      <FieldErrorText>Support access must be enabled.</FieldErrorText>
    </Field>
  );
}