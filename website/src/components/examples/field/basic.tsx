import { Field } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import styles from '@/components/examples/field/field-basic.module.css';

export default function FieldDemo() {
  return (
    <Field className={styles.root} required>
      <Field.Label>
        Name
        <Field.RequiredIndicator />
      </Field.Label>
      <Input placeholder="Enter your name" />
      <Field.HelperText>Visible on your public profile.</Field.HelperText>
    </Field>
  );
}