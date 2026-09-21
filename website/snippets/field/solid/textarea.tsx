import { Field, FieldHelperText, FieldLabel } from '@moduix/solid/field';
import { Textarea } from '@moduix/solid/textarea';
import styles from '@/components/examples/field/field-textarea.module.css';

export default function TextareaFieldDemo() {
  return (
    <Field class={styles.root}>
      <FieldLabel>Summary</FieldLabel>
      <Textarea autoresize placeholder="Describe the request" />
      <FieldHelperText>The textarea grows as the content expands.</FieldHelperText>
    </Field>
  );
}
