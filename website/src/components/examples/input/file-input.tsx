import { Field, FieldHelperText, FieldLabel } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import styles from '@/components/examples/input/input-file-input.module.css';

export default function FileInputDemo() {
  return (
    <Field className={styles.root}>
      <FieldLabel>Attachment</FieldLabel>
      <Input accept=".pdf,.png" type="file" />
      <FieldHelperText>Choose a PDF or PNG file.</FieldHelperText>
    </Field>
  );
}
