import { Field } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import styles from '@/components/examples/field/field-disabled.module.css';

export default function DisabledFieldDemo() {
  return (
    <Field className={styles.root} disabled>
      <Field.Label>Organization</Field.Label>
      <Input placeholder="Acme Inc." />
      <Field.HelperText>This field is currently managed by your workspace.</Field.HelperText>
    </Field>
  );
}