import { Field, FieldHelperText, FieldLabel } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/field/field-read-only.module.css';

export default function ReadOnlyFieldDemo() {
  return (
    <Field class={styles.root} readOnly>
      <FieldLabel>Workspace key</FieldLabel>
      <Input value="MAPS" />
      <FieldHelperText>Read-only state is propagated to the input.</FieldHelperText>
    </Field>
  );
}