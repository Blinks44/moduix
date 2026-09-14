import { Field } from '@moduix/react/field';
import { Textarea } from '@moduix/react/textarea';
import styles from '@/components/examples/field/field-textarea.module.css';

export default function TextareaFieldDemo() {
  return (
    <Field className={styles.root}>
      <Field.Label>Summary</Field.Label>
      <Textarea autoresize placeholder="Describe the request" />
      <Field.HelperText>The textarea grows as the content expands.</Field.HelperText>
    </Field>
  );
}