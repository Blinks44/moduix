import { Field, FieldHelperText, FieldLabel } from '@moduix/react/field';
import { Textarea } from '@moduix/react/textarea';
import styles from '@/components/examples/field/field-textarea.module.css';

export default function TextareaFieldDemo() {
  return (
    <Field className={styles.root}>
      <FieldLabel>Summary</FieldLabel>
      <Textarea autoresize placeholder="Describe the request" />
      <FieldHelperText>The textarea grows as the content expands.</FieldHelperText>
    </Field>
  );
}