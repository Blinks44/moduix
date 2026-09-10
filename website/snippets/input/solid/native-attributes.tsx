import { Field } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/input/input-native-attributes.module.css';

export default function SecurityCodeDemo() {
  return (
    <Field class={styles.root}>
      <Field.Label>Security code</Field.Label>
      <Input
        htmlSize={8}
        inputMode="numeric"
        maxLength={6}
        name="security-code"
        autocomplete="one-time-code"
        placeholder="000000"
      />
    </Field>
  );
}