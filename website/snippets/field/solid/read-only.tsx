import { Field } from '@moduix/solid/field';
import styles from '@/components/examples/field/field-read-only.module.css';

export default function ReadOnlyFieldDemo() {
  return (
    <Field class={styles.root} readOnly>
      <Field.Label>Workspace key</Field.Label>
      <Field.Input defaultValue="MAPS" />
      <Field.HelperText>Read-only state is propagated to the input.</Field.HelperText>
    </Field>
  );
}