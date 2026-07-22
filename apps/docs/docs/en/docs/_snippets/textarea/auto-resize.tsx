import { Field, Textarea } from '@moduix/react';
import styles from '@/components/examples/textarea.module.css';

export default function AutoResizeTextareaDemo() {
  return (
    <Field className={styles.field}>
      <Field.Label>Issue description</Field.Label>
      <Textarea
        autoresize
        placeholder="Start typing a longer description. Height grows with content."
      />
    </Field>
  );
}