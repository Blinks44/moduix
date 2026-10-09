import { Field, FieldLabel } from '@moduix/react/field';
import { Textarea } from '@moduix/react/textarea';
import styles from '@/components/examples/textarea/textarea-auto-resize.module.css';

export default function AutoResizeTextareaDemo() {
  return (
    <Field className={styles.root}>
      <FieldLabel>Issue description</FieldLabel>
      <Textarea
        autoresize
        placeholder="Start typing a longer description. Height grows with content."
      />
    </Field>
  );
}