import { Field, FieldHelperText, FieldLabel, FieldRequiredIndicator } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/field/field-basic.module.css';

export default function FieldDemo() {
  return (
    <Field class={styles.root} required>
      <FieldLabel>
        Name
        <FieldRequiredIndicator />
      </FieldLabel>
      <Input placeholder="Enter your name" />
      <FieldHelperText>Visible on your public profile.</FieldHelperText>
    </Field>
  );
}
