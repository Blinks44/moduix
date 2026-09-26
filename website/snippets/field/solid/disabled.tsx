import { Field, FieldHelperText, FieldLabel } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/field/field-disabled.module.css';

export default function DisabledFieldDemo() {
  return (
    <Field class={styles.root} disabled>
      <FieldLabel>Organization</FieldLabel>
      <Input placeholder="Acme Inc." />
      <FieldHelperText>This field is currently managed by your workspace.</FieldHelperText>
    </Field>
  );
}