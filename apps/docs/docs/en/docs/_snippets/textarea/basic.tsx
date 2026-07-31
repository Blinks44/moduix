import { Field } from '@moduix/react/field';
import { Textarea } from '@moduix/react/textarea';
import styles from '@/components/examples/textarea.module.css';

export default function TextareaDemo() {
  return (
    <Field className={styles.field}>
      <Field.Label>Comment</Field.Label>
      <Field.HelperText>Included in the issue summary visible to the whole team.</Field.HelperText>
      <Textarea placeholder="Write a short comment" />
    </Field>
  );
}