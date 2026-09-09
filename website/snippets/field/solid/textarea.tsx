import { Field } from '@moduix/solid/field';
import { Textarea } from '@moduix/solid/textarea';
import styles from '@/components/examples/field/field-textarea.module.css';

export default function TextareaFieldDemo() {
  return (
    <Field class={styles.root}>
      <Field.Label>Summary</Field.Label>
      <Textarea autoresize placeholder="Describe the request" />
      <Field.HelperText>The textarea grows as the content expands.</Field.HelperText>
    </Field>
  );
}