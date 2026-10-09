import { Field, FieldHelperText, FieldInput, FieldLabel } from '@moduix/solid/field';
import styles from '@/components/examples/field/field-read-only.module.css';

export default function ReadOnlyFieldDemo() {
  return (
    <Field class={styles.root} readOnly>
      <FieldLabel>Workspace key</FieldLabel>
      <FieldInput defaultValue="MAPS" />
      <FieldHelperText>Read-only state is propagated to the input.</FieldHelperText>
    </Field>
  );
}