import { Field } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/field/field-disabled.module.css';

export default function DisabledFieldDemo() {
  return (
    <Field class={styles.root} disabled>
      <Field.Label>Organization</Field.Label>
      <Input placeholder="Acme Inc." />
      <Field.HelperText>This field is currently managed by your workspace.</Field.HelperText>
    </Field>
  );
}