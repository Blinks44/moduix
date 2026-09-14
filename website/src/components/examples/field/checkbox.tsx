import { Checkbox } from '@moduix/react/checkbox';
import { Field } from '@moduix/react/field';
import styles from '@/components/examples/field/field-checkbox.module.css';

export default function CheckboxFieldDemo() {
  return (
    <Field className={styles.root} invalid>
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