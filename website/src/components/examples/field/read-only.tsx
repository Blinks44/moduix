import { Field } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import styles from '@/components/examples/field/field-read-only.module.css';

export default function ReadOnlyFieldDemo() {
  return (
    <Field className={styles.root} readOnly>
      <Field.Label>Workspace key</Field.Label>
      <Input defaultValue="MAPS" />
      <Field.HelperText>Read-only state is propagated to the input.</Field.HelperText>
    </Field>
  );
}