import { Field, FieldLabel } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import styles from '@/components/examples/input/input-native-attributes.module.css';

export default function SecurityCodeDemo() {
  return (
    <Field className={styles.root}>
      <FieldLabel>Security code</FieldLabel>
      <Input
        htmlSize={8}
        inputMode="numeric"
        maxLength={6}
        name="security-code"
        autoComplete="one-time-code"
        placeholder="000000"
      />
    </Field>
  );
}