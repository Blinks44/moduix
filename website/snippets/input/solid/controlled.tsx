import { Field, FieldLabel } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/input/input-controlled.module.css';

export default function ControlledInputDemo() {
  const [value, setValue] = createSignal('');

  return (
    <Field class={styles.root}>
      <FieldLabel>Username</FieldLabel>
      <Input
        value={value()}
        onInput={(event) => setValue(event.currentTarget.value)}
        placeholder="Type to control value"
      />
    </Field>
  );
}
