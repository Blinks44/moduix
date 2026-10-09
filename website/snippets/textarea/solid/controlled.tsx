import { Field, FieldLabel } from '@moduix/solid/field';
import { Textarea } from '@moduix/solid/textarea';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/textarea/textarea-controlled.module.css';

export default function TextareaControlledDemo() {
  const [value, setValue] = createSignal('');

  return (
    <Field class={styles.root}>
      <FieldLabel>Feedback</FieldLabel>
      <Textarea
        value={value()}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="Type to control value"
      />
    </Field>
  );
}