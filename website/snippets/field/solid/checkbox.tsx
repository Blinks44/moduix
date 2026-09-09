import { Checkbox } from '@moduix/solid/checkbox';
import { Field } from '@moduix/solid/field';
import styles from '@/components/examples/field/field-checkbox.module.css';

export default function CheckboxFieldDemo() {
  return (
    <Field class={styles.root} invalid>
      <Checkbox.Root invalid required name="support-access" value="enabled">
        <Checkbox.Control />
        <Checkbox.Label>Accept support access</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.Root>
      <Field.HelperText>Required before the team can inspect workspace data.</Field.HelperText>
      <Field.ErrorText>Support access must be enabled.</Field.ErrorText>
    </Field>
  );
}