import { Field, FieldHelperText, FieldLabel } from '@moduix/react/field';
import { Textarea } from '@moduix/react/textarea';
import styles from '@/components/examples/textarea/textarea-basic.module.css';

export default function TextareaDemo() {
  return (
    <Field className={styles.root}>
      <FieldLabel>Comment</FieldLabel>
      <FieldHelperText>Included in the issue summary visible to the whole team.</FieldHelperText>
      <Textarea placeholder="Write a short comment" />
    </Field>
  );
}
