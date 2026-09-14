import { Field } from '@moduix/react/field';
import { Textarea } from '@moduix/react/textarea';
import styles from '@/components/examples/textarea/textarea-auto-resize.module.css';

export default function AutoResizeTextareaDemo() {
  return (
    <Field className={styles.root}>
      <Field.Label>Issue description</Field.Label>
      <Textarea
        autoresize
        placeholder="Start typing a longer description. Height grows with content."
      />
    </Field>
  );
}