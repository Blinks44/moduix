import { Field } from '@moduix/solid/field';
import { Textarea } from '@moduix/solid/textarea';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/textarea/textarea-controlled.module.css';

export default function TextareaControlledDemo() {
  const [value, setValue] = createSignal('');

  return (
    <Field class={styles.root}>
      <Field.Label>Feedback</Field.Label>
      <Textarea
        value={value()}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="Type to control value"
      />
    </Field>
  );
}