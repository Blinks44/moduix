import { Field, FieldHelperText, FieldLabel } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import styles from '@/components/examples/field/field-read-only.module.css';

export default function ReadOnlyFieldDemo() {
  return (
    <Field className={styles.root} readOnly>
      <FieldLabel>Workspace key</FieldLabel>
      <Input defaultValue="MAPS" />
      <FieldHelperText>Read-only state is propagated to the input.</FieldHelperText>
    </Field>
  );
}