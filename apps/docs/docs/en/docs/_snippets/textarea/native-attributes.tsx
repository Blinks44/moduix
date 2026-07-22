import { Field, Textarea } from '@moduix/react';
import styles from '@/components/examples/textarea.module.css';

export default function TextareaNativeAttributesDemo() {
  return (
    <Field className={styles.field}>
      <Field.Label>Notes</Field.Label>
      <Textarea
        name="notes"
        rows={6}
        maxLength={280}
        spellCheck={false}
        placeholder="Add enough context for the next person reading this."
      />
    </Field>
  );
}