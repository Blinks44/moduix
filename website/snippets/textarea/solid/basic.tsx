import { Field, FieldHelperText, FieldLabel } from '@moduix/solid/field';
import { Textarea } from '@moduix/solid/textarea';
import styles from '@/components/examples/textarea/textarea-basic.module.css';

export default function TextareaDemo() {
  return (
    <Field class={styles.root}>
      <FieldLabel>Comment</FieldLabel>
      <FieldHelperText>Included in the issue summary visible to the whole team.</FieldHelperText>
      <Textarea placeholder="Write a short comment" />
    </Field>
  );
}